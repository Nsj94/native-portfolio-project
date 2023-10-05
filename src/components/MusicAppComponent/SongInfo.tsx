import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: null | Track | undefined;
}>;
function SongInfo(props: SongInfoProps): JSX.Element {
  const {track} = props;
  return (
    <View>
      <Text style={styles.artist}>
        Artist - {track?.artist} | Album - {track?.album}
      </Text>
    </View>
  );
}

export default SongInfo;

const styles = StyleSheet.create({
  artist: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
