// app/index.tsx
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InscripcionForm } from '../types';


export default function InscripcionScreen() {
  const [enviado, setEnviado] = useState(false);
  const [datosConfirmados, setDatosConfirmados] = useState<InscripcionForm | null>(null);

  const handleEnviar = (datos: InscripcionForm) => {
    setDatosConfirmados(datos);
    setEnviado(true);
  };

  const handleVolver = () => {
    setEnviado(false);
    setDatosConfirmados(null);
  };

  return (
    <View style={styles.container}>
      {enviado && datosConfirmados ? (
        <TicketConfirmacion datos={datosConfirmados} onVolver={handleVolver} />
      ) : (
        <FormularioInscripcion onEnviar={handleEnviar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});