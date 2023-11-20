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
    radius: 16,
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


export { COLORS, SIZES, SHADOWS, TEXT , spacing };