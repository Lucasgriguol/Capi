// data.js
const personas = ["Cristina", "Gaby", "Genaro", "Mariana", "Cristian", "Mauricio", "Marta", "Fernanda"];

const datosIniciales = [
    {
        mes: "Enero",
        gastos: { epec: 32346, internet: 10000, seguro: 9529, extras: [] },
        otrosIngresos: 295106, // Saldo inicial ajustado para que Enero dé $317.231
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Febrero",
        gastos: { 
            epec: 31726, internet: 10000, seguro: 9525, 
            extras: [
                { descripcion: "Reflector", monto: 28000 },
                { descripcion: "Electricista", monto: 35000 },
                { descripcion: "Pintura canaleta", monto: 2500 }
            ] 
        },
        otrosIngresos: 317231, // Acumulado de Enero
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Marzo",
        gastos: { epec: 31860, internet: 10000, seguro: 10482, extras: [] },
        otrosIngresos: 274480, // Acumulado de Febrero
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Abril",
        gastos: { epec: 33003, internet: 10000, seguro: 10482, extras: [] },
        otrosIngresos: 296138, // Acumulado de Marzo
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Mayo",
        gastos: { epec: 34182, internet: 10000, seguro: 10480, extras: [] },
        otrosIngresos: 316653, // Acumulado de Abril
        aportes: { Cristina: 10000, Gaby: 10000, Genaro: 10000, Mariana: 4000, Cristian: 10000, Mauricio: 10000, Marta: 10000, Fernanda: 10000 }
    },
    {
        mes: "Junio",
        gastos: { epec: 34203, internet: 12000, seguro: 11522, extras: [] },
        otrosIngresos: 335991, // Acumulado de Mayo
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Julio",
        gastos: { epec: 40422, internet: 12000, seguro: 11522, extras: [] },
        otrosIngresos: 368266, // Acumulado de Junio
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Agosto",
        gastos: { epec: 39953, internet: 12000, seguro: 11518, extras: [] },
        otrosIngresos: 394322, // Acumulado de Julio
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Septiembre",
        gastos: { epec: 47276, internet: 12000, seguro: 12536, extras: [] },
        otrosIngresos: 420851, // Acumulado de Agosto
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Octubre",
        gastos: { epec: 47650, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 439039, // Acumulado de Septiembre
        aportes: { Cristina: 12000, Gaby: 12000, Genaro: 12000, Mariana: 6000, Cristian: 12000, Mauricio: 12000, Marta: 12000, Fernanda: 12000 }
    },
    {
        mes: "Noviembre",
        gastos: { epec: 0, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 481389, // Acumulado de Octubre
        aportes: { Cristina: 0, Gaby: 0, Genaro: 0, Mariana: 0, Cristian: 0, Mauricio: 0, Marta: 0, Fernanda: 0 }
    },
    {
        mes: "Diciembre",
        gastos: { epec: 0, internet: 0, seguro: 0, extras: [] },
        otrosIngresos: 481389, // Acumulado de Noviembre
        aportes: { Cristina: 0, Gaby: 0, Genaro: 0, Mariana: 0, Cristian: 0, Mauricio: 0, Marta: 0, Fernanda: 0 }
    }
];