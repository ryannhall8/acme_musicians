import { useState, useEffect } from 'react'

function App() {
  const [musicians, setMusicians] = useState([]);
  useEffect(()=> {
    const fetchMusicians = async()=> {
      const response = await fetch('/api/musicians');
      const json = await response.json();
      setMusicians(json);
    };
    fetchMusicians();
  }, []);

  return (
      <div>
        <h1>musicians ({ musicians.length })</h1>
        <ul>
          {
            musicians.map((musician)=>{
              return (
                <li key={ musician.id }>
                  { musician.name }
                  <ul>
                  { musician.genre }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
  )
}

export default App
