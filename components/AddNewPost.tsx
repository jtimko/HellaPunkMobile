import { View, Button} from "react-native";

export default function AddNewPost(props: { navigation: any }) {
    return (
        <View style={{position: "absolute", bottom: 0, right: 0}}>
            <Button 
                title="Add"
                onPress={() => props.navigation.navigate("NewPost")}
            />
        </View>
    )
}