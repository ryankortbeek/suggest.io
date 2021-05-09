import React, { FC, useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Event } from '../hooks/types';
import { baseStyles } from './style';

type Props = {
  cardData: Event;
};

export const EventCard: FC<Props> = ({ cardData }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={cardData.image} style={styles.image}>
        <View style={styles.image_text}>
          <Text style={styles.title} numberOfLines={1}>
            {cardData.name}
          </Text>
          <Text style={styles.body} numberOfLines={1}>
            {cardData.description}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

// TODO: stylingr
// - font + size
// - overflow for description
// - info button
const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 350,
      height: 600,
      borderRadius: 15,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
    },
    image_text: {
      margin: 20,
    },
  }),
};
