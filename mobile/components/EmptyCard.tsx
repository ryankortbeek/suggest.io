import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseStyles } from './style';

export type StatusCardProps = {
  text: string;
};

// TODO: add refresh functionality!!
export const EmptyCard: FC<StatusCardProps> = ({ text }) => {
  return (
    <View>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
};

const styles = { ...baseStyles };
