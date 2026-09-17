import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

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
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<InscripcionForm>({
    mode: 'onChange',
  });

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
          onPress={handleSubmit(onEnviar)} 
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