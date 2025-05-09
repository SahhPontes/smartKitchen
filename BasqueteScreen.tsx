import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import BackButton from './BackButton';
import { GoogleGenerativeAI } from '@google/generative-ai';

const KEY_GEMINI = 'AIzaSyAReFNbu4XXpSv8N8uvlUEHyjDm22kMY3w'; // Use sua chave API
const genAI = new GoogleGenerativeAI(KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function BasqueteScreen({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  const [jogador, setJogador] = useState('');
  const [numero, setNumero] = useState('');
  const [posicao, setPosicao] = useState('');
  const [time, setTime] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const pesquisarJogador = async () => {
    if (!jogador) {
      Alert.alert('Atenção', 'Informe pelo menos o nome do jogador!');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();
    setResultado('');

    try {
      const prompt = `Forneça estatísticas completas e informações sobre o jogador de basquete ${jogador}${time ? ` do time ${time}` : ''}. 
      Inclua dados de carreira, médias por jogo${numero ? ` (camisa ${numero})` : ''}${posicao ? `, desempenho como ${posicao}` : ''}, 
      prêmios e curiosidades.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResultado(text);
    } catch (error) {
      setResultado('Erro ao pesquisar. Tente novamente mais tarde.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => setCurrentScreen('Home')} />
      <Text style={styles.title}>Estatísticas de Basquete</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Jogador (ex: LeBron James)"
          value={jogador}
          onChangeText={setJogador}
        />
        <TextInput
          style={styles.input}
          placeholder="Número (opcional)"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Posição (opcional)"
          value={posicao}
          onChangeText={setPosicao}
        />
        <TextInput
          style={styles.input}
          placeholder="Time (opcional)"
          value={time}
          onChangeText={setTime}
        />
        
        <TouchableOpacity style={styles.button} onPress={pesquisarJogador} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Pesquisando...' : 'Pesquisar Jogador'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#e74c3c" />
        ) : (
          <Text style={styles.resultText}>{resultado}</Text>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  form: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
});