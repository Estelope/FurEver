import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Heading/Header";
import SignIn from "./components/SignIn";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlideControl from './components/SlideControl/SlideControl';

function App() {

  return (
    <Router>
      <Header />
      <NavBar />
      <SlideControl />
      <Footer />
      <Routes>
      </Routes>
    </Router>

  );
}

export default App;
