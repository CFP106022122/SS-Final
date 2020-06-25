import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { getAnnouncementDetail } from "../states/announce-action";
import { globalStyles } from "../styles/global";

class AnnouncementDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(
      getAnnouncementDetail(this.props.courseID, this.props.newsID)
    );
  }
  render() {
    const { announcementDetail } = this.props;
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>{announcementDetail.title}</Text>
        <Text>{announcementDetail.Announcement}</Text>
        <FlatList
          data={announcementDetail.attatch}
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
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}

export default connect((state) => ({
  announcementDetail: state.announcementDetail.announcementDetail,
}))(AnnouncementDetails);
