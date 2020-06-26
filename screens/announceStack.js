import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import AnnouncementDetails from "./announceDetails";
import AnnouncementHomeScreen from "./announceHome";

import { getAnnouncementList } from "../states/announce-action";
import course from "./course";

const announcementStack = createStackNavigator();

class AnnouncementStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getAnnouncementList(courseID));
  }
  render() {
    const { announcementList } = this.props;
    const { courseID } = this.props.route.params;
    console.log(announcementList.length, "??");
    return (
      <announcementStack.Navigator>
        <announcementStack.Screen
          name="AnnouncementHome"
          options={{
            headerShown: false,
          }}
          component={AnnouncementHomeScreen}
        />
        {announcementList.map((announcement) => {
          return (
            <announcementStack.Screen
              key={announcement.id}
              name={announcement.title}
              options={{
                headerShown: false,
              }}
              component={AnnouncementDetails}
              initialParams={{ courseID: courseID, newsID: announcement.id }}
            />
          );
        })}
      </announcementStack.Navigator>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementStack);
