import React,{ createContext, useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
      <div className={`App ${theme}`}>
          <ThemeContext.Provider value={theme}>
            <Header theme={theme} setTheme={setTheme} ThemeContext={ThemeContext}/>
            <Content />
            <Footer />
          </ThemeContext.Provider>
      </div>
      
    
  );
}

export default App;
