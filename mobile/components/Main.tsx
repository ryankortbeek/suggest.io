import React, { FC, useEffect, useRef, useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import SwipeCards from 'react-native-swipe-cards-deck';
import { EventCard } from './EventCard';
import { EmptyCard } from './EmptyCard';
import { Event } from '../hooks/types';
import { useEvents } from '../hooks/useEvents';
import { FullCard } from './FullCard';
import { MainHeader } from './MainHeader';
import { MainFooter } from './MainFooter';
import { baseStyles } from './style';
import Location from 'expo-location';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../util/firebaseSetup';

const NONE = 'none';
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export const Main: FC<Props> = ({ route, navigation }) => {
  const user = useContext(AuthContext);
  const { events, error, handleSwipe } = useEvents(
    user?.uid,
    '53.5461',
    // route.params.userInfo,
    '-113.4938', // TODO: replace with lat lon of device
    '40000',
  );
  
  const [cards, setCards] = useState(new Array<Event>());
  const [shouldExpand, setExpand] = useState(false);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const cardDeckRef = useRef<any>(null);
  // replace with real remote data fetching
  useEffect(() => {
    setCards(events);
    getPermission();
  }, [events]);

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
    // TODO: uncomment
    handleSwipe(user?.uid, card.id, true, card.category);
    return true; // return false if you wish to cancel the action
  };

  const handleNope = (card: Event) => {
    // TODO: uncomment
    handleSwipe(user?.uid, card.id, false, card.category);
    return true;
  };

  const handleMatchButton = () => {
    navigation.navigate('Matches');
  };

  const handleMenuButton = async() => {
    navigation.navigate('Login');
    await auth.signOut();
  };

  const getPermission = async() => {
    try 
    {await Location.getForegroundPermissionsAsync()
    .then(stat => {
      console.log("HELLO")
      if (stat.granted) {
        getLocation().then(location => {
          const {longitude, latitude} = location.coords;
          console.log(longitude);
          console.log(latitude);
        })
      }
    });}
    catch(err) {
      console.log(err.message);
    }
  }

  const getLocation = async() => {
    return await Location.getCurrentPositionAsync({});
  }

  return (
    <View style={styles.basic_container}>
      <MainHeader
        handleMatchButton={handleMatchButton}
        handleMenuButton={handleMenuButton}
      />
      <View style={styles.main_component}>
        {cards ? (
          <SwipeCards
            ref={cardDeckRef}
            cards={cards}
            renderCard={(cardData: Event) => <EventCard cardData={cardData} />}
            keyExtractor={(cardData: Event) => String(cardData.id)}
            renderNoMoreCards={() => <EmptyCard text='No more cards...' />}
            handleYup={handleYup}
            handleNope={handleNope}
            yupText={'Yes'}
            nopeText={'No'}
          />
        ) : (
          <EmptyCard text='No more cards...' />
        )}
      </View>

      <MainFooter
        cardDeckRef={cardDeckRef}
        handleExpandCard={() => setExpand(true)}
      />

      {shouldExpand && (
        <FullCard cardData={cards[0]} onClickHandler={() => setExpand(false)} />
      )}
    </View>
  );
};

const styles = {
  ...baseStyles,
};
