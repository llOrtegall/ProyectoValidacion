export interface Item {
  nombre: string;
  descripcion: string;
  placa: string;
  serial: string;
  estado: 'Nuevo' | 'Bueno' | 'Malo' | 'Baja'
}