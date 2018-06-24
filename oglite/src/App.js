import React from 'react';

// import React, { Component } from 'react';
//import logo from './logo.svg';
import mainPage from './componentsVin/vinJs';


import './App.css';
import logo from './bloggerEdit.PNG';

// class App extends Component {
  
//   render() { return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to the Jungle Baby...</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>

//       <mainPage />

    
//     );
//   }
// }

const App = () => (
  <div>
    <mainPage />
  </div>
);


export default App;
