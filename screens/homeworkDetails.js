import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList } from "react-native";
import { getHomeworkDetail } from "../states/homework-action";
import { globalStyles } from "../styles/global";
import Wait from "../shared/wait";

class HomeworkDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, homeworkID } = this.props.route.params;
    this.props.dispatch(getHomeworkDetail(courseID, homeworkID));
  }
  render() {
    const { homeworkDetail, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && homeworkDetail.length) {
      children = (
        <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>
            {homeworkDetail[0].Content}
          </Text>
          {/* <Text>{homeworkDetail[0].Homework}</Text> */}
          <FlatList
            data={homeworkDetail[0].attachment}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.attachname}</Text>
                  <Text>{item.link}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.attachname}
          />
          <Button title="go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  homeworkDetail: state.homeworkDetail.homeworkDetail,
  isLoading: state.homeworkDetail.isLoading,
}))(HomeworkDetails);
