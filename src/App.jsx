import React from 'react';
import KanbanBoard from './pages/KanbanBoard';
import Table from './pages/Table';
import About from './pages/About';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

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
