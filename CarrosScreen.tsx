import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import BackButton from './BackButton';
import { GoogleGenerativeAI } from '@google/generative-ai';

const KEY_GEMINI = 'AIzaSyAReFNbu4XXpSv8N8uvlUEHyjDm22kMY3w'; // Use sua chave API
const genAI = new GoogleGenerativeAI(KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function CarrosScreen({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const pesquisarCarro = async () => {
    if (!marca || !modelo || !ano) {
      Alert.alert('Atenção', 'Preencha pelo menos marca, modelo e ano!');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();
    setResultado('');

    try {
      const prompt = `Forneça informações detalhadas sobre o carro ${marca} ${modelo} do ano ${ano}. 
      Inclua especificações técnicas, valor de mercado${valor ? ` (comparado com R$ ${valor})` : ''}, 
      histórico do modelo e avaliações de especialistas.`;

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
      <Text style={styles.title}>Pesquisa de Carros</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Marca (ex: Ford)"
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo (ex: Mustang)"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano (ex: 2020)"
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Valor estimado (opcional)"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.button} onPress={pesquisarCarro} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Pesquisando...' : 'Pesquisar Carro'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2c3e50" />
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
    backgroundColor: '#2c3e50',
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