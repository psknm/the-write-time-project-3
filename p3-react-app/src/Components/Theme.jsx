import { useContext } from 'react'
import { ThemeContext } from './Contexts';

const Theme = () => {
    const { theme, changeTheme, themes } = useContext(ThemeContext);

    const backgroundStyle = themes[theme]?.background || '#fff';

    return (
        <div style={{background: backgroundStyle, height: '150vh'}}>
            <label htmlFor="theme">Select a Theme:</label>
            <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="pink">Pink</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </select>
        </div>
    )
}

export default Theme;