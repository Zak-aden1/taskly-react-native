import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../theme";
import { useState } from "react";

export default function ShoppingListItem({
  item,
  isChecked,
  id,
  onDelete,
  onComplete,
}: {
  item: string;
  isChecked?: boolean;
  id: string;
  onDelete: (id: string) => void;
  onComplete: () => void;
}) {
  const handleDelete = () => {
    Alert.alert("Deleted?, Are you sure?", "this will be gone for good", [
      {
        text: "yes",
        onPress: () => onDelete(id),
        style: "destructive",
      },
      {
        text: "cancel",
        onPress: () => console.log("ok not deleting"),
        style: "cancel",
      },
    ]);
  };

  return (
    <Pressable
      style={[styles.itemContainer, isChecked && styles.checkedContainer]}
      onPress={onComplete}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Entypo name={isChecked ? "check" : "circle"} size={24} color="black" />
        <Text
          style={[
            styles.text,
            isChecked && { textDecorationLine: "line-through" },
          ]}
        >
          {" "}
          {item}!{" "}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleDelete}
        // style={[styles.button, isChecked && styles.completedButton]}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color={isChecked ? theme.colors.grey : theme.colors.red}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkedContainer: {
    backgroundColor: theme.colors.lightGrey,
    borderBottomColor: theme.colors.lightGrey,
  },
  text: {
    color: "red",
    fontSize: 18,
    fontWeight: 200,
    // textAlign: "center",
    // flex: 1,
    borderBottomColor: theme.colors.primary,
  },
  // button: {
  //   backgroundColor: "black",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // completedButton: {
  //   backgroundColor: "grey",
  // },
  // buttonText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textTransform: "uppercase",
  //   letterSpacing: 1,
  // },
});
