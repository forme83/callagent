export const scenarios = {
  rent_basic_es: {
    id: 'rent_basic_es',
    name: 'Аренда — базовый сценарий',
    language: 'es',
    steps: [
      { type: 'speak', text: 'Hola, llamo por el anuncio del piso que vi en internet.' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: 'Quería saber si todavía está disponible.' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿En qué zona está exactamente el piso?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿Cuál es el precio mensual y qué incluye?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿Hay algún gasto adicional como comunidad o luz?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿Está amueblado o vacío?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿Se puede visitar esta semana?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: '¿Cuál sería el horario disponible para la visita?' },
      { type: 'pause', duration: 3 },

      { type: 'speak', text: 'Vale, perfecto, muchas gracias por la información.' },
      { type: 'pause', duration: 2 },

      { type: 'hangup' }
    ]
  }
};

export const defaultScenarioId = 'rent_basic_es';
