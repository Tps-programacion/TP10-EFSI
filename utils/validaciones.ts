
export const reglasNombre = {
  required: 'Ingresá tu nombre completo',
  validate: (v: string) =>
    (v ?? '').trim().length >= 3 || 'Ingresá tu nombre completo',
};

export const reglasEmail = {
  required: 'Ingresá un email válido',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingresá un email válido',
  },
};

export const reglasEdad = {
  required: 'La edad tiene que ser mayor a 12',
  validate: (v: string) => {
    const n = Number(v);
    return (n >= 12 && n <= 99) || 'La edad tiene que ser mayor a 12';
  },
};

export const reglasPicker ={
    required: 'Elegí un tipo de entrada'
}

export const reglasTelefono = {
  validate: (v?: string) =>
    !v || /^[0-9]+$/.test(v) || 'Solo se permiten números',
};