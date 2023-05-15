import { Button, SafeAreaView, ScrollView, Text, View, TextInput } from "react-native";
import auth from '@react-native-firebase/auth';
import { useState } from "react";

export default function HomeScreen() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    async function login() {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e: any) {
            setError(e.message);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {error && <Text>{error}</Text>}
                    <TextInput
                        placeholder="Email"
                        onChangeText={text => setEmail(text)}
                        style={{ padding: 5, borderWidth: 1, borderColor: "black", borderRadius: 25, width: 200, marginTop: 30 }}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                        style={{ padding: 5, borderWidth: 1, borderColor: "black", borderRadius: 25, width: 200, marginTop: 10 }}
                    />
                    <Button
                        title="Login"
                        onPress={() => {login()}}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}