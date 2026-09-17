import { Pressable, Text, StyleSheet } from 'react-native';

interface BotonProps {
  titulo: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Boton({ titulo, onPress, disabled = false }: BotonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.boton, disabled && styles.botonDeshabilitado]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#5b21b6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonDeshabilitado: { backgroundColor: '#a78bfa' },
  texto: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});