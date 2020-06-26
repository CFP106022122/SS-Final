import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { connect } from "react-redux";

class MaterialHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { materialList, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={materialList}
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
  materialList: state.materialList.materialList,
}))(MaterialHomeScreen);
