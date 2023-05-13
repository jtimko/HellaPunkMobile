import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function RadioScreen() {
    useEffect(() => {
      async function startRadio() {
        await TrackPlayer.setupPlayer();
  
        var track1 = {
          url: 'http://23.239.22.251:8000/listen.pls?sid=1', // Load media from the network
          title: 'Avaritia',
          artist: 'HellaPunk Radio',
          album: 'while(1<2)',
          genre: 'Progressive House, Electro House',
          date: '2014-05-20T07:00:00+00:00', // RFC 3339
          artwork: 'http://example.com/cover.png', // Load artwork from the network
          duration: 402 // Duration in seconds
        };
        TrackPlayer.add(track1);
      }
  
      startRadio();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <Text>Radio</Text>
            <Button onPress={() => TrackPlayer.play()} title="Play" />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }