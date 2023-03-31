import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import { Container } from "./components/common/Container";
import { AuthContext } from "./context/auth";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ChildrenProps as ProtectedRouteProps } from "./types";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:userID"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
