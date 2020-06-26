import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import MaterialDetails from "./materialDetails";
import MaterialHomeScreen from "./materialHome";

import { getMaterialList } from "../states/material-action";
import Wait from "../shared/wait";

const materialStack = createStackNavigator();

class MaterialStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getMaterialList(courseID));
  }
  render() {
    const { materialList, isLoading } = this.props;
    const { courseID } = this.props.route.params;
    let children = <Wait />;
    if (!isLoading && materialList.length) {
      children = (
        <materialStack.Navigator>
          <materialStack.Screen
            name="MaterialHome"
            options={{
              headerShown: false,
            }}
            component={MaterialHomeScreen}
          />
          {materialList.map((material) => {
            return (
              <materialStack.Screen
                key={material.id}
                name={material.title}
                options={{
                  headerShown: false,
                }}
                component={MaterialDetails}
                initialParams={{ courseID: courseID, materialID: material.id }}
              />
            );
          })}
        </materialStack.Navigator>
      );
    }

    return children;
  }
}

export default connect((state) => ({
  materialList: state.materialList.materialList,
  isLoading: state.materialList.isLoading,
}))(MaterialStack);
