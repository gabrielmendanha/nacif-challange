import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/login";
import Todos from "./pages/todos";
import { UserProvider } from "./hooks/useUser.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/todos" element={<Todos />} />
                </Route>
            </Routes>
          </BrowserRouter>
      </UserProvider>
  )
}

export default App
