import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

export default class AnnouncementHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titles, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={titles}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(`${item}`)}>
                <Card>
                  <Text style={globalStyles.titleText}>{item}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
}
