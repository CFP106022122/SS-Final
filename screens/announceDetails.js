import React, { Children } from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList } from "react-native";
import { getAnnouncementDetail } from "../states/announce-action";
import { globalStyles } from "../styles/global";
import Wait from "../shared/wait";

class AnnouncementDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, newsID } = this.props.route.params;
    this.props.dispatch(getAnnouncementDetail(courseID, newsID));
  }
  render() {
    const { announcementDetail, navigation, isLoading } = this.props;
    let children = <Wait />;
    if (!isLoading && announcementDetail.length) {
      children = (
        <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>
            {announcementDetail[0].title}
          </Text>
          <Text>{announcementDetail[0].Announcement}</Text>
          <FlatList
            data={announcementDetail[0].attatch}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.downloadLink}</Text>
                </View>
              );
            }}
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
