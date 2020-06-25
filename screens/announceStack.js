import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import AnnouncementDetails from "./announceDetails";
import AnnouncementHomeScreen from "./announceHome";

import { getAnnouncementList } from "../states/announce-action";

const announcementStack = createStackNavigator();

class AnnouncementStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(getAnnouncementList(this.props.courseID));
  }
  render() {
    const { announcementList, courseID } = this.props;
    // console.log(announcementList);
    return (
      <announcementStack.Navigator>
        <announcementStack.Screen
          name="AnnouncementHome"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <AnnouncementHomeScreen {...props} courseID={courseID} />}
        </announcementStack.Screen>
        {announcementList.map((announcement) => (
          <announcementStack.Screen
            name={announcement.title}
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <AnnouncementDetails
                {...props}
                courseID={courseID}
                newsID={announcement.id}
              />
            )}
          </announcementStack.Screen>
        ))}
      </announcementStack.Navigator>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementStack);
