import { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function SettingsScreen() {
    const [username, setUsername] = useState<string | null>(null);
    const [changeUsername, setChangeUsername] = useState<string>("");

    useEffect(() => {
      async function getUsername() {
        await fetch("http://localhost:3000/user/getusername", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: auth().currentUser?.email }),
        }).then((resp) => resp.json())
          .then((resp) => setUsername(resp.name));
      }
      getUsername();
    }, []);

    async function updateUsername() {
      if (changeUsername == "") return;
      if (changeUsername == username) return;

      const data = await fetch("http://localhost:3000/user/namechange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: auth().currentUser?.email, name: changeUsername}),
      }).then((resp) => resp.json()).then((resp) => setUsername(changeUsername));
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView style={{flex: 1}}>
          {username && 
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginBottom: 15}}>
                <TextInput
                  defaultValue={username}
                  style={{ height: 25, padding: 5, borderColor: 'gray', borderWidth: 1, borderRadius: 25, width: 200, textAlign: 'center' }}
                  onChangeText={text => setChangeUsername(text)}
                  />
                <Text style={{textAlign: 'center'}}>Username</Text>
              </View>
              <Button
                title="Save"
                onPress={() => updateUsername()}
                />
            </View>
          }
        </SafeAreaView>
      </View>
    );
  }