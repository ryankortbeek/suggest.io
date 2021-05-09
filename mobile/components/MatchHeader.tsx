import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { baseStyles } from './style';

type Props = {
  handleBackButton: () => void;
};
export const MatchHeader: FC<Props> = ({ handleBackButton }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={handleBackButton}>
          <SvgUri source={require('../assets/arrow_back_black_24dp.svg')} />
        </TouchableOpacity>
      </View>

      <View style={styles.text_container}>
        <Text style={{ ...styles.title, ...styles.text_color }}>
          My Matches
        </Text>
      </View>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      height: 100,
      paddingTop: 50,
      width: '100%',
    },
    button_container: {
      marginLeft: 40,
    },
    text_container: {
      marginRight: 85,
    },
    text_color: {
      color: '#000000',
    },
  }),
};
