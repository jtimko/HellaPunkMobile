import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Button, SafeAreaView, ScrollView, Text, View, TextInput } from "react-native";
import PostFormat from "../components/PostFormat";
import PostComment from "../components/PostComment";

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

  async function addComment() {
    await fetch("http://localhost:3000/post/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        message: comment,
        email: auth().currentUser?.email,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setComment("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <PostFormat post={post} />
        <View>
          {post?.comments != null ? (
            post?.comments.map((comment) => (
              <PostComment key={comment.id} comments={post} />
            ))
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
          <Button 
            title="Send"
            onPress={() => addComment()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
