import React, { Children } from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList } from "react-native";
import { getMaterialDetail } from "../states/material-action";
import { globalStyles } from "../styles/global";
import Wait from "../shared/wait";

class MaterialDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, materialID } = this.props.route.params;
    this.props.dispatch(getMaterialDetail(courseID, materialID));
  }
  render() {
    const { materialDetail, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && materialDetail.length) {
      children = (
        <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>
            {materialDetail[0].title[0]}
          </Text>
          {/* <Text>{materialDetail[0].Material}</Text> */}
          <FlatList
            data={materialDetail[0].attachment}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.link}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.title}
          />
          <Button title="go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  materialDetail: state.materialDetail.materialDetail,
  isLoading: state.materialDetail.isLoading,
}))(MaterialDetails);
