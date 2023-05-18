import { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View, TextInput } from "react-native";

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
    }
  ];
}

export default function PostScreen(props: { route: any; navigation: any }) {
  const postId = props.route?.params?.postId;
  const [post, setPost] = useState<PostById | null>();
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const postById = async () => {
      const data = await fetch(
        `http://localhost:3000/post/postbyid?id=${postId}`
      );
      const resp = await data.json();
      setPost(resp);
    };
    postById();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: "black",
          }}
        >
          <Text>{post?.title}</Text>
          <Text>From: {post?.user.name}</Text>
          <Text>Posted: {post?.createdAt}</Text>
          <Text></Text>
          <Text>{post?.message}</Text>
        </View>
        <View>
          {post?.comments != null ? (
            <View>
              {post?.comments.map((comment: any) => (
                <View key={comment.id}>
                  <Text>{comment.user.name}</Text>
                  <Text>{comment.message}</Text>
                  <Text>{comment.createdAt}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No comments</Text>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Comment"
            style={{
              flex: 1,
              flexGrow: 1,
              padding: 5,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 25,
              marginTop: 10,
            }}
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <Button title="Send" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
