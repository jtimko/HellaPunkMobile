import {View, Text, TouchableOpacity, Image} from 'react-native';

interface Post {
  title: string;
  id: string;
  updatedAt: string;
  user: {
    name: string;
    image: string;
  };
  _count: {
    comments: number;
  };
}

export default function ForumCard(props: {post: Post; navigation: any}) {
  return (
    <TouchableOpacity
      style={{marginTop: 10, backgroundColor: '#eee', padding: 10}}
      onPress={() =>
        props.navigation.navigate('Post', {postId: props.post.id})
      }>
      <View style={{flexDirection: 'row'}}>
        <View style={{}}>
            <Image source={{uri: props.post.user.image}} style={{width: 50, height: 50, borderRadius: 50}} />
          <Text style={{fontStyle: 'italic', color: '#a3a3a3', textAlign: 'center'}}>
            {props.post.user.name}
          </Text>
        </View>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 18}}>{props.post.title}</Text>
          <Text style={{fontStyle: 'italic', color: '#a3a3a3'}}>
            {new Date(props.post.updatedAt).toLocaleString()}
          </Text>
          <Text>Comments: {props.post._count.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
