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

import { getAnnouncementList } from "../states/announce-action";
import { connect } from "react-redux";
import announceDetails from "./announceDetails";

class AnnouncementHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { announcementList, navigation } = this.props;
    console.log(announcementList.length);
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={announcementList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
                <Card>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementHomeScreen);
