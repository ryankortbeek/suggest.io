import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import SwipeCards from 'react-native-swipe-cards-deck';
import { EventCard } from './EventCard';
import { EmptyCard } from './EmptyCard';
import { Event } from '../hooks/types';
import { useEvents } from '../hooks/useEvents';
import { FullCard } from './FullCard';
import SvgUri from 'react-native-svg-uri';

type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export const Main: FC<Props> = ({ route, navigation }) => {
  // const { events, error, handleSwipe } = useEvents(
  //   '',
  //   // route.params.userInfo,
  //   '', // TODO: replace with lat lon of device
  //   ''
  // );
  const [cards, setCards] = useState(new Array<Event>());
  const [shouldExpand, setExpand] = useState(false);
  const cardDeck = useRef<any>(null); // TODO: figure out a better way to type check component
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

  const handleYup = (card: Event) => {
    // handleSwipe(route.params.userInfo, card.id, true);
    return true; // return false if you wish to cancel the action
  };

  const handleNope = (card: Event) => {
    // handleSwipe(route.params.userInfo, card.id, false);
    return true;
  };

  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          ref={cardDeck}
          cards={cards}
          renderCard={(cardData: Event) => (
            <EventCard
              cardData={cardData}
              onClickHandler={() => setExpand(true)}
            />
          )}
          keyExtractor={(cardData: Event) => String(cardData.id)}
          renderNoMoreCards={() => <EmptyCard text='No more cards...' />}
          handleYup={handleYup}
          handleNope={handleNope}
        />
      ) : (
        <EmptyCard text='No more cards...' />
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button_left}
          onPress={() => {
            if (cardDeck.current !== null) {
              cardDeck.current._forceLeftSwipe();
            }
          }}
        >
          <SvgUri source={require('../assets/close_black_24dp.svg')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_right}
          onPress={() => {
            if (cardDeck.current !== null) {
              cardDeck.current._forceRightSwipe();
            }
          }}
        >
          <SvgUri
            source={require('../assets/favorite_border_black_24dp.svg')}
          />
        </TouchableOpacity>
      </View>
      {shouldExpand && (
        <FullCard cardData={cards[0]} onClickHandler={() => setExpand(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  button_left: {
    marginRight: 100,
  },
  button_right: {
    marginLeft: 100,
  },
});
