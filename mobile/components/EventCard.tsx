import React, { FC, useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Event } from '../hooks/types';
import { FullCard } from './FullCard';

type Props = {
  cardData: Event;
};

export const EventCard: FC<Props> = ({ cardData }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={cardData.image} style={styles.image}>
        <TouchableWithoutFeedback>
          <Text style={styles.cardsText}>{cardData.name}</Text>
          <Text style={styles.cardsText}>{cardData.description}</Text>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

// TODO: styling
// - font + size
// - overflow for description
// - info button
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 600,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cardsText: {
    fontSize: 22,
    color: '#fff',
  },
});
