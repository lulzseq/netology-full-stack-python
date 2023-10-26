import './App.css'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Outlet
} from "react-router-dom";

import HomePage from './components/HomePage';
import DriftPage from './components/DriftPage';
import TimeAttackPage from './components/TimeAttackPage';
import ForzaPage from './components/ForzaPage';


function Menu() {
  const className = ({ isActive }) => "menu__item" + (isActive ? " menu__item-active" : "");

  return (
    <nav className='menu'>
      <NavLink to="/" className={className}>ГЛАВНАЯ</NavLink>
      <NavLink to="/drift" className={className}>ДРИФТ-ТАКСИ</NavLink>
      <NavLink to="/timeattack" className={className}>TIME ATTACK</NavLink>
      <NavLink to="/forza" className={className}>FORZA KARTING</NavLink>
    </nav>
  );
  return null;
}


export default function App() {
  return (
    <Router>
      <div>
        <Menu />
        <div className="page">
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route element={<Outlet />} />
            </Route>
            <Route path="/drift" element={<DriftPage />} />
            <Route path="/timeattack" element={<TimeAttackPage />} />
            <Route path="/forza" element={<ForzaPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}