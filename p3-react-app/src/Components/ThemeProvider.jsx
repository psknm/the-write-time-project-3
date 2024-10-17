import { useState } from "react";
import {ThemeContext, themes} from "./Contexts.jsx";

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light');

    const changeTheme = (newTheme) => {
        if (themes[newTheme]) {
            setTheme(newTheme)
        } else {
            console.log(`Theme "${newTheme}" not available`);
        }
    }

    return (
        <>
            <ThemeContext.Provider value={{theme, changeTheme, themes}}>
                {children}
            </ThemeContext.Provider>
        </>
    )

}



export default ThemeProvider;