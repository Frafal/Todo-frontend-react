import { ReactKeycloakProvider } from '@react-keycloak/web';
import './App.css';
import TodoApp from './components/todo/TodoApp';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>My todo app</h1>
      </header> */}
      
      <TodoApp />

    </div>
  );
}

export default App;
