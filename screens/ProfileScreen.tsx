import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

interface User {
    name: string;
    image: string;
    url: string;
}

export default function ProfileScreen(props: {route: any, navigation: any}) {
    const username = props.route?.params?.username;

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    

    useEffect(() => {
        async function getUser() {
            const data = await fetch("http://localhost:3000/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: username}),
            })
            .then((resp) => resp.json())
            .then((resp) =>  {
                    setUser(resp);
                    setIsLoading(false);
                });
        }
        getUser();
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { isLoading ? <Text>Loading...</Text>
        : <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: user?.image}}
              style={{width: 50, height: 50, borderRadius: 50}}
              />
            <Text style={{textAlign: 'center'}}>{user?.name}</Text>
            <Text style={{textAlign: 'center'}}>{user?.url}</Text>
        </View>

      }
    </View>
  );
}
