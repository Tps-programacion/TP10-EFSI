export type TipoEntrada = 'general' | 'vip';

export interface InscripcionForm {
  nombreCompleto: string;
  email: string;
  edad: string; // En React Native los inputs de texto devuelven strings, luego lo validamos.
  tipoEntrada: TipoEntrada;
  telefono?: string; // El signo de interrogación lo hace opcional
}