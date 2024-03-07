import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Heading/Header";
import SignIn from "./components/SignIn";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlideControl from './components/SlideControl/SlideControl';
import Matches from './components/Matches/Matches';
import Dashboard from './components/Dashboard/Dashboard';
import Resources from './components/Resources/Resources';

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/slides" element={<SlideControl />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
