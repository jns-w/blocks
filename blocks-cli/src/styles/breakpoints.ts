const standards = {
  mobileS: '20rem', // 320/16
  mobileM: '23.5rem', // 375/16
  mobileL: '31rem', // 448/16
  small: '48rem', // 768/16
  medium: '64rem', // 1025/16
  large: '90rem', // 1440/16
  extraLarge: '160rem' // 2560/16
}

export const pt = {
  msm: `(max-width: ${standards.mobileS})`,
  mmd: `(max-width: ${standards.mobileM})`,
  mlg: `(max-width: ${standards.mobileL})`,
  sm: `(max-width: ${standards.small})`,
  md: `(max-width: ${standards.medium})`,
  lg: `(max-width: ${standards.large})`,
  xl: `(max-width: ${standards.extraLarge})`,
}

export const media = {
  phoneXs: `@media ${pt.msm}`,
  phoneSm: `@media ${pt.mmd}`,
  phone: `@media ${pt.mlg}`,
  tablet: `@media ${pt.sm}`,
  laptop: `@media ${pt.md}`,
  laptopLg: `@media ${pt.lg}`,
  largeScreen: `media ${pt.xl}`
}