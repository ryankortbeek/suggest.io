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
          <View style={styles.image_container}>
            <Image source={cardData.image} style={styles.image} />
          </View>
          <View
            style={{ ...styles.text_container, ...styles.horizontal_spacing }}
          >
            <Text
              style={{ ...styles.title, ...styles.text_color }}
              numberOfLines={1}
            >
              {cardData.name}
            </Text>
            <Text
              style={{
                ...styles.body,
                ...styles.text_color,
              }}
              numberOfLines={1}
            >
              {cardData.description}
            </Text>
          </View>
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
      margin: 10,
    },
    card: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      width: 300,
      height: 150,
      borderRadius: 10,
    },
    image_container: {
      height: '100%',
      width: 100,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      width: undefined,
      height: undefined,
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    text_container: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text_color: {
      color: '#000000',
    },
  }),
};
