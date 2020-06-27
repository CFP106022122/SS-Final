import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { connect } from "react-redux";

class HomeworkHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { homeworkList, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={homeworkList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
                <Card>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  homeworkList: state.homeworkList.homeworkList,
}))(HomeworkHomeScreen);
