import { useState, useEffect, useContext } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from "../FirebaseConfig"
import { useNavigate } from 'react-router-dom'
import {ThemeContext} from './Contexts';


const Home = () => {

    const [inputMinutes, setInputMinutes] = useState("");
    const [inputSeconds, setInputSeconds] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [title, setTitle] = useState("")
    const [snippetText, setSnippetText] = useState("");



    const handleTimerTick = () => {
        if (inputSeconds > 0) {
                setInputSeconds(inputSeconds - 1);
        } else if (inputMinutes > 0) {
                setInputMinutes(inputMinutes - 1);
                setInputSeconds(59);
        } else {
                clearInterval(timer);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(handleTimerTick, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, inputMinutes, inputSeconds]);

    const handleInputMinutes = (e) => {
        setInputMinutes(e.target.value)

    }

    const handleInputSeconds = (e) => {
        const value = e.target.value
    
        if (value.length > 2) {
            alert ('Up to two numbers only');
            return;
        }

        const numericValue = Number(value);

        if (numericValue < 0 || numericValue > 59) {
            alert ('Please enter a number from 0 to 59 only')
            return;
        }

        setInputSeconds(numericValue);

    }

    const handleStart = () => {
        setIsRunning(true);
    }

    const handlePause = () => {
        setIsRunning(false);
    }

    const handleReset = (e) => {
        setInputMinutes("");
        setInputSeconds("");
        setIsRunning(false);
    }

    const snippetHistoryRef = collection(db, "snippethistory");
    let navigate = useNavigate();

    const savePost = async () => {
        await addDoc(snippetHistoryRef, {title, snippetText});
        navigate("/history");
    }

    const useTheme = () => {
        return useContext(ThemeContext);
    }

    const { theme, changeTheme, themes } = useTheme(ThemeContext); 

    const backgroundStyle = themes[theme]?.background || '#fff';

    return (
        <>
        <div className="timertext">
        <div style={{background: backgroundStyle, height: '100vh'}} className='home-page'>
            <h2>Let's Write!</h2>
            <div>
                <label htmlFor='minutes'></label>
                <input id="minutes" className='number-input' type='number' maxLength={2} value={inputMinutes} onChange={handleInputMinutes} placeholder='00'></input>:
                <label htmlFor='seconds'></label>
                <input id="seconds" className='number-input' type='number' maxLength={2} value={inputSeconds} onChange={handleInputSeconds} placeholder='00'></input>
                </div>
                
                <button className='home-buttons start-button' onClick={handleStart}>Start</button>
                <button className='home-buttons pause-button' onClick={handlePause}>Pause</button>
                <button className='home-buttons reset-button' onClick={handleReset}>Reset</button><br /><br />

                <label htmlFor="title">Title: </label>
                <input type="text" maxLength={64} className="title-input" required onChange={(e) => {setTitle(e.target.value)}}></input><br/><br/>
                <label htmlFor="snippet"></label>
                <div><textarea className="writing-area" rows="20" cols="100" onChange={(e) => {setSnippetText(e.target.value)}}></textarea></div>
                <button className='save-button' onClick={savePost}>Save</button>
                
                <br /><br />

                <div style={{background: backgroundStyle, height: '1vh'}}>
                            <label htmlFor="theme">Select a Theme: </label>
                            <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
                                <option value="light">Light</option>
                                <option value="pink">Pink</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                            </select>
                        </div>
                </div>
                
        </div>
        </>
    )

}

export default Home;