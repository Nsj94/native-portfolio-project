import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const SongSlider = () => {
  const {duration, position} = useProgress();
  const changeTrackPosition = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };
  return (
    <View>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={changeTrackPosition}
      />
      <View style={styles.songTimings}>
        <Text>
          {new Date(position * 1000).toISOString().substring(15, 19)}{' '}
        </Text>
        <Text>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}{' '}
        </Text>
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#fff',
    width: 250,
    margin: 10,
  },
  songTimings: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
