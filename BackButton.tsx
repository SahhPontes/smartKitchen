import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}

export default function BackButton({ onPress }: BackButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>← Voltar para Home</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  }
});