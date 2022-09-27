import { createTheme } from '@material-ui/core';

import BebasNeueRegularWoff2 from './fonts/BebasNeue/BebasNeue-Regular.woff2';
import BebasNeueRegularWoff from './fonts/BebasNeue/BebasNeue-Regular.woff';
import BebasNeueRegularTrueType from './fonts/BebasNeue/BebasNeue-Regular.ttf';
import BebasNeueBoldWoff2 from './fonts/BebasNeue/BebasNeue-Bold.woff2';
import BebasNeueBoldWoff from './fonts/BebasNeue/BebasNeue-Bold.woff';
import BebasNeueBoldTrueType from './fonts/BebasNeue/BebasNeue-Bold.ttf';


declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
    whiteBasic: string;
    trueblackBasic: string;
    brand: string;
    grey: string;
    greyMain: string;
    greyLight: string;
    greenMain: string;
    greenLight: string;
    blackGrey: string;
    red: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth: number;
    galleryViewBackgroundColor: string;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    components?: object;
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
    whiteBasic: string;
    trueblackBasic: string;
    brand: string;
    grey: string;
    greyMain: string;
    greyLight: string;
    greenMain: string;
    greenLight: string;
    blackGrey: string;
    red: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth?: number;
    galleryViewBackgroundColor: string;
  }
}

const BebasNeueRegular = {
  fontFamily: "BebasNeue",
  fontStyle: "normal",
  // fontDisplay: "swap",
  fontWeight: 300,
  src: `
    local('BebasNeue'),
    local('BebasNeue-Regular'),
    url(${BebasNeueRegularTrueType}) format("truetype"),
    url(${BebasNeueRegularWoff2}) format("woff2"),
    url(${BebasNeueRegularWoff}) format("woff")
  `
};

  // MozFontFeatureSettings?: FontFaceFontFeatureSettingsProperty;
  // ascentOverride?: FontFaceAscentOverrideProperty;
  // descentOverride?: FontFaceDescentOverrideProperty;
  // fontDisplay?: FontFaceFontDisplayProperty;
  // fontFamily?: string;
  // fontFeatureSettings?: FontFaceFontFeatureSettingsProperty;
  // fontStretch?: FontFaceFontStretchProperty;
  // fontStyle?: FontFaceFontStyleProperty;
  // fontVariant?: FontFaceFontVariantProperty;
  // fontVariationSettings?: FontFaceFontVariationSettingsProperty;
  // fontWeight?: FontFaceFontWeightProperty;
  // lineGapOverride?: FontFaceLineGapOverrideProperty;
  // sizeAdjust?: string;
  // src?: string;
  // unicodeRange?: string;

const BebasNeueBold = {
  fontFamily: "BebasNeue",
  fontStyle: "normal",
  // fontDisplay: "swap",
  fontWeight: 700,
  src: `
    local('BebasNeue'),
    local('BebasNeue-Bold'),
    url(${BebasNeueBoldTrueType}) format("truetype"),
    url(${BebasNeueBoldWoff2}) format("woff2"),
    url(${BebasNeueBoldWoff}) format("woff")
  `
};

// @font-face{
//     font-family: BebasNeue;
//     src: url("@{webpackFontPath}BebasNeue/BebasNeue-Bold.ttf") format("truetype"),
//          url("@{webpackFontPath}BebasNeue/BebasNeue-Bold.woff2") format("woff2"),
//          url("@{webpackFontPath}BebasNeue/BebasNeue-Bold.woff") format("woff");
//     font-weight:700;
//     font-style:normal;
// }

const defaultTheme = createTheme();

