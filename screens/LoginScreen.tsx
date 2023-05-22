import { Button, SafeAreaView, ScrollView, Text, View, TextInput } from "react-native";
import auth from '@react-native-firebase/auth';
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LoginScreen(props: { navigation: any }) {
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
                <Button
                    title="If you would like to create an account, click here"
                    onPress={() => props.navigation.navigate("SignupScreen")}
                    />
            </SafeAreaView>
        </View>
    );
}

function SignupScreen(props: { navigation: any }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    async function signup() {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
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
                        title="Signup"
                        onPress={() => {signup()}}
                    />
                    <Button
                        title="If you would like to login, click here"
                        onPress={() => props.navigation.navigate("LoginScreen")}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default function LoginStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}