import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { InscripcionForm } from '../types';
import FormularioInscripcion from '../components/FormularioInscripcion';
import TicketConfirmacion from '../components/TicketConfirmacion';

export default function InscripcionScreen() {
  // 1. Estados simplificados
  const [datosConfirmados, setDatosConfirmados] = useState<InscripcionForm | null>(null);
  const [cargando, setCargando] = useState(false); // Bonus del TP

  // 2. Orquestación del envío (Lifting State Up)
  const handleEnviar = (datos: InscripcionForm) => {
    setCargando(true); // Arranca el spinner
    
    // Simulamos la petición al servidor con 1 segundo de delay
    setTimeout(() => {
      setDatosConfirmados(datos);
      setCargando(false); 
    }, 1000);
  };

  // 3. Reseteo
  const handleVolver = () => {
    setDatosConfirmados(null);
  };

  // 4. Renderizado Condicional
  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.pantallaCarga}>
          <ActivityIndicator size="large" color="#5b21b6" />
          <Text style={styles.textoCarga}>Procesando inscripción...</Text>
        </View>
      ) : datosConfirmados ? (
        <TicketConfirmacion datos={datosConfirmados} onVolver={handleVolver} />
      ) : (
        <FormularioInscripcion onEnviar={handleEnviar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  pantallaCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarga: {
    marginTop: 16,
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
  }
});