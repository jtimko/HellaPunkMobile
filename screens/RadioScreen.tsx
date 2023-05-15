import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function RadioScreen() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    async function startRadio() {
      await TrackPlayer.setupPlayer();

      const data = await fetch('http://localhost:3000/radio');
      const resp = await data.json();
      const url = resp.radio;

      var track1 = {
        url: url, // Load media from the network
        title: 'Avaritia',
        artist: 'HellaPunk Radio',
        album: 'HellaPunk Radio',
        // genre: 'Progressive House, Electro House',
        // date: '2014-05-20T07:00:00+00:00', // RFC 3339
        // artwork: 'http://example.com/cover.png', // Load artwork from the network
        duration: 402 // Duration in seconds
      };
      TrackPlayer.add(track1);
    }
    startRadio();
  }, []);

  function radioControl() {
    setIsPlaying(!isPlaying);
    if (isPlaying) 
      TrackPlayer.play();
    else 
      TrackPlayer.pause();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <Text>Radio</Text>
          <Button onPress={() => radioControl()} title={isPlaying ? "Pause" : "Play"} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}