import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../../theme";

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable>
                <MaterialIcons
                  name="history"
                  size={24}
                  color={theme.colors.grey}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
