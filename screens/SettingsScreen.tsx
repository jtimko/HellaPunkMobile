import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <Text>Settings</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }