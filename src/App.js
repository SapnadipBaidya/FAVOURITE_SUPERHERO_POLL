import React from 'react';
import './App.css';
import 'h8k-components';
import PollManager from './components/PollManager';

const title = "Poll Manager";

function App() {
  return (
    <div className="App">
      <h8k-navbar header={title} data-testId="navbar"></h8k-navbar>
      <PollManager />
    </div>
  );
}

export default App;
