import React from 'react';
import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
    const Apps = () => <div>Apps</div>

    return (
        <Router>
            <Navbar bg="light" variant="light">
                <Navbar.Brand><Link to="/">CovidMap</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/">Home</Link>
                    <span style={{paddingLeft: "5px", paddingRight: '5px'}}></span>
                    <Link to="/apps">Apps</Link>
                </Nav>               
            </Navbar>

            <Switch>
                <Route path="/" exact>
                    <CovidDashboard />
                </Route>
                <Route path="/apps" exact>
                    <Apps></Apps>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
