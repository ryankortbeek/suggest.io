import React, { FC } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Event } from '../hooks/types';
import SvgUri from 'react-native-svg-uri';
type Props = {
  cardData: Event;
  onClickHandler: () => void;
};

export const FullCard: FC<Props> = ({ cardData, onClickHandler }) => {
  return (
    <View style={styles.card}>
      <ScrollView>
        <TouchableOpacity onPress={onClickHandler}>
          <SvgUri source={require('../assets/arrow_back_black_24dp.svg')} />
        </TouchableOpacity>
        <View style={styles.image_container}>
          <Image source={cardData.image} style={styles.image} />
        </View>
        <Text style={styles.cardsText}>{cardData.name}</Text>
        <Text style={styles.header}>Description:</Text>
        <Text style={styles.cardsText}>{cardData.description}</Text>
      </ScrollView>
    </View>
  );
};

// TODO: styling
// - font + size
// - overflow for description
// - info button
const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
    backgroundColor: '#1073AA',
    borderRadius: 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  cardsText: {
    fontSize: 22,
    color: '#fff',
  },
  image_container: {
    width: 300,
    height: 600,
  },
  header: {
    fontSize: 36,
  },
});
