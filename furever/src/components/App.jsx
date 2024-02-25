import './App.css';
import Header from "./Header";
import SignIn from "./SignIn";
import SlideControl from "./SlideControl"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
      </Routes>
    </Router>

  );
}

export default App;