export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
        },
        'body': {
          fontSize: '16px',
        },
        '@font-face': [BebasNeueRegular, BebasNeueBold],
        // // You should target [class*="MuiButton-root"] instead if you nest themes.
        // '.MuiButton-root': {
        //   fontSize: '1rem',
        // },
      },
    },
    MuiCheckbox: {
      root: {
        borderRadius: '8px',
        '&$root$root:hover': {
          backgroundColor: 'transparent'
        },
        "&$checked": {
          color: "rgba(0, 0, 0, 0.54)",
          "& .MuiIconButton-label": {
            backgroundColor: '#E94E32'
            // position: "relative",
            // zIndex: 0
          },
          // "& svg": {
          //   color: 'green'
          // }
        },
        "& .MuiIconButton-label": {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px'
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: '8px',
        // textTransform: 'capitalize',
        padding: '19px 14px',
        color: '#ffffff', // defaultTheme.,
        fontSize: '1rem',
        // textTransform: 'uppercase',
        transition: defaultTheme.transitions.create(['background-color', 'box-shadow', 'border', 'color'], {
          duration: defaultTheme.transitions.duration.short,
        }),
      },
      disabled: {
        backgroundColor: 'red',
      //   border: `solid ${theme.palette.primary.main}`,
      //   '& svg': {
      //     color: `${theme.palette.primary.main}`,
      //   },
      },
      label: {
        color: '#ffffff',
      },
      text: {
        padding: '19px 14px',
      },
      contained: {
        // backgroundColor: '#E94E32',
        /* .tbk-grey */
        backgroundColor: '#6B7178',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        // '& .Mui-disabled': {
        //   // .tbk-grey-inactive
        //   backgroundColor: '#CBCFD5',
        // }
      },
      containedPrimary: {
        backgroundColor: '#E94E32',
        '&:hover': {
          backgroundColor: '#F1644A',
        },
        '& .Mui-disabled': {
          // .tbk-grey-inactive
          backgroundColor: '#CBCFD5',
        }
      },
      outlinedPrimary: {
        padding: '19px 14px',
        color: '#E94E32',
        backgroundColor: 'transparent',
        border: '2px solid #E94E32', //'2px solid #027AC5',
        label: {
          color: '#E94E32',
        },
        '& .MuiButton-label': {
          color: '#E94E32',
        },
        '&:hover': {
          backgroundColor: '#F1644A',
          border: '2px solid #F1644A', // '2px solid rgb(1, 85, 137)',
          '& .MuiButton-label': {
            color: '#FFFFFF',
          }
        },
      },
      outlinedSecondary: {
        padding: '19px 14px',
        // color: '#E94E32',
        color: '#6B7178',
        backgroundColor: 'transparent',
        // border: '2px solid #E94E32', //'2px solid #027AC5',
        border: '2px solid #6B7178', //'2px solid #027AC5',
        label: {
          // color: '#E94E32',
          color: '#6B7178',
        },
        '& .MuiButton-label': {
          // color: '#E94E32',
          color: '#6B7178',
        },
        '&:hover': {
          backgroundColor: '#F1644A',
          border: '2px solid #F1644A', // '2px solid rgb(1, 85, 137)',
          '& .MuiButton-label': {
            color: '#FFFFFF',
          }
        },
      },
      startIcon: {
        marginRight: '6px',
      },
      // plusIcon: {
      //   marginRight: '6px',
      // },
    },
    MuiTypography: {
      body1: {
        color: 'rgb(40, 42, 43)',
        fontSize: '0.9rem',
      },
    },
    // MuiInputLabel: {
      // root: {
      //   color:'black',
      //   fontSize: 13,
      // },
    // },
    MuiInputBase: {
      root: {
        fontSize: '0.9rem',
      },
    },
    MuiSelect: {
      root: {
        padding: '0.85em',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '24px', // '16px',
        width: '100%',
        justifyContent: 'stretch',
      },
    },
    MuiTextField: {
      root: {
        color: 'rgb(40, 42, 43)',
      },
    },
    MuiInputLabel: {
      root: {
        color: '#6B7178', //'rgb(40, 42, 43)',
        marginLeft: '1rem',
        marginBottom: '0.5rem',
        // fontSize: '1.1rem',
        fontWeight: 400, //500,
        fontSize: '12px',
        lineHeight: '18px',
        textAlign: 'left',
      },
    },
    MuiOutlinedInput: {
      root: {
        fontSize: '0.9rem',
      },
      input: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '26px',
        padding: '19px 16px',
        paddingTop: '14px',
        paddingBottom: '14px',
        border: '1px solid #CBCFD5',
        borderRadius: '8px',
        textOverflow: 'ellipsis',
      },
      notchedOutline: {
        borderColor: 'rgb(136, 140, 142)',
      },
    },
  },

  typography: {
    fontFamily: [
      'BebasNeue',
      'AvenirNextCondensed-Bold',
      'Futura-CondensedExtraBold',
      'HelveticaNeue-CondensedBold',
      'Arial Narrow',
      'Helvetica Neue',
      'sans-serif-condensed',
      'sans-serif',
    ].join(','),

    /* .tbk-text-main */
    body1: {
      fontFamily: "'Poppins', Arial, sans-serif",
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '26px'
    },
    // body2: {

    // },
    /* .tbk-text-small */
    subtitle1: {
      fontSize: 12,
      fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '18px',
      fontWeight: 400,
    },
    /* .tbk-text-small-bold */
    caption: {
      fontSize: 12,
      fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '14px',
      fontWeight: 700,
    },
    /* H1 Headline */
    h1: {
      // fontFamily: 'BebasNeue',
      fontWeight: 700,
      fontSize: 60,
      lineHeight: '60px'
    },
    /* .tbk-text-medium-headline */
    h2: {
      fontSize: 40,
      // fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '40px',
      fontWeight: 700,
    },
    /* .tbk-text-h3-subtitle */
    h3: {
      fontSize: 18,
      fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '26px',
      fontWeight: 600,
    },
    /* Navigation Narrow */
    h4: {
      fontSize: 26,
      // fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '26px',
      fontWeight: 700,
    },
    /* .tbk-text-epic-medium */
    h5: {
      fontSize: 22,
      fontFamily: "'Poppins', Arial, sans-serif",
      lineHeight: '33px',
      fontWeight: 400,
    },
    /* .tbk-text-cta */
    button: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '26px'
    },
    /* .tbk-text-main-linked */
    subtitle2: {
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '26px'
    },

  },
  palette: {
    primary: {
      main: '#303740' // '#027AC5',
    },
    secondary: {
      main: '#ffffff' // '#027AC5',
    },
    action: {
      active: "#E94E32", //lightBlue[200],
      // activeOpacity: 1,
      hover: "#F8F8F8", // lightBlue[100],
      // hoverOpacity: 0.7,
      // focus: lightBlue[600],
      // focusOpacity: 1,
      // selected: lightBlue[300],
      // selectedOpacity: 1
    },
  },
  brand: '#E22525',
  grey: '#6B7178',
  greyMain: '#303740',
  greyLight: '#F8F8F8',
  red: '#E94E32',
  whiteBasic: '#ffffff',
  trueblackBasic: '#000000',
  greenMain: '#3BC693',
  greenLight: '#61d2a8',
  blackGrey: '#111418',
  footerHeight: 72,
  mobileFooterHeight: 56,
  sidebarWidth: 300,
  sidebarMobileHeight: 90,
  sidebarMobilePadding: 8,
  participantBorderWidth: 2,
  mobileTopBarHeight: 52,
  rightDrawerWidth: 320,
  galleryViewBackgroundColor: '#121C2D',
});
