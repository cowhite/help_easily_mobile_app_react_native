import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import AppNavigator from './navigation/AppNavigator';
import ActionButton from 'react-native-action-button';
import FontAwesome
  from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons
  from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />

          <View style={styles.addPostIconView}>
            <Icon
              raised
              name='plus'
              type='font-awesome'
              color='red'
              backgroundColor='red'
              style={styles.addPostStyle}
              onPress={() => console.log('hello')} />
          </View>

        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),

        FontAwesome,
        MaterialIcons
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
   console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  addPostStyle: {

    borderColor: 'yellow',
    borderWidth: 3,

  },
  addPostIconView: {
    position: 'absolute',
    right: 10,
    bottom: 50,
  }
});
