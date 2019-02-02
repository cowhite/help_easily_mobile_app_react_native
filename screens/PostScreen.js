import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image, RefreshControl } from 'react-native';
import { Video } from 'expo';
import { ExpoLinksView } from '@expo/samples';

export default class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "post": null,
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Post Details',
  };

  componentDidMount() {
    alert("Did mount "+this.props.navigation.state.params.post.id)
    this.setState({"post": this.props.navigation.state.params.post})
    if(this.state.post) {
      this.fetchData(this.props.navigation.state.params.post.id);
    }
  }

  fetchData(id) {
    if(!id) {
      id = this.state.post.id;
    }
    fetch('http://192.168.0.104:8000/api/v1/posts/'+id+'/')
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({"post": resJson, refreshing: false});
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
  }

  renderPostikd() {
    return <Text>{this.state.post.content}</Text>
  }

  renderPost() {
    var post = this.state.post;
      return <View style={styles.post} key={'post-'+post.id}>
      <Text style={styles.postTitle}>{post.content}</Text>
      <Text>Images:</Text>

      <View>
      {post.images_json.map((image_url) => {
        return <View key={image_url}
        >
        <Image
          style={{height: 150}}
          source={{uri: image_url}}

        />
        </View>
      })}
      </View>

      <Text>Videos:</Text>

      {post.videos_json.map((video_url) => {
        return <View style={styles.im}
          key={video_url}
        >
        <Video
          source={{ uri: video_url }}
          resizeMode="cover"
          style={{ height: 300 }}

        />
        </View>
      })}

      </View>
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
        {this.state.post? this.renderPost(): <Text>No post here</Text>}

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
