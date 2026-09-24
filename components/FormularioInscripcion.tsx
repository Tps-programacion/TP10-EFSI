import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
// Tipos
import { InscripcionForm } from '../types';

// Componentes
import CampoIngreso from './common/CampoIngreso';
import SelectorTipoEntrada from './common/SelectorTipoEntrada';
import Boton from './common/Boton';

// Reglas de Validación
import { 
  reglasNombre, 
  reglasEmail, 
  reglasEdad, 
  reglasPicker, 
  reglasTelefono 
} from '../utils/validaciones';

interface FormularioInscripcionProps {
  onEnviar: (datos: InscripcionForm) => void;
}

export default function FormularioInscripcion({ onEnviar }: FormularioInscripcionProps) {
  // mode: 'onChange' permite que los errores desaparezcan en tiempo real cuando el usuario corrige
  // Extraemos 'reset' de useForm para poder inyectar el email guardado
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<InscripcionForm>({
    mode: 'onChange',
  });

  // 1. LECTURA: Al abrir el formulario, buscamos el email guardado
  useEffect(() => {
    const cargarDatosGuardados = async () => {
      try {
        const emailGuardado = await AsyncStorage.getItem('@ultimo_email');
        if (emailGuardado) {
          // Si existe, le decimos a react-hook-form que actualice ese campo específico
          reset({ email: emailGuardado }); 
        }
      } catch (error) {
        console.error('Error leyendo AsyncStorage:', error);
      }
    };
    
    cargarDatosGuardados();
  }, []); // El array vacío asegura que esto corra solo 1 vez al montar el componente

  const procesarEnvio = async (datos: InscripcionForm) => {
    try {
      await AsyncStorage.setItem('@ultimo_email', datos.email);
    } catch (error) {
      console.error('Error guardando en AsyncStorage:', error);
    }
    // Después de guardar, continuamos con el flujo normal hacia el padre
    onEnviar(datos);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.flex} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.contenido} 
        keyboardShouldPersistTaps="handled" // Permite tocar el botón sin tener que cerrar el teclado primero
      >
        
        <Controller
          control={control}
          name="nombreCompleto"
          rules={reglasNombre}
          render={({ field: { onChange, value } }) => (
            <CampoIngreso
              label="Nombre Completo"
              tipo="texto"
              placeholder="Ej: Federico Drucker"
              value={value || ''}
              onChangeText={onChange}
              error={errors.nombreCompleto?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={reglasEmail}
          render={({ field: { onChange, value } }) => (
            <CampoIngreso
              label="Correo Electrónico"
              tipo="email"
              placeholder="ejemplo@email.com"
              value={value || ''}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="edad"
          rules={reglasEdad}
          render={({ field: { onChange, value } }) => (
            <CampoIngreso
              label="Edad"
              tipo="numero"
              placeholder="Ej: 22"
              value={value || ''}
              onChangeText={onChange}
              error={errors.edad?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="tipoEntrada"
          rules={reglasPicker}
          render={({ field: { onChange, value } }) => (
            <SelectorTipoEntrada
              value={value}
              onChange={onChange}
              error={errors.tipoEntrada?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="telefono"
          rules={reglasTelefono}
          render={({ field: { onChange, value } }) => (
            <CampoIngreso
              label="Teléfono (Opcional)"
              tipo="telefono"
              placeholder="Ej: 1123456789"
              value={value || ''}
              onChangeText={onChange}
              error={errors.telefono?.message}
            />
          )}
        />

        <Boton 
          titulo="Confirmar inscripción" 
          onPress={handleSubmit(procesarEnvio)} 
          disabled={!isValid} 
        />
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { 
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para que coincida con el layout
  },
  contenido: { 
    padding: 20,
    paddingBottom: 40, // Espacio extra al final del scroll para que no quede pegado
  },
});