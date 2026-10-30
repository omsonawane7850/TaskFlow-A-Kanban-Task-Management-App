import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}

export default App;