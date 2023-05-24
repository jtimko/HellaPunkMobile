import {View, Text, TouchableOpacity} from "react-native";

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

export default function ForumCard(props: { post: Post, navigation: any }) {
    return (
        <View>
        <TouchableOpacity
            style={{ marginTop: 10, backgroundColor: "#eee", padding: 10 }}
            onPress={() => props.navigation.navigate("Post", { postId: props.post.id })}
        >
            <Text style={{fontSize: 18}}>{props.post.title}</Text>
            <Text style={{fontStyle: 'italic', color: '#a3a3a3'}}>{props.post.user.name}</Text>
            <Text style={{fontStyle: 'italic', color: '#a3a3a3'}}>{new Date(props.post.updatedAt).toLocaleString()}</Text>
            <Text>Comments: {props.post._count.comments}</Text>
        </TouchableOpacity>
    </View>

    );
}