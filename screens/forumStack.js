import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import ForumDetails from "./forumDetails";
import ForumHomeScreen from "./forumHome";

import { getForumList } from "../states/forum-action";
import Wait from "../shared/wait";

const forumStack = createStackNavigator();

class ForumStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getForumList(courseID));
  }
  render() {
    const { forumList, isLoading } = this.props;
    const { courseID } = this.props.route.params;
    let children = <Wait />;
    if (!isLoading && forumList.length) {
      children = (
        <forumStack.Navigator>
          <forumStack.Screen
            name="ForumHome"
            options={{
              headerShown: false,
            }}
            component={ForumHomeScreen}
          />
          {forumList.map((forum) => {
            return (
              <forumStack.Screen
                key={forum.id}
                name={forum.id}
                options={{
                  headerShown: false,
                }}
                component={ForumDetails}
                initialParams={{ courseID: courseID, forumID: forum.id }}
              />
            );
          })}
        </forumStack.Navigator>
      );
    }

    return children;
  }
}

export default connect((state) => ({
  forumList: state.forumList.forumList,
  isLoading: state.forumList.isLoading,
}))(ForumStack);
