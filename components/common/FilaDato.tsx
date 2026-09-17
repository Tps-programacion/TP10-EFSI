import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface FilaDatoProps {
  label: string;
  valor: string | number;
  destacado?: boolean; // Opcional: para pintar de otro color el VIP
}

export const FilaDato = ({ label, valor, destacado = false }: FilaDatoProps) => (
  <View style={styles.fila}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.valor, destacado && styles.valorDestacado]}>
      {valor}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  
  // Estilos movidos para la FilaDato
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  valor: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  valorDestacado: {
    color: '#5b21b6',
    fontWeight: '800',
  },
});