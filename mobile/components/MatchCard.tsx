import React, { FC, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Event } from '../hooks/types';
import { baseStyles } from './style';

type Props = {
  cardData: Event;
  onClickHandler: () => void;
};

export const MatchCard: FC<Props> = ({ cardData, onClickHandler }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onClickHandler}>
        <View style={styles.card}>
          <Image source={cardData.image} style={styles.image} />
          <Text style={styles.title}>{cardData.name}</Text>
          <Text style={styles.body}>{cardData.description}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    container: {
      backgroundColor: '#1073AA',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    card: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      width: 300,
      height: 175,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  }),
};
