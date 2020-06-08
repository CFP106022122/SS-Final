import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import AnnouncementDetailsScreen from "./announceDetails";
import AnnouncementHomeScreen from "./announceHome";

const Stack = createStackNavigator();

class AnnouncementStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { announcements } = this.props;
    const titles = announcements.map((announcement) => announcement.title);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AnnouncementHome"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <AnnouncementHomeScreen {...props} titles={titles} />}
        </Stack.Screen>

        {announcements.map((announcement) => (
          <Stack.Screen
            name={announcement.title}
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <AnnouncementDetailsScreen
                {...props}
                details={announcement.details}
              />
            )}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    );
  }
}

export default connect((state) => ({
  announcements: state.announcements.announcements,
}))(AnnouncementStack);
