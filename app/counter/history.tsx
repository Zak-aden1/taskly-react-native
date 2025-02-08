import { FlatList, StyleSheet, Text, View } from "react-native";
import { countdownStorageKey, persistedCountDownState } from ".";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { getFromStorage } from "../../utils/storage";

const fullDateFormat = `LLL d yyyy, hh:mm aaa`;

export default function HistoryScreen() {
  const [count, setCount] = useState<persistedCountDownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCount(value);
    };
    init();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={count?.completedAtTimestamps}
      ListEmptyComponent={<Text>No history</Text>}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  listContent: {
    marginTop: 8,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
