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

class AnnouncementHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getAnnouncementList(this.props.courseID));
  }

  render() {
    const { announcementList, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={announcementList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(`${item.title}`)}
              >
                <Card>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementHomeScreen);
