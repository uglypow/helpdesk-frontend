import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import About from './components/About';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<KanbanBoard />}></Route>
          <Route path="/about" exact element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
