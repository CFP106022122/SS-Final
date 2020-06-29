import React, { Children } from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList } from "react-native";
import { getMaterialDetail } from "../states/material-action";
import { globalStyles } from "../styles/global";
import Wait from "../shared/wait";

class _ListItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    //todo link
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.link}</Text>
      </View>
    );
  }
}

class MaterialDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, materialID } = this.props.route.params;
    this.props.dispatch(getMaterialDetail(courseID, materialID));
  }
  renderItem = ({ item }) => <_ListItem item={item} />;
  render() {
    const { materialDetail, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && materialDetail.length) {
      children = (
        <View style={globalStyles.container}>
          <View style={globalStyles.detailTitle}>
            <Text style={globalStyles.titleText}>
              {materialDetail[0].title[0]}
            </Text>
          </View>
          {/* NEED DESCRIPTION HERE */}
          <FlatList
            data={materialDetail[0].attachment}
            renderItem={this.renderItem}
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
