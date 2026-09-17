import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TipoEntrada } from '../../types'; 

// 1. Definimos las opciones en un array tipado.
// Obligamos a que 'id' solo pueda ser un valor válido de TipoEntrada.
const OPCIONES: { id: TipoEntrada; texto: string }[] = [
  { id: 'general', texto: 'General' },
  { id: 'vip', texto: 'VIP' },
];

interface SelectorTipoEntradaProps {
  value: TipoEntrada | undefined;
  onChange: (valor: TipoEntrada) => void;
  error?: string;
}

export default function SelectorTipoEntrada({ value, onChange, error }: SelectorTipoEntradaProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Tipo de Entrada</Text>
      
      <View style={styles.filaBotones}>
        {OPCIONES.map((opcion) => (
          <Pressable
            key={opcion.id}
            style={[
              styles.botonOpcion, 
              value === opcion.id && styles.opcionActiva
            ]}
            onPress={() => onChange(opcion.id)}
          >
            <Text style={[
              styles.textoOpcion, 
              value === opcion.id && styles.textoActivo
            ]}>
              {opcion.texto}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {error && <Text style={styles.textoError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  filaBotones: { flexDirection: 'row', gap: 10 },
  botonOpcion: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  opcionActiva: { backgroundColor: '#5b21b6', borderColor: '#5b21b6' },
  textoOpcion: { fontSize: 16, color: '#4b5563', fontWeight: '500' },
  textoActivo: { color: '#ffffff', fontWeight: '700' },
  textoError: { color: '#ef4444', fontSize: 12, marginTop: 4, fontWeight: '500' },
});