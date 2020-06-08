import React from "react";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import AnnouncementStackScreen from "./announceStack";
import MaterialStackScreen from "./materialStack";
import HomeworkStackScreen from "./homeworkStack";
import GradeStackScreen from "./gradeStack";
import ForumStackScreen from "./forumStack";

const Tab = createBottomTabNavigator();

class Course extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { route } = this.props;
    return (
      <Tab.Navigator>
        <Tab.Screen name="Announcement" component={AnnouncementStackScreen} />
        <Tab.Screen name="Material" component={MaterialStackScreen} />
        <Tab.Screen name="Homework" component={HomeworkStackScreen} />
        <Tab.Screen name="Grade" component={GradeStackScreen} />
        <Tab.Screen name="Forum" component={ForumStackScreen} />
      </Tab.Navigator>
    );
  }
}

export default connect()(Course);
