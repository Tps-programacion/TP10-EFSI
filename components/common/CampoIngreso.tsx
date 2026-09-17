import { View, Text, TextInput, StyleSheet } from 'react-native';

// 1. Definimos las opciones exactas que vas a permitir.
// Agregué 'email' porque tu formulario lo necesita.
type TipoCampo = 'texto' | 'numero' | 'telefono' | 'email';

interface CampoIngresoProps {
  label: string;
  tipo?: TipoCampo; // Lo hacemos opcional
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function CampoIngreso({ 
  label, 
  tipo = 'texto', // Si no le pasan nada, por defecto es 'texto'
  error, 
  value, 
  onChangeText, 
  placeholder 
}: CampoIngresoProps) {

  // 2. Función interna que traduce tu "tipo" al teclado nativo
  const determinarTeclado = () => {
    switch (tipo) {
      case 'numero':
        return 'numeric';
      case 'telefono':
        return 'phone-pad';
      case 'email':
        return 'email-address';
      case 'texto':
      default:
        return 'default';
    }
  };

  return (

    <View style={styles.contenedor}>
      <Text style={styles.label}>{label}</Text>
      
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={determinarTeclado()}
        autoCapitalize={tipo === 'email' ? 'none' : 'sentences'} 
      />
      
      {error && <Text style={styles.textoError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  inputError: { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
  textoError: { color: '#ef4444', fontSize: 12, marginTop: 4, fontWeight: '500' },
});