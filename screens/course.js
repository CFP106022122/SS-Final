import React from "react";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    const { courseID } = this.props.route.params;
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Announcement"
          component={AnnouncementStackScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen
          name="Material"
          component={MaterialStackScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen name="Homework" component={HomeworkStackScreen} />
        <Tab.Screen name="Grade" component={GradeStackScreen} />
        <Tab.Screen name="Forum" component={ForumStackScreen} />
      </Tab.Navigator>
    );
  }
}

export default connect()(Course);
