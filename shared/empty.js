import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
});

export default class Empty extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style = {styles.container}>
        <Text>No Data</Text>
      </View>
    );
  }
}
