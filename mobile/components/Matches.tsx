import React, { FC, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Event } from '../hooks/types';
import { MatchCard } from './MatchCard';
import { FullCard } from './FullCard';
import { MatchHeader } from './MatchHeader';
import { baseStyles } from './style';

type MatchesScreenRouteProp = RouteProp<RootStackParamList, 'Matches'>;

type MatchesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Matches'
>;

type Props = {
  navigation: MatchesScreenNavigationProp;
  route: MatchesScreenRouteProp;
};

export const Matches: FC<Props> = ({ route, navigation }) => {
  // TODO: integrate with backend API
  const [cards, setCards] = useState(new Array<Event>());
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          id: 1,
          name: 'Card 1',
          image: {
            uri:
              'https://media.gettyimages.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?s=612x612',
          },
          description: 'restaurant 1 !!!',
        },
        {
          id: 2,
          name: 'Card 2',
          image: {
            uri:
              'https://thumbs.dreamstime.com/b/portrait-waitress-holding-menus-serving-busy-bar-restaurant-153985284.jpg',
          },
          description: 'restaurant 2 !!!',
        },
        {
          id: 3,
          name: 'Card 3',
          image: {
            uri:
              'https://static3.depositphotos.com/1003631/209/i/600/depositphotos_2099183-stock-photo-fine-table-setting-in-gourmet.jpg',
          },
          description: 'restaurant 3 !!!',
        },
      ]);
    }, 1);
  }, []);

  const onClickHandler = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.basic_container}>
      <MatchHeader handleBackButton={onClickHandler} />
      <View style={styles.main_component}>
        <FlatList<Event>
          keyExtractor={(cardData: Event) => String(cardData.id)}
          data={cards}
          renderItem={({ item, index }) => (
            <MatchCard
              cardData={item}
              onClickHandler={() => setSelectedIndex(index)}
            />
          )}
        />
      </View>

      {selectedIndex > -1 && (
        <FullCard
          cardData={cards[selectedIndex]}
          onClickHandler={() => setSelectedIndex(-1)}
        />
      )}
    </View>
  );
};

const styles = {
  ...baseStyles,
};
