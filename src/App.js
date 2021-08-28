import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './CSS/commonStyle.css';

import LoginPage from './Components/LoginPage/LoginPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Navbar from './Components/Navbar/Navbar';
import Assets from './Components/Assets/Assets.js';
import AssetCreate from './Components/Assets/AssetCreate.js';
import AssetEdit from './Components/Assets/AssetEdit';

import Transactions from './Components/Transactions/Transactions';
import TransactionCreate from './Components/Transactions/TransactionCreate';
import TransactionEdit from './Components/Transactions/TransactionEdit';

import InvestmentAdvisor from './Components/InvestmentAdvisor/InvestmentAdvisor';
import TodoList from './Components/TodoList/TodoList';
import TodoListCreate from './Components/TodoList/TodoListCreate';
import TodoListEdit from './Components/TodoList/TodoListEdit';
import LoginRegister from './Components/LoginPage/LoginRegister';
import HomePage from './Components/HomePage/HomePage';
import About from './Components/About/About';
import Credit from './Components/Credits/Credits';
const App = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Route path='/' exact component={HomePage} />
            <Route path='/login/' exact component={LoginPage} />

            <Route path='/register/' exact component={LoginRegister} />
            <Route path='/dashboard/' exact component={Dashboard} />

            <Route path="/assets/" exact component={Assets} />
            <Route path='/assets/create/' component={AssetCreate} />
            <Route path='/assets/edit/:id' component={AssetEdit} />

            <Route path='/transactions/' exact component={Transactions} />
            <Route path='/transactions/create/' component={TransactionCreate} />
            <Route path='/transactions/edit/' component={TransactionEdit} />

            <Route path='/advisor/' exact component={InvestmentAdvisor} />

            <Route path='/todos/' exact component={TodoList} />
            <Route path='/todos/create/' component={TodoListCreate} />
            <Route path='/todos/edit/' component={TodoListEdit} />

            <Route path='/about' component={About}/>
            <Route path='/credit' component={Credit}/>

        </BrowserRouter>
    );
};

export default App;