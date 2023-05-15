import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import auth from '@react-native-firebase/auth';

export default function HomeScreen() {
    const user = auth().currentUser;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            {!user ? <View>
              <Button
                title="Need to login!"
              //onPress={() => loginOptions()}
              />
            </View>
              :
              <View>
                <Text>Hi {user.email}</Text>
              </View>
            }
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }