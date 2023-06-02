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

export default function PostFormat(props: {navigation: any, post: PostById | null | undefined}) {
  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
            source={{uri: props.post?.user.image}}
            style={{width: 50, height: 50, borderRadius: 50}}
            />
        <Text style={{textAlign: 'center'}} onPress={() => props.navigation.navigate("ProfileScreen", {username: props.post?.user.name})}>
          {props.post?.user.name}
          </Text>
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 18}}>{props.post?.title}</Text>
        <Text>Posted: {new Date(props.post?.createdAt!).toLocaleString()}</Text>
        <Text></Text>
        <Text>{props.post?.message}</Text>
      </View>
    </View>
  );
}
