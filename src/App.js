import logo from './logo.gif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://neutralino.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Neutralino
        </a>
      </header>
      <footer className='App-footer'>
        Created with React Nutralino App
      </footer>
    </div>
  );
}

export default App;