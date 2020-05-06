import React from 'react';
import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import Stats from "./components/Stats";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {

    return (
        <Router>
            <Navbar bg="light" variant="light">
                <Navbar.Brand><Link to="/">CovidMap</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/maps">Maps</Link>
                    <span style={{paddingLeft: "5px", paddingRight: '5px'}}></span>
                    <Link to="/stats">Stats</Link>
                </Nav>               
            </Navbar>

            <Switch>
                
                <Route path="/maps" exact>
                    <CovidDashboard />
                </Route> 
                <Route path="/stats" exact>
                    <Stats></Stats>
                </Route>
                <Redirect from="/" to="/maps"/>
            </Switch>
        </Router>
    );
}

export default App;
