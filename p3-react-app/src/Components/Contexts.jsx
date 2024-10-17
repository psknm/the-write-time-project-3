import { createContext } from 'react';

const ThemeContext = createContext();

const themes = {
    light: {
        background: '#fff'
    },
    
    pink: {
        background: '#f19ed2'
    },

    green: {
        background: '#95d2b3'
    },

    blue: {
        background: '#9bb8cd'
    }
};

export { ThemeContext, themes };