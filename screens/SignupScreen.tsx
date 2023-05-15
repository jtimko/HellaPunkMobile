// useEffect(() => {

//   }
//   oneTime();
// }, []);

import { Button, SafeAreaView, ScrollView, Text, View, TextInput } from "react-native";
import auth from '@react-native-firebase/auth';
import { useState } from "react";

export default function HomeScreen() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    async function signUp() {
        try {
            await auth().createUserWithEmailAndPassword(email, password);

            await fetch("http://localhost:3000/user/newuser", {
                method: "POST",
                body: JSON.stringify({ email: auth().currentUser?.email }),
            });
        } catch (e: any) {
            if (e.code === 'auth/email-already-in-use')
                setError('That email address is already in use!');
            
            if (e.code === 'auth/invalid-email') 
                setError('That email address is invalid!');

            setError(error);
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
                        title="Signup"
                        onPress={() => { signUp() }}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}