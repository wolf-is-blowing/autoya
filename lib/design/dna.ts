/**
 * ADN Geométrico de Mouto
 * Fuente única de verdad para toda geometría del proyecto.
 * Ningún componente puede usar valores de radius, shadow, duration
 * o easing que no vengan de aquí.
 */
export const DNA = {
  // La curva Mouto — asimétrica, tensa, inspirada en un radio de curva de alta velocidad
  radius: {
    card:   '18px',
    chip:   '10px',
    button: '14px',
    input:  '12px',
    avatar: '9999px',
    nav:    '22px',
  },

  // El ángulo Mouto — 11° — aparece en máscaras, separadores, isotipo
  angle: '11deg',

  // Grosor de trazo — constante en iconos, divisores, bordes activos
  stroke: '1.5px',

  // Clip-path signature — esquina inferior izquierda cortada a 11°
  clipCard: 'polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 24px))',

  // Sombras — iluminación de interiores de auto, no Material Design
  shadow: {
    card:  '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
    float: '0 20px 60px rgba(0,0,0,0.6)',
    glow:  '0 0 24px rgba(10,132,255,0.25)',
    volt:  '0 0 16px rgba(200,241,53,0.20)',
  },

  // Duraciones — todo el sistema usa estas y solo estas
  duration: {
    fast:  '150ms',
    base:  '250ms',
    slow:  '400ms',
    drift: '3000ms',
  },

  // Easing — aceleración de motor, no spring genérico
  easing: {
    out:   'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
    drift: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;
