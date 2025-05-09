import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cozinha Fácil</Text>
      
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setCurrentScreen('Receitas')}
      >
        <Text style={styles.buttonText}>Gerar Receitas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setCurrentScreen('Carros')}
      >
        <Text style={styles.buttonText}>Pesquisar Carros</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setCurrentScreen('Basquete')}
      >
        <Text style={styles.buttonText}>Estatísticas de Basquete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});