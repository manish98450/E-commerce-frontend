import React from "react";
import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Aboutus from "./aboutus";
import Contactus from "./contactus";
import SignupComponent from "./SignupComponent";
import MainComponent from "./MainComponent";
import './index.css';  

export default class IndexComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="background"></div>
                <div className="content">
                    <div className="nav nav-pills">
                        <Router>
                            <div className="nav-item">
                                <NavLink to="/aboutus" className='nav-link'>About us</NavLink>
                            </div>

                            <div className="nav-item">
                                <NavLink to="/contactus" className='nav-link'>Contact us</NavLink>
                            </div>

                            <div className="nav-item">
                                <NavLink to="/signup" className='nav-link'>Signup</NavLink>
                            </div>

                            <div className="nav-item">
                                <NavLink to="/login" className='nav-link'>Login</NavLink>
                            </div>

                            <Routes>
                                <Route path="/aboutus" element={<Aboutus />}></Route>
                                <Route path="/contactus" element={<Contactus />}></Route>
                                <Route path="/signup" element={<SignupComponent />}></Route>
                                <Route path="/login" element={<MainComponent />}></Route>
                            </Routes>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}
