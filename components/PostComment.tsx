import {View, Text, Image} from 'react-native';

interface PostById {
  id: string;
  title: string;
  userId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    image: string;
  };
  comments: [
    {
      id: string;
      message: string;
      createdAt: string;
      user: {
        name: string;
        image: string;
      };
    },
  ];
}

export default function PostComment({
  comments,
}: {
  comments: PostById | null | undefined;
}) {
  return (
    <View
      style={{
        padding: 5,
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{flex: 2}}>
        <Text>{comments?.message}</Text>
        <Text style={{fontStyle: 'italic', color: '#cecece', marginTop: 5}}>{new Date(comments?.createdAt!).toLocaleString()}</Text>
      </View>
      <View style={{flex: 1}}>
      <Image
            source={{uri: comments?.user.image}}
            style={{width: 50, height: 50, borderRadius: 50}}
            />
        <Text>From: {comments?.user.name}</Text>
      </View>
    </View>
  );
}
