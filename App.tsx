import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import ReceitasScreen from './Openai';
import CarrosScreen from './CarrosScreen';
import BasqueteScreen from './BasqueteScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch(currentScreen) {
      case 'Home':
        return <HomeScreen setCurrentScreen={setCurrentScreen} />;
      case 'Receitas':
        return <ReceitasScreen setCurrentScreen={setCurrentScreen} />;
      case 'Carros':
        return <CarrosScreen setCurrentScreen={setCurrentScreen} />;
      case 'Basquete':
        return <BasqueteScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <HomeScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  }
});