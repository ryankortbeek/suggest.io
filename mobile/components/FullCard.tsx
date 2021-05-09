import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Event } from '../hooks/types';
import SvgUri from 'react-native-svg-uri';
import { baseStyles, SECONDARY_COLOR } from './style';

type Props = {
  cardData: Event;
  onClickHandler: () => void;
};

export const FullCard: FC<Props> = ({ cardData, onClickHandler }) => {
  return (
    <View style={styles.overlay_container}>
      <View style={styles.close_button}>
        <TouchableOpacity onPress={onClickHandler}>
          <SvgUri source={require('../assets/close_black_24dp.svg')} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollable}>
        <View style={styles.image_container}>
          <Image source={cardData.image} style={styles.image} />
        </View>
        <Text style={{ ...styles.title, ...styles.spacing }}>
          {cardData.name}
        </Text>
        <Text style={styles.body}>{cardData.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    overlay_container: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '95%',
      height: '90%',
      backgroundColor: SECONDARY_COLOR,
      borderRadius: 10,
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
      borderRadius: 10,
    },
    close_button: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      margin: 20,
      paddingLeft: 20,
    },
    image_container: {
      width: '100%',
      height: '300%',
    },
  }),
};
