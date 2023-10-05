import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {skipToNext, skipToPrevious} from '../../services/audioPlayService';

function ControlCenter() {
  const playbackState = usePlaybackState();
  const [musicRepeatMode, setMusicRepeatMode] = useState<number>(2);
  const [queueSongs, setQueueSongs] = useState<any>();

  const repeatMode = async (state: RepeatMode) => {
    await TrackPlayer.setRepeatMode(state);
    setMusicRepeatMode(state);
  };

  const getQueueSongs = async () => {
    const songList = await TrackPlayer.getQueue();
    setQueueSongs(songList);
  };

  const togglePlayback = async (playback: State) => {
    const currenTrack = await TrackPlayer.getCurrentTrack();

    if (currenTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const getMusicRepeatMode = async () => {
    const getCurrentRepeatMode = await TrackPlayer.getRepeatMode();
    setMusicRepeatMode(getCurrentRepeatMode);
  };

  useEffect(() => {
    getMusicRepeatMode();
  }, []);

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.otherControls}>
        {musicRepeatMode === 0 && (
          <Pressable onPress={() => repeatMode(RepeatMode.Track)}>
            <Icon name="repeat-off" size={20} />
          </Pressable>
        )}
        {musicRepeatMode === 1 && (
          <Pressable onPress={() => repeatMode(RepeatMode.Queue)}>
            <Icon name="repeat-once" size={20} />
          </Pressable>
        )}
        {musicRepeatMode === 2 && (
          <Pressable onPress={() => repeatMode(RepeatMode.Off)}>
            <Icon name="repeat" size={20} />
          </Pressable>
        )}
      </View>
      <View style={styles.mainControls}>
        <Pressable onPress={skipToPrevious}>
          <Icon name="skip-previous" size={30} />
        </Pressable>
        <Pressable onPress={() => togglePlayback(playbackState)}>
          <Icon
            style={styles.playPauseBtn}
            name={playbackState === State.Playing ? 'pause' : 'play'}
            size={60}
          />
        </Pressable>
        <Pressable onPress={skipToNext}>
          <Icon name="skip-next" size={30} />
        </Pressable>
      </View>
      <View>
        <View>
          <Pressable onPress={() => getQueueSongs()}>
            <Text>List</Text>
          </Pressable>
        </View>
      </View>
      {/* {queueSongs && (
        <FlatList
          data={queueSongs}
          keyExtractor={song => song?.title}
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      )} */}
    </View>
  );
}

export default ControlCenter;

const styles = StyleSheet.create({
  controlsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
