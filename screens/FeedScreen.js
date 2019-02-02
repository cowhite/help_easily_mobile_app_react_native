import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image, RefreshControl, TouchableHighlight } from 'react-native';
import { Video, Icon } from 'expo';
import { ExpoLinksView } from '@expo/samples';
import PostScreen from '../screens/PostScreen';


export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": [],
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Feed',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://192.168.0.104:8000/api/v1/posts/')
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({"posts": resJson.results, refreshing: false});
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
  }

  onPress(post){
    this.props.navigation.navigate(
      'Post',
      {post},
    );
  }

  renderPosts() {
    return this.state.posts.map((post) => {
      return <View style={styles.post} key={'post-'+post.id}>
      <TouchableHighlight onPress={()=>{this.onPress(post)} } >
        <Text style={styles.postTitle}>{post.content}</Text>
      </TouchableHighlight>

      <Text>Images:</Text>

      <View style={styles.postImageList}>
      {post.images_json.map((image_url) => {
        return <View
          key={image_url}
        >
        <Image
          style={{width: 100, height: 100}}
          source={{uri: image_url}}
        /></View>
      })}
      </View>

      </View>
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.renderPosts()}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
        <Text>
          Hello
          This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content This is some content

        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  post: {
    flex: 1,
    padding: 5,
    marginBottom: 20
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 3,
    paddingRight: 3
  },
  postImageList: {
    flex: 1,
    flexDirection: 'row',
  }
});
