import React from "react";
import { View, Text, FlatList } from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { connect } from "react-redux";
import Wait from "../shared/wait";
import { getGradeList } from "../states/grade-action";
class GradeHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getGradeList(courseID));
  }

  render() {
    const { gradeList, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && gradeList.length)
      children = (
        <View style={globalStyles.container}>
          <FlatList
            data={gradeList}
            renderItem={({ item }) => {
              return (
                <Card>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                  <Text style={globalStyles.titleText}>{item.score}</Text>
                </Card>
              );
            }}
            keyExtractor={(item) => item.title}
          />
        </View>
      );
    return children;
  }
}

export default connect((state) => ({
  gradeList: state.gradeList.gradeList,
  isLoading: state.gradeList.isLoading,
}))(GradeHomeScreen);
