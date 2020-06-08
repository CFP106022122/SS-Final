import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Calendar</Text>
      </View>
    );
  }
}

export default connect()(Calendar);
