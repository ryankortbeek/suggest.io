import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { baseStyles } from './style';

type Props = {
  handleBackButton: () => void;
};
export const MatchHeader: FC<Props> = ({ handleBackButton }) => {
  return (
    <View style={styles.header_container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.button_left}>
        <SvgUri source={require('../assets/arrow_back_black_24dp.svg')} />
      </TouchableOpacity>
      <Text style={styles.title}>My Matches</Text>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    button_left: {
      marginRight: 100,
    },
  }),
};
