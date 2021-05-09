import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type StatusCardProps = {
  text: string;
};

// TODO: add refresh functionality!!
export const EmptyCard: FC<StatusCardProps> = ({ text }) => {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsText: {
    fontSize: 22,
    color: '#fff',
  },
});
