import { useState, useEffect,Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import './catfact.css'
export const Catfact = () => {
    const [fact, setFact] = useState([]);
  
    useEffect(() => {
      fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
        .then((fa) => setFact(fa.fact));
    }, []);
    console.log(fact)

    return (
        
    <div className="header-quote">
        Cat Fact : <span id="catFact">{fact}</span>

    </div>

    );
  };

  export default Catfact;