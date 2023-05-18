import { useState } from 'react';
import { SafeAreaView, TextInput, View, Text, Button, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function NewPostScreen(props: { navigation: any }) {
    const [title, setTitle] = useState<String>("");
    const [message, setMessage] = useState<String>("");
    const [error, setError] = useState<String>("");

    async function postMessage() {
        if (title.length > 0 && message.length > 0) {
            const data = await fetch("http://localhost:3000/post/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    message,
                    email: auth().currentUser?.email
                })
            });
            const resp = await data.json();
            if (resp.error) {
                setError(resp.error);
            } else {
                setTitle("");
                setMessage("");
                setError("");
                props.navigation.navigate("Forum");
            }
        } else {
            setError("Post must have a title and message.");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {error && <Text>{error}</Text>}
                    <TextInput
                        placeholder="Title"
                        onChangeText={text => setTitle(text)}
                        style={{ padding: 5, borderWidth: 1, borderColor: "black", borderRadius: 25, width: 200, marginTop: 30 }}
                    />
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        placeholder="Message"
                        onChangeText={text => setMessage(text)}
                        style={{ padding: 5, borderWidth: 1, borderColor: "black", borderRadius: 25, width: 200, marginTop: 10 }}
                    />
                    <Button
                        title="Post"
                        onPress={() => { postMessage() }}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}