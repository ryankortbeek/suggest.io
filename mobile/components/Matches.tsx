import React, { FC, useEffect, useRef, useState, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Event } from '../hooks/types';
import { MatchCard } from './MatchCard';
import { FullCard } from './FullCard';
import { MatchHeader } from './MatchHeader';
import { baseStyles } from './style';
import { AuthContext } from '../context/AuthContext';
import { useMatches } from '../hooks/useMatches';

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
  const user = useContext(AuthContext);

  const { events, error } = useMatches(
    user?.uid,
  );

  // replace with real remote data fetching
  useEffect(() => {
    setCards(events);
  }, [events]);

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
