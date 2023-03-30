import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import { Container } from "./components/common/Container";

function App() {
  const isUserLoggedIn = true;

  return <Container>{isUserLoggedIn ? <MessagesPage /> : <LoginPage />}</Container>;
}

export default App;
