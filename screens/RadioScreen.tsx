import { useEffect, useState } from "react";
import TrackPlayer, {
  Event,
} from "react-native-track-player";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function RadioScreen() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [trackTitle, setTrackTitle] = useState<string>("");

  useEffect(() => {
    async function startRadio() {
      await TrackPlayer.setupPlayer();

      const data = await fetch("http://localhost:3000/radio");
      const resp = await data.json();
      const url = resp.radio;

      var track1 = {
        url: url, // Load media from the network
        title: "HellaPunk Radio",
        artist: "HellaPunk Radio",
        album: "HellaPunk Radio",
        duration: 402, // Duration in seconds
      };
      TrackPlayer.add(track1);

      TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, async (event) => {
          const title = event.artist + " - " + event.title;
          if (title) setTrackTitle(title);
        }
      );
    }
    startRadio();
  }, []);

  function radioControl() {
    setIsPlaying(!isPlaying);
    if (isPlaying) TrackPlayer.play();
    else TrackPlayer.pause();
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Button
            onPress={() => radioControl()}
            title={isPlaying ? "Play" : "Pause"}
          />
          {trackTitle != "" ? <Text>Now Playing: {trackTitle}</Text> : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
