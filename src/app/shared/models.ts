export interface Operario {
    _id?: string;
    nombre: string;
    nif: string;
    direccion: string;
    telefono: string;
    puesto: string;
    conductor: boolean;
    horario: boolean;
    activo: boolean;
    ultima_alta: string;
    ultima_baja: string;
    observacion: string;
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
    total_algas_pesadas: number;
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

export interface Hamaca {
    _id?: string;
    fecha: string;
    sector: number;
    hamacas: number;
    sombrillas: number;
    h_rotas: number;
    h_retiradas: number;
    h_repuestas: number;
    s_rotas: number;
    s_retiradas: number;
    s_repuestas: number;
    observacion: string;
}

export interface Acumulados {
    _id?: number;
    total_h_rotas: number;
    total_h_retiradas: number;
    total_h_repuestas: number;
    total_s_rotas: number;
    total_s_retiradas: number;
    total_s_repuestas: number;
}

export interface Asistencia {
    _id?: string;
    id_op: string;
    nombre: string;
    fecha: string;
    puesto: string;
    trabajado: number;
    descanso: number;
    festivo: number;
    vacaciones: number;
    disfrutadas: number;
    baja: number;
    justificado: number;
    injustificado: number;
    fecha_inicio: string;
    fecha_fin: string;
    observacion: string;
}

export interface TotalAsistencia {
    _id?: string;
    total_trabajado: number;
    total_descanso: number;
    total_festivo: number;
    total_vacaciones: number;
    total_disfrutadas: number;
    total_baja: number;
    total_justificado: number;
    total_injustificado: number;
}

export interface Mantenimiento {
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
    material: string;
    coste: number;
    horarios: Horario;
}
