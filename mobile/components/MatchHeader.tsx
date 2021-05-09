import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

type Props = {
  handleBackButton: () => void;
};
export const MatchHeader: FC<Props> = ({ handleBackButton }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.button_left}>
        <SvgUri source={require('../assets/arrow_back_black_24dp.svg')} />
      </TouchableOpacity>
      <Text style={styles.text}>My Matches</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1073AA',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    paddingTop: 50,
  },
  button_left: {
    marginRight: 100,
  },
  text: {
    fontSize: 36,
  },
});
