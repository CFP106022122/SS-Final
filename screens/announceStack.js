import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import AnnouncementDetails from "./announceDetails";
import AnnouncementHomeScreen from "./announceHome";

const Stack = createStackNavigator();

class AnnouncementStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { announcementList, courseID } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AnnouncementHome"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <AnnouncementHomeScreen {...props} courseID={courseID} />}
        </Stack.Screen>

        {announcementList.map((announcement) => (
          <Stack.Screen
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
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementStack);
