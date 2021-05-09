import React, { FC, MutableRefObject } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';

type Props = {
  cardDeckRef: MutableRefObject<any>;
  handleExpandCard: () => void;
};

export const MainFooter: FC<Props> = ({ cardDeckRef, handleExpandCard }) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={styles.button_left}
        onPress={() => {
          if (cardDeckRef.current !== null) {
            cardDeckRef.current._forceLeftSwipe();
          }
        }}
      >
        <SvgUri source={require('../assets/close_black_24dp.svg')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_middle} onPress={handleExpandCard}>
        <SvgUri source={require('../assets/info_black_24dp.svg')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button_right}
        onPress={() => {
          if (cardDeckRef.current !== null) {
            cardDeckRef.current._forceRightSwipe();
          }
        }}
      >
        <SvgUri source={require('../assets/favorite_border_black_24dp.svg')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  button_left: {
    marginRight: 50,
  },
  button_right: {
    marginLeft: 50,
  },
  button_middle: {
    marginLeft: 50,
    marginRight: 50,
  },
});
