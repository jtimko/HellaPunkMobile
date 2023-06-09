import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForumScreen from "./ForumScreen";
import PostScreen from "./PostScreen";
import NewPostScreen from "./NewPostScreen";
import ProfileScreen from "./ProfileScreen";

const Stack = createNativeStackNavigator();
export default function HomeScreen(props: { navigation: any }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}