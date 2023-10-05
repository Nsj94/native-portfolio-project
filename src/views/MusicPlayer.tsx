import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import ControlCenter from '../components/MusicAppComponent/ControlCenter';
import SongInfo from '../components/MusicAppComponent/SongInfo';
import SongSlider from '../components/MusicAppComponent/SongSlider';
import {
  addTrack,
  setupPlayer,
  skipToNext,
  skipToPrevious,
} from '../services/audioPlayService';

export default function MusicPlayer() {
  const [playerReady, setPlayerReady] = useState(false);

  const [track, setTrack] = useState<Track | null>();

  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }
    setPlayerReady(isSetup);
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  useEffect(() => {
    setup();
  }, []);

  const songImage = () => {
    return (
      <View style={styles.songImageContainer}>
        {track?.artwork && (
          <Pressable
            onTouchStart={(e: GestureResponderEvent) =>
              (this.touchX = e.nativeEvent.pageX)
            }
            onTouchEnd={(e: GestureResponderEvent) => {
              if (this.touchX - e.nativeEvent.pageX > 20) {
                skipToNext().then(async () => TrackPlayer.play());
              }
              if (this.touchX - e.nativeEvent.pageX < 20) {
                skipToPrevious().then(async () => TrackPlayer.play());
              }
            }}>
            <Image
              style={styles.songImage}
              source={{uri: track?.artwork?.toString()}}
            />
          </Pressable>
        )}
        <Text style={styles.songTitle}>{track?.title} </Text>
      </View>
    );
  };

  if (!playerReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>MusicPlayer</Text>

      {songImage()}
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  songImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  songImage: {height: 200, width: 200},
  songTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
