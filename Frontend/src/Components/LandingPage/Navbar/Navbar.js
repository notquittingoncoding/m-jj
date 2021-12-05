import React, { useContext } from "react";
import "./Navbar.css";
import image1 from "../images/img1.jpeg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../authContext/AuthContext";
import { Logout } from "../../../authContext/apiCalls";
export const Navbar = ({home}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const {user} = useContext(AuthContext);
  const {dispatch}=useContext(AuthContext);

  return (
    <div className="head w-100">
    
      {home && <div className="tansparentshading">
        <p>TRAVELLER'S SCOUT</p>
        <span>A globetrotter's guide,</span>

        <span> curated by globetrotters around the world</span>
      </div>

      }
      <div>
    
        <nav
          className={home?
            (isScrolled
              ? "scrolled navbar navbar-expand-lg navbar-light"
              : "navbar navbar-expand-lg navbar-light"
            ):"scrolled navbar navbar-expand-lg navbar-light"}
        >
          <div style={{ marginRight: "10px" }}>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "white" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            {user?(<li className="nav-item dropdown">
              
              <NavLink
                className="nav-link"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              
              >
                
                <div style={{height:"100%",width:"100%"}}>
                <img src="data:image/jpeg;base64,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"
                 alt="" height="28px" width="28px" style={{borderRadius:"13px"}} />
                 </div>
             
                
                
              </NavLink>
              
              <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{marginRight:"20px"}}>
                <NavLink className="dropdown-item" to="/Userprofile">
                  My Profile
                </NavLink>
                <NavLink className="dropdown-item"  to="/login"
                   onClick={()=>Logout(dispatch)}>
                  Logout
                </NavLink>
              
          
              </div>
            </li>):(
              <li className="nav-item">
                <NavLink className="nav-link" to="/LogIn">
                  Log In
                </NavLink>
              </li> )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>


              <li className="nav-item dropdown">
              
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                
                >
                  Places
                 
                  
                </NavLink>
                
                
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/SearchPlaces">
                    Search Places
                  </NavLink>
                  <NavLink className="dropdown-item "  to="/CreateExperience" >
                  Create Experience
                  </NavLink>
                
           
                </div>
              </li>

















              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/AboutUs"
                  role="button"
                >
                  About Us
                </NavLink>
              </li>


              
              
            </ul>
          </div>
        </nav>
      </div>
     {home && <div className="cara">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div> }
    </div>
  );
};
