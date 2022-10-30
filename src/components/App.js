import React, { useContext } from 'react';
import './App.css';
import HomePage from './Pages/Home/HomePage';
import OverviewPage from './Pages/Overview/OverviewPage';
import BudgetPage from './Pages/Budget/BudgetPage';
import CalculatorPage from './Pages/Calculator/CalculatorPage';
import InvestmentPage from './Pages/Investments/InvestmentPage';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import OverviewInfo from './Pages/Overview/OverviewInfo';
import OverviewCharts from './Pages/Overview/OverviewCharts';
import OverviewHistory from './Pages/Overview/OverviewHistory';
import LoginProvider, { LoginContext } from '../contexts/LoginContext';
import CategoryPage from './Pages/Category/CategoryPage';

function App() {
  return (
    <LoginProvider><AppNoLoginProvider /></LoginProvider>
  )
}


function AppNoLoginProvider() {
  const { userAuth } = useContext(LoginContext);

  return (
    <div className="App">
      <HashRouter basename=''>
        {userAuth.id !== "" && <SideMenu />}
        <Routes>
          <Route path='' element={<LoginPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='overview' element={<OverviewPage />} >
            <Route path='info' element={<OverviewInfo />} />
            <Route path='charts' element={<OverviewCharts />} />
            <Route path='history' element={<OverviewHistory />} />
          </Route>
          <Route path='budget' element={<BudgetPage />} />
          <Route path='calculator' element={<CalculatorPage />} />
          <Route path='investment' element={<InvestmentPage />} />
          <Route path='category' element={<CategoryPage />} />
        </Routes>

        {userAuth.id !== "" && <NavBar />}
      </HashRouter>
    </div>
  );
}

export default App;
