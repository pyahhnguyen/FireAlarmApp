import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('screen');

const COLORS = {
    blue: "#4267B2",
    red: "#EB6A58",
    green: "#449282",
    white: "#FBFBFB",
    lightWhite: "#FFFFFF",  
    lightBlue: "#6885C1",
    lightRed: "#EB9C9B",
    lightGreen: "#73ADA1",
    black: '#121212',
    dark: '#3D3A45',
    gray: '#8C8896',
    lightGrey: '#D1CFD5',
    primary: "#2A4D50",
    secondary: "#DDF0FF",
    tertiary: "#FF7754",
    header: '#45CFDD',
    background: '#51C2D5',
    alert: '#FF414D'

};


const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    fourteen: 14,
    eighteen: 18, 
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    height,
    width,
    radius: 12,
    padding: 24,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
};

const TEXT = {
    xxSmall: 11,
    xSmall: 13,
    small: 15,
    medium: 17,
    large: 21,
    xLarge: 27,
    xxLarge: 32,
};

 const spacing = {
    s: 8,
    m: 18,
    l: 24,
    xl: 40,
  };
const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },

};
const FONTS = {
    h1: { fontFamily: "bold", fontSize: SIZES.xxLarge, lineHeight: 36 },
    h2: { fontFamily: "bold", fontSize: SIZES.xLarge, lineHeight: 30 },
    h3: { fontFamily: "bold", fontSize: SIZES.large, lineHeight: 22 },
    h4: { fontFamily: "bold", fontSize: SIZES.medium, lineHeight: 22 },
    h5: { fontFamily: "bold", fontSize: SIZES.small, lineHeight: 12 },
    body1: { fontFamily: "regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "regular", fontSize: SIZES.body5, lineHeight: 22 },
}


export { COLORS, SIZES, SHADOWS, TEXT , spacing, FONTS };