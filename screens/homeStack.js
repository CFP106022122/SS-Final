import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import HomeScreen from "./home";
import CourseScreen from "./course";
import CurriculumScreen from "./curriculum";
import CalendarScreen from "./calendar";
import Header from "../shared/header";

import { getCourseList } from "../states/home-action";

const Stack = createStackNavigator();

class HomeStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getCourseList());
  }

  render() {
    const { courseList } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Header title="NTHUer" />,
          }}
        />
        {courseList.map((course) => {
          return (
            <Stack.Screen
              name={course.name}
              key={course.id}
              initialParams={{ courseID: course.id }}
              component={CourseScreen}
            />
          );
        })}
        <Stack.Screen name="Curriculum" component={CurriculumScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    );
  }
}

export default connect((state) => ({
  courseList: state.home.courseList,
}))(HomeStack);
