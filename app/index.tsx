import * as Haptics from "expo-haptics";

import {
  Alert,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { getFromStorage, saveToStorage } from "../utils/storage";
import { useEffect, useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import ShoppingListItem from "../components/ShoppingListItem";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

type ShoppingListItem = {
  id: string;
  item: string;
  isChecked: boolean;
  lastUpdatedTimestamp: number;
};

const storageKey = "shopping-list";

function orderShoppingList(shoppingList: ShoppingListItem[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.isChecked && !item2.isChecked) {
      return 1;
    }

    if (!item1.isChecked && item2.isChecked) {
      return -1;
    }

    if (!item1.isChecked && item2.isChecked) {
      return -1;
    }

    if (!item1.isChecked && !item2.isChecked) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

export default function App() {
  const router = useRouter();
  const [item, setItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  const handleAddItem = (item: string) => {
    setShoppingList([
      ...shoppingList,
      {
        id: Date.now().toString(),
        item,
        isChecked: false,
        lastUpdatedTimestamp: Date.now(),
      },
    ]);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    saveToStorage(storageKey, shoppingList);
  };

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (data) setShoppingList(data);
    };
    fetchInitial();
  }, []);

  const handleDeleteItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const onComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      style={styles.container}
      data={orderShoppingList(shoppingList)}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View>
          <Text>SHopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          placeholder="Add item"
          style={styles.input}
          value={item}
          onChangeText={setItem}
          returnKeyType="done"
          onSubmitEditing={() => {
            handleAddItem(item);
            setItem("");
          }}
        />
      }
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            item={item.item}
            isChecked={item.isChecked}
            id={item.id}
            onDelete={handleDeleteItem}
            onComplete={() => onComplete(item.id)}
          />
        );
      }}
    />
    // <ScrollView
    //   style={styles.container}
    //   contentContainerStyle={{ flexGrow: 1 }}
    // >
    //   {/* <Link href="/counter" style={{ alignSelf: "center", marginBottom: 10 }}>
    //     Go to Counter
    //   </Link>
    //   <TouchableOpacity onPress={() => router.push("/idea")}>
    //     <Text>Go to Idea</Text>
    //   </TouchableOpacity> */}
    //   {/* <Link href="/idea"> Go to Idea </Link> */}
    //   <TextInput
    //     placeholder="Add item"
    //     style={styles.input}
    //     value={item}
    //     onChangeText={setItem}
    //     returnKeyType="done"
    //     onSubmitEditing={() => {
    //       handleAddItem(item);
    //       setItem("");
    //     }}
    //   />
    //   {shoppingList.map((item) => (
    //     <ShoppingListItem
    //       key={item.id}
    //       item={item.item}
    //       isChecked={item.isChecked}
    //       id={item.id}
    //       onDelete={handleDeleteItem}
    //     />
    //   ))}
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});
