import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from './Contexts/AuthContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import TaskList from './screens/TaskList';


function App() {

  return (
      <BrowserRouter>
          <AuthProvider>
                <Routes>
                    <Route exact path='/' element={<HomeScreen />} />
                    <Route path="/tasklist/:id" element={<TaskList />} />
                </Routes>
          </AuthProvider>
      </BrowserRouter>


  );
}

export default App;
