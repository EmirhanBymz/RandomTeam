import React from 'react';
import RandomTeamMaker from "./RandomTeamMaker"; 


function App() {
  return (
    <div className="App">
      <RandomTeamMaker />
     <footer style={{
  backgroundColor: '#0d4d0d',
  color: '#aaffaa',
  textAlign: 'center',
  padding: '15px 0',
  fontSize: '14px',
  marginTop: '9rem',
  borderTop: '2px solid #2ecc40'
}}>
  <p>© 2025 Emirhan Baymaz. Tüm hakları saklıdır.</p>
  <p>
    <a
      href="https://github.com/EmirhanBymz"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#00cc66', textDecoration: 'none', fontWeight: 'bold' }}
    >
      GitHub
    </a>{" "}
    |{" "}
    <a
      href="mailto:e@gmail.com"
      style={{ color: '#00cc66', textDecoration: 'none', fontWeight: 'bold' }}
    >
      Mail Gönder
    </a>{" "}
    |{" "}
    <a
      href="https://www.instagram.com/emirhanbaymaz"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#00cc66', textDecoration: 'none', fontWeight: 'bold' }}
    >
      Instagram
    </a>{" "}
    |{" "}
    <a 
          href="https://twitter.com/EmirhanBaymaz" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#00cc66", textDecoration: "none" , fontWeight: 'bold'}}
        >
          Twitter
        </a>
  </p>
</footer>
    </div>
  );
}

export default App;
