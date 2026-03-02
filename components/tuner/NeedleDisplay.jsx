import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Line, Circle, Path, Text as SvgText } from 'react-native-svg';

const COLORS = {
  inTune: '#4ade80',
  flat: '#60a5fa',
  sharp: '#f87171',
  needle: '#ffffff',
  arc: '#374151',
  tick: '#9ca3af',
};

/**
 * NeedleDisplay - Analogue meter needle showing how in-tune a note is.
 *
 * Props:
 *   cents {number}  - deviation in cents, range [-50, 50]
 */
export default function NeedleDisplay({ cents = 0 }) {
  const animatedCents = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedCents, {
      toValue: cents,
      useNativeDriver: false,
      damping: 14,
      stiffness: 120,
    }).start();
  }, [cents]);

  // Map cents [-50, 50] → angle [-60°, 60°] in radians
  const W = 280;
  const H = 160;
  const cx = W / 2;
  const cy = H - 20;
  const R = 120;

  const centsToAngle = (c) => ((c / 50) * 60 * Math.PI) / 180;

  // Ticks at -50, -25, 0, +25, +50
  const ticks = [-50, -25, 0, 25, 50];

  const polarToXY = (angle, r) => ({
    x: cx + r * Math.sin(angle),
    y: cy - r * Math.cos(angle),
  });

  const needleColor =
    Math.abs(cents) <= 5 ? COLORS.inTune : cents < 0 ? COLORS.flat : COLORS.sharp;

  // Arc path
  const startAngle = centsToAngle(-50);
  const endAngle = centsToAngle(50);
  const arcStart = polarToXY(startAngle, R);
  const arcEnd = polarToXY(endAngle, R);
  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${R} ${R} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  return (
    <View style={styles.container}>
      <Svg width={W} height={H}>
        {/* Arc */}
        <Path d={arcPath} stroke={COLORS.arc} strokeWidth={3} fill="none" />

        {/* Ticks */}
        {ticks.map((t) => {
          const angle = centsToAngle(t);
          const outer = polarToXY(angle, R + 2);
          const inner = polarToXY(angle, R - 10);
          const label = polarToXY(angle, R - 22);
          return (
            <React.Fragment key={t}>
              <Line
                x1={outer.x} y1={outer.y}
                x2={inner.x} y2={inner.y}
                stroke={t === 0 ? COLORS.inTune : COLORS.tick}
                strokeWidth={t === 0 ? 2 : 1}
              />
              <SvgText
                x={label.x} y={label.y}
                fill={COLORS.tick}
                fontSize="9"
                textAnchor="middle"
              >
                {t > 0 ? `+${t}` : t}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Needle — driven by JS Animated via direct SVG manipulation */}
        <AnimatedNeedle
          animatedCents={animatedCents}
          cx={cx}
          cy={cy}
          R={R - 15}
          color={needleColor}
          centsToAngle={centsToAngle}
          polarToXY={polarToXY}
        />

        {/* Pivot */}
        <Circle cx={cx} cy={cy} r={5} fill={needleColor} />
      </Svg>
    </View>
  );
}

function AnimatedNeedle({ animatedCents, cx, cy, R, color, centsToAngle, polarToXY }) {
  // We read the animated value via a listener and update state
  const [tip, setTip] = React.useState(polarToXY(0, R));

  useEffect(() => {
    const id = animatedCents.addListener(({ value }) => {
      setTip(polarToXY(centsToAngle(value), R));
    });
    return () => animatedCents.removeListener(id);
  }, [R]);

  return (
    <Line
      x1={cx} y1={cy}
      x2={tip.x} y2={tip.y}
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
