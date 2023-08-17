import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Typography from "../components/Atoms/Typography";
import * as Button from "../components/Atoms/Button";

const Filter = [
  {
    id: 1,
    name: "Merchant",
    screenName: "Merchant",
  },
  {
    id: 2,
    name: "Cities",
    screenName: "City"
  },
];

export default function UsecaseOne({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Typography.Title>
        Spending Analysis by following Categories
      </Typography.Title>
      {Filter.map((item, index) => {
        return (
          <Button.BtnOutline
            key={index}
            label={item.name}
            color="#7BB274"
            width={150}
            labelsize={15}
            labelcolor="#000"
            onPress={() => navigation.navigate(item.screenName)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
});
