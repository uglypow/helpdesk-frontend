import TopBar from './components/TopBar';
import KanbanBoard from './components/KanbanBoard';

function App() {

  document.body.style.overflow = "hidden"

  return (
    <div>
      <TopBar />
      <KanbanBoard />
    </div>
  )
}

export default App
