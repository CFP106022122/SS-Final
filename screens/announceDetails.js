import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

export default class AnnouncementDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { details, navigation } = this.props;
    return (
      <View>
        <Text>{details}</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
