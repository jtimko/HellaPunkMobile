import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

function Test1(props: { navigation: any }) {
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
                onPress={() => props.navigation.navigate("EditPost", { username: post.user.name })}
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

function Test2(props: {route: any, navigation: any}) {
  const post = props.route?.params?.username;
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello {post}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
export default function HomeScreen(props: { navigation: any }) {


  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Test1} />
      <Stack.Screen name="EditPost" component={Test2} />
    </Stack.Navigator>
  );
}