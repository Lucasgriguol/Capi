// data.js
const personas = ["Cristina", "Gaby", "Genaro", "Mariana", "Cristian", "Mauricio", "Marta", "Fernanda"];

// Saldo que venían arrastrando del año anterior
const saldoAnterior = 285106; 

const datosIniciales = [
    {
        mes: "Enero",
        gastos: { epec: 32346, internet: 10000, seguro: 9529, extras: [] }, // Internet 10000 según tu tabla
        otrosIngresos: 6000, 
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Febrero",
        gastos: { epec: 31726, internet: 6000, seguro: 9525, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Marzo",
        gastos: { 
            epec: 31860, internet: 6000, seguro: 10482, 
            extras: [
                { descripcion: "Reflector", monto: 28000 },
                { descripcion: "Electricista", monto: 35000 },
                { descripcion: "Pintura canaleta", monto: 2500 }
            ] 
        },
        otrosIngresos: 6000,
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Abril",
        gastos: { epec: 33003, internet: 6000, seguro: 10482, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Mayo",
        gastos: { epec: 34182, internet: 6000, seguro: 10480, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Junio",
        gastos: { epec: 34203, internet: 6000, seguro: 11522, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Julio",
        gastos: { epec: 40422, internet: 6000, seguro: 11522, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Agosto",
        gastos: { epec: 39953, internet: 6000, seguro: 11518, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Septiembre",
        gastos: { epec: 47276, internet: 6000, seguro: 12536, extras: [] },
        otrosIngresos: 6000,
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Octubre",
        gastos: { epec: 47650, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 6000, 
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Noviembre",
        gastos: { epec: 0, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 0,
        aportes: { Cristina: 0, Gaby: 0, Genaro: 0, Mariana: 0, Cristian: 0, Mauricio: 0, Marta: 0, Fernanda: 0 }
    },
    {
        mes: "Diciembre",
        gastos: { epec: 0, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 0,
        aportes: { Cristina: 0, Gaby: 0, Genaro: 0, Mariana: 0, Cristian: 0, Mauricio: 0, Marta: 0, Fernanda: 0 }
    }
];