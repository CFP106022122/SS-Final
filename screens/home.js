import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    axios
      .get(
        "https://lms.nthu.edu.tw/sys/lib/ajax/login_submit.php?account=106022122&password=46011014&ssl=1&stay=1"
      )
      .then(
        axios
          .get("https://lms.nthu.edu.tw/home.php")
          .then((res) => console.log(res))
      );
    const { coursesNames, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={coursesNames}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(`${item}`)}>
                <Card>
                  <Text style={globalStyles.titleText}>{item}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
        <View style={styles.footer}>
          <AntDesign
            name="left"
            size={30}
            color="black"
            style={styles.left}
            onPress={() => navigation.navigate("Curriculum")}
          />
          <FontAwesome
            name="calendar"
            size={46}
            color="black"
            style={styles.curriculum}
            onPress={() => navigation.navigate("Curriculum")}
          />
          <Text style={styles.text1}>Curriculum</Text>
          <Text style={styles.text2}>Calendar</Text>
          <FontAwesome
            name="calendar-check-o"
            size={46}
            color="black"
            style={styles.calendar}
            onPress={() => navigation.navigate("Calendar")}
          />
          <AntDesign
            name="right"
            size={30}
            color="black"
            style={styles.right}
            onPress={() => navigation.navigate("Calendar")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  left: {
    position: "absolute",
    left: 0,
    top: 10,
  },
  curriculum: {
    position: "absolute",
    left: 32,
  },
  calendar: {
    position: "absolute",
    right: 32,
  },
  right: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  text1: {
    position: "absolute",
    left: 16,
    top: 46,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  text2: {
    position: "absolute",
    right: 22,
    top: 46,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default connect((state) => ({
  coursesNames: state.coursesNames.coursesNames,
}))(Home);
