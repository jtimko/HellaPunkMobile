import { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Dimensions, RefreshControl } from "react-native";
import AddNewPost from "../components/AddNewPost";
import ForumCard from "../components/ForumCard";

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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ForumScreen(props: { navigation: any }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    useEffect(() => {
        const latestPost = async () => {
            const data = await fetch("http://localhost:3000/post/latest");
            const resp = await data.json();
            setPosts(resp);
        }
        latestPost();
    }, [refreshing]);

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={{ height: windowHeight - 125, width: windowWidth}}>
                    {posts.map((post: Post) => (
                       <ForumCard key={post.id} post={post} navigation={props.navigation} />
                    ))}
                    <AddNewPost navigation={props.navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
