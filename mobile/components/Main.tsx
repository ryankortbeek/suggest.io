import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import SwipeCards from 'react-native-swipe-cards-deck';
import { EventCard } from './EventCard';
import { EmptyCard } from './EmptyCard';
import { Event } from '../hooks/types';
import { useEvents } from '../hooks/useEvents';
import { FullCard } from './FullCard';

const NONE = 'none';
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};


export const Main: FC<Props> = ({ route, navigation }) => {
  const { events, error, handleSwipe } = useEvents(
    '',
    // route.params.userInfo,
    '', // TODO: replace with lat lon of device
    '',
    ''
  );
  
  const [cards, setCards] = useState(new Array<Event>());
  const [shouldExpand, setExpand] = useState(false);
  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          id: "1",
          name: 'Card 1',
          image: {
            uri:
              'https://media.gettyimages.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?s=612x612',
          },
          description: 'restaurant 1 !!!',
        },
        {
          id: "2",
          name: 'Card 2',
          image: {
            uri:
              'https://thumbs.dreamstime.com/b/portrait-waitress-holding-menus-serving-busy-bar-restaurant-153985284.jpg',
          },
          description: 'restaurant 2 !!!',
        },
        {
          id: "3",
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

  const showAlert = () => {
    return (
      Alert.alert(
        "ERROR OCCURED",
        error,
        [
          {
            text: "close",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      )
    )
  };
  

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
      {error != NONE ? 
        showAlert()
      : <></>}
      {cards ? (
        <SwipeCards
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
});
