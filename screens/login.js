import React from "react";
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { login, SetIsWrongOff } from "../states/home-action";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      password: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isWrong) {
      Alert.alert(
        "Oops! Something Wrong = =",
        "Maybe your account or password is incorrect",
        [
          {
            text: "OK QQ",
            onPress: () => this.props.dispatch(SetIsWrongOff()),
          },
        ],
        { cancelable: false }
      );
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("user").then((value) => {
      if (value) {
        const user = JSON.parse(value);
        const { account, password } = user;
        console.log(account, password, "???");
        this.props.dispatch(login(account, password));
      }
    });
  }

  handleSubmit = () => {
    const { account, password } = this.state;
    // console.log(account, password);
    this.props.dispatch(login(account, password));
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Account"
            style={styles.input}
            value={this.state.account}
            onChangeText={(value) => {
              this.setState({ account: value });
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={this.state.password}
            onChangeText={(value) => {
              this.setState({ password: value });
            }}
            secureTextEntry
          />
          <Button title="Login" onPress={this.handleSubmit} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default connect((state) => ({
  isWrong: state.home.isWrong,
}))(Login);
