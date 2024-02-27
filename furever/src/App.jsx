import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Heading/Header";
import SignIn from "./components/SignIn";
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
      </Routes>
    </Router>

  );
}

export default App;
