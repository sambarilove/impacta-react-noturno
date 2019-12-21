import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá mundo - Meu primeiro app android!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#e6f5ff',
    backgroundColor: '#00b3b3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
