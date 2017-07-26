export interface Operario {
    _id?: string;
    nombre: string;
    direccion: string;
    telefono: string;
    puesto: string;
}

export interface Vehiculo {
    _id?: string;
    numero: number;
    matricula: string;
    nombre: string;
    ult_rev: string;
    prx_rev: string;
    int_rev: string;
    ult_itv: string;
    prx_itv: string;
    int_itv: string;
    nota: string;
}

export interface Estadistica {
    _id?: string;
    estadistica: string;
    gravedad: string;
}

export interface Peso {
    rsu_manual: number;
    rsu_criba: number;
    selectivo: number;
    algas_pesadas: number;
    algas_teoricas: number;
}

export interface Horario {
    salida_almacen: string;
    salida_playa: string;
    llegada_almacen: string;
}

export interface Total {
    total_rsu_manual: number;
    total_rsu_criba: number;
    total_selectivo: number;
    total_algas_teoricas: number;
}

export interface Parte {
    _id?: string;
    municipio: string;
    fecha: string;
    lugar: string;
    turno: string;
    tipo: string;
    operario: string;
    vehiculo: string;
    numero_ops: number;
    observacion_ayto: string;
    observacion_ra: string;
    estadisticas: Estadistica[];
    pesos: Peso;
    horarios: Horario;
    bolsas: number;
}
