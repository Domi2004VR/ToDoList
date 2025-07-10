import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyToDoLists from "./components/myToDoLists";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<MyToDoLists />} />
                <Route path="/home" element={<Home />} />

            </Routes>
        </Router>
    )
}

export default App;
