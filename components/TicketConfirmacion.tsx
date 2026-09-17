import { InscripcionForm } from "../types";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FilaDato } from "./common/FilaDato";
import Boton from "./common/Boton";


interface TicketConfirmacionProps {
  datos: InscripcionForm;
  onVolver: () => void;
}

export default function TicketConfirmacion({ datos, onVolver }: TicketConfirmacionProps) {
    return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      
      <View style={styles.ticket}>
        <Text style={styles.titulo}>¡Inscripción Confirmada!</Text>
        <Text style={styles.subtitulo}>Festival Sonido Sur</Text>

        <View style={styles.divisor} />

        <FilaDato label="Nombre:" valor={datos.nombreCompleto} />
        <FilaDato label="Email:" valor={datos.email} />
        <FilaDato label="Edad:" valor={`${datos.edad} años`} />
        
        <FilaDato 
          label="Tipo de Entrada:" 
          valor={datos.tipoEntrada === 'vip' ? 'VIP' : 'GENERAL'} 
          destacado={true} 
        />

        {datos.telefono ? (
          <FilaDato label="Teléfono:" valor={datos.telefono} />
        ) : null}

        <View style={styles.divisor} />
        
        <Text style={styles.mensajeFinal}>
          Presentá este ticket en la puerta del evento.
        </Text>
      </View>

      <View style={styles.contenedorBoton}>
        <Boton 
          titulo="Volver a inscribir a otra persona" 
          onPress={onVolver} 
        />
      </View>
    </ScrollView>
  );
}
    const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  ticket: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#5b21b6',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  divisor: {
    height: 1,
    borderBottomWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  mensajeFinal: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  contenedorBoton: {
    marginTop: 30,
  },
});