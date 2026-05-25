import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la App</Text>
      <Text style={styles.text}>
        Esta aplicación es un desarrollo enfocado en la arquitectura modular 
        y persistencia de datos local mediante AsyncStorage.
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologías utilizadas:</Text>
        <Text style={styles.item}>• React Native (Core)</Text>
        <Text style={styles.item}>• React Navigation (Stack)</Text>
        <Text style={styles.item}>• JavaScript ES6+</Text>
      </View>

      <Text style={styles.footer}>Proyecto de Ingeniería Informática © 2026</Text>
    </View>
  );
};
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints responsivos
const isTablet = width >= 768;
const isLargePhone = width >= 414;
const isSmallPhone = width < 375;

// Sistema de escala para tipografía responsiva
const scale = (size) => {
  const baseWidth = 375;
  const factor = width / baseWidth;
  return Math.round(size * Math.min(factor, isTablet ? 1.3 : 1.15));
};

// Espaciado responsivo
const spacing = {
  xs: isTablet ? 8 : 4,
  sm: isTablet ? 16 : 10,
  md: isTablet ? 24 : 16,
  lg: isTablet ? 40 : 28,
  xl: isTablet ? 64 : 44,
};

// ─── PALETA DE COLORES PARA TIENDA ───────────────────────────────────────────
// Inspirada en retail premium: cálida, confiable, con acento vibrante
const colors = {
  // Fondos
  background:     '#FFF8F2',   // Crema cálido — invita a comprar
  surface:        '#FFFFFF',   // Tarjetas limpias
  surfaceAlt:     '#FFF3E8',   // Fondo de secciones alternas

  // Marca principal — naranja tostado (acción, energía, retail)
  primary:        '#E8621A',   // CTA, botones principales
  primaryLight:   '#FF8445',   // Hover / estados activos
  primaryDark:    '#B84A0D',   // Presionado / sombras de acento
  primaryFaded:   '#FDE8D8',   // Fondo suave de badges / chips

  // Acento complementario — dorado (premium, precio, destacado)
  accent:         '#D4952A',
  accentLight:    '#F5C76E',
  accentFaded:    '#FEF4DC',

  // Textos
  textPrimary:    '#1C1410',   // Títulos — casi negro cálido
  textSecondary:  '#6B5744',   // Cuerpo — marrón medio legible
  textMuted:      '#A8917E',   // Metadatos, labels, pies
  textOnDark:     '#FFFFFF',

  // Bordes y divisores
  border:         '#EEDDD0',
  borderStrong:   '#D4B8A5',

  // Estado / feedback
  success:        '#2E9E6B',
  successFaded:   '#D6F5E8',
  error:          '#D63B3B',
  errorFaded:     '#FDEAEA',

  // Sombras
  shadowColor:    '#7A3F1E',
};

// ─── SOMBRAS CONSISTENTES POR PLATAFORMA ─────────────────────────────────────
const shadows = {
  card: Platform.select({
    ios: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.10,
      shadowRadius: 18,
    },
    android: { elevation: 5 },
    default: {},
  }),
  soft: Platform.select({
    ios: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }),
  strong: Platform.select({
    ios: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 28,
    },
    android: { elevation: 10 },
    default: {},
  }),
};

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // CONTENEDORES
  container: {
    flex: 1,
    paddingHorizontal: isTablet ? 64 : isLargePhone ? 28 : 20,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    maxWidth: isTablet ? 680 : undefined,       // Centra el contenido en tablet
    alignSelf: isTablet ? 'center' : 'stretch', // Idem
    width: isTablet ? '100%' : undefined,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // TIPOGRAFÍA PRINCIPAL
  title: {
    fontSize: scale(isSmallPhone ? 22 : 28),
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
    lineHeight: scale(isSmallPhone ? 28 : 34),
  },

  subtitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: -0.2,
  },

  text: {
    fontSize: scale(isSmallPhone ? 14 : 16),
    color: colors.textSecondary,
    lineHeight: scale(isSmallPhone ? 22 : 26),
    marginBottom: spacing.lg,
    fontWeight: '400',
  },

  label: {
    fontSize: scale(12),
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // TARJETAS / CARDS
  card: {
    backgroundColor: colors.surface,
    padding: isTablet ? 32 : 20,
    borderRadius: isTablet ? 24 : 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.card,
  },

  cardHighlight: {
    backgroundColor: colors.primaryFaded,
    padding: isTablet ? 32 : 20,
    borderRadius: isTablet ? 24 : 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: spacing.md,
    ...shadows.soft,
  },

  cardTitle: {
    fontWeight: '700',
    fontSize: scale(17),
    marginBottom: spacing.md,
    color: colors.textPrimary,
    letterSpacing: 0.1,
  },

  // ÍTEMS DE LISTA
  item: {
    fontSize: scale(15),
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: scale(22),
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: 10,
  },

  itemBullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 2,
  },

  // PRECIO
  price: {
    fontSize: scale(22),
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },

  priceOriginal: {
    fontSize: scale(14),
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },

  // BADGE / CHIP
  badge: {
    backgroundColor: colors.primaryFaded,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  badgeText: {
    fontSize: scale(12),
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.3,
  },

  badgeAccent: {
    backgroundColor: colors.accentFaded,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  badgeAccentText: {
    fontSize: scale(12),
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.3,
  },

  // BOTONES
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: isSmallPhone ? 13 : 16,
    paddingHorizontal: spacing.lg,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },

  buttonPrimaryText: {
    color: colors.textOnDark,
    fontSize: scale(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: isSmallPhone ? 12 : 15,
    paddingHorizontal: spacing.lg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSecondaryText: {
    color: colors.primary,
    fontSize: scale(16),
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // DIVISOR
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },

  // PIE / FOOTER
  footer: {
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textMuted,
    fontSize: scale(12),
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

export { styles, colors, spacing, shadows, scale };
export default styles;