import { Tabs } from 'expo-router';
import { Text } from 'react-native';

const TAB_ACTIVE = '#4ade80';
const TAB_INACTIVE = '#4b5563';
const TAB_BG = '#111827';

function Icon({ label, focused }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{label}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: TAB_BG,
          borderTopColor: '#1f2937',
        },
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accordeur',
          tabBarIcon: ({ focused }) => <Icon label="🎸" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tunings"
        options={{
          title: 'Accordages',
          tabBarIcon: ({ focused }) => <Icon label="🎵" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Apprendre',
          tabBarIcon: ({ focused }) => <Icon label="📖" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
