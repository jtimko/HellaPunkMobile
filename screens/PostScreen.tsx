import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { SafeAreaView, ScrollView, Text, View, Dimensions } from "react-native";
import PostFormat from "../components/PostFormat";
import CommentCard from "../components/CommentCard";
import SendMessage from "../components/SendMessage";

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
  const [refetch, setRefetch] = useState<boolean>(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const postById = async () => {
      const data = await fetch(
        `http://localhost:3000/post/postbyid?id=${postId}`
      );
      const resp = await data.json();
      setPost(resp);
    };
    postById();
  }, [refetch]);

  async function addComment(comment: string) {
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
        setRefetch(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <PostFormat navigation={props.navigation} post={post} />

        <View>
          {post?.comments != null ? (
            post?.comments.map((comment: PostById["comments"][0]) => (
              <CommentCard key={comment.id} comment={comment} navigation={props.navigation} />
            ))
          ) : (
            <Text>No comments</Text>
          )}
        </View>

        
      </ScrollView>
      <SendMessage addComment={addComment}  />
    </SafeAreaView>
  );
}
