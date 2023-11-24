import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const COLORS = {
  primary: '#51ADE5',
  primary2: '#FE9063',
  primary3: '#14b987',
  primary4: '#337bff',
  primary5: '#ff50a2',
  primary6: '#577bff',
  yellow: '#FFCD90',
  secondary: '#26C25A',
  secondaryLight: '#3BB77E',
  success: '#4FAA89',
  danger: '#ff4a5c',
  warning: '#ffb02c',
  white: '#fff',
  info: '#F5F6FC',
  text: 'rgb(235,245,242)',
  primayLight: 'rgba(255,144,99,.13)',
  primayLight2: 'rgba(0,196,132,.12)',
  primayLight3: 'rgba(51,123,255,.15)',
  primayLight4: 'rgba(255,80,162,.2)',
  primayLight5: 'rgba(87,123,255,.2)',
  textLight: 'rgba(0,0,0,.5)',
  title: '#2F2F2F',
  dark: '#040404',
  light: '#F5F5F5',
  borderColor: '#E6E6E6',
  darkBorder: 'rgba(255, 255, 255, 0.2)',
  darkBg: '#2c3f6d',
  placeholderColor: '#646464',
  red: '#f85c6f',
  redLight: 'rgba(248,92,111,.2)',
  themePrimary: '#1630C2',
  themeSecondary: '#50967C',
};

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  //radius
  radius_sm: 8,
  radius: 12,
  radius_md: 18,

  //space
  padding: 15,
  margin: 15,

  //Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  //App dimensions
  width,
  height,
};
export const FONTS = {
  fontPoppins: {fontFamily: 'Poppins-SemiBold'},
  fontNunito: {fontFamily: 'NunitoSans-Regular'},

  fontLg: {
    fontSize: SIZES.fontLg,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  font: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  fontSm: {
    fontSize: SIZES.fontSm,
    color: COLORS.text,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  fontXs: {
    fontSize: SIZES.fontXs,
    color: COLORS.text,
    lineHeight: 14,
    fontFamily: 'NunitoSans-Regular',
  },
  h1: {fontSize: SIZES.h1, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},
  h2: {fontSize: SIZES.h2, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},
  h3: {fontSize: SIZES.h3, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},
  h4: {fontSize: SIZES.h4, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},
  h5: {fontSize: SIZES.h5, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},
  h6: {fontSize: SIZES.h6, color: COLORS.title, fontFamily: 'Poppins-SemiBold'},

  fontBold: {fontFamily: 'NunitoSans-Bold'},
};



const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
