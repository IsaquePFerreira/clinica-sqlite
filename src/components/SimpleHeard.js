import React from 'react';
import { View, Text } from 'react-native';

export default function SimpleHeader({ title }) {
  return (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
}