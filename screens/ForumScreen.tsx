import { useEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView, ScrollView, Text, View } from "react-native";

interface Post {
    title: string;
    id: string;
    updatedAt: string;
    user: {
      name: string;
      image: string;
    }
    _count: {
      comments: number;
    }
  }
  
  export default function ForumScreen(props: { navigation: any }) {
    const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const latestPost = async () => {
        const data = await fetch("http://localhost:3000/post/latest");
        const resp = await data.json();
        setPosts(resp);
      }
      latestPost();
    }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              {posts.map((post: Post) => (
                <TouchableOpacity
                  key={post.id}
                  style={{ flex: 1, marginTop: 10, backgroundColor: "red" }}
                  onPress={() => props.navigation.navigate("Post", { postId: post.id })}
                >
                  <Text>{post.title}</Text>
                  <Text>{post.user.name}</Text>
                  <Text>{post.updatedAt}</Text>
                  <Text>{post._count.comments}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
  