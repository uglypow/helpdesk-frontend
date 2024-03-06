import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import About from './components/About';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Table from './components/Table';

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KanbanBoard />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/table" element={<Table />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
