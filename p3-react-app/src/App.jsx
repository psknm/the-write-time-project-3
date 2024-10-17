import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './Components/ThemeProvider';
import Home from './Components/Home';
import History from './Components/History';
import SnippetView from './Components/SnippetView';

function App() {
  return (
    <>
    <ThemeProvider>
    <Router>
      <div className="app-navbar">
        <nav className="navigation-bar">
          <ul>
            <li>
              <Link to="/">Write</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className='nav-container'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/snippet/:id" element={<SnippetView />} />
        </Routes>

      </div>


    </Router>
    </ThemeProvider>
    </>

  )
}

export default App;
