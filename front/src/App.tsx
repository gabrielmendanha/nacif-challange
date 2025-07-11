import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/login";
import Todos from "./pages/todos";
import {UserProvider} from "./hooks/useUser.tsx";

function App() {
  return (
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/todos" element={<Todos />} />
            </Routes>
          </BrowserRouter>
      </UserProvider>
  )
}

export default App
