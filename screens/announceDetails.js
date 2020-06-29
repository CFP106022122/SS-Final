import React, { Children } from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList, ScrollView } from "react-native";
import { getAnnouncementDetail } from "../states/announce-action";
import { globalStyles } from "../styles/global";
import Wait from "../shared/wait";

class _ListItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.downloadLink}</Text>
      </View>
    );
  }
}

class AnnouncementDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, newsID } = this.props.route.params;
    this.props.dispatch(getAnnouncementDetail(courseID, newsID));
  }
  renderItem = ({ item }) => <_ListItem item={item} />;
  render() {
    const { announcementDetail, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && announcementDetail.length) {
      children = (
        <View style={globalStyles.container}>
          <View style={globalStyles.detailTitle}>
            <Text style={globalStyles.titleText}>
              {announcementDetail[0].title}
            </Text>
          </View>
          <ScrollView>
            <View style={globalStyles.detailBox}>
              <Text style={globalStyles.detailText}>
                {announcementDetail[0].Announcement}
              </Text>
            </View>
          </ScrollView>

          <FlatList
            data={announcementDetail[0].attatch}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.name}
          />
          <Button title="go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  announcementDetail: state.announcementDetail.announcementDetail,
  isLoading: state.announcementDetail.isLoading,
}))(AnnouncementDetails);
