import React from "react";
import logo from "../assets/svg/logo.svg";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../assets/png/Avatar.png";
import { Link } from "react-router-dom";
// import logout from "../assets/svg/icons/logout.svg";

function Header() {
  return (
    <div className="navbar_brand">
      <div
        className=" d-flex  justify-content-between align-items-center"
        style={{ margin: "auto 6%", height: "10vh" }}
      >
        <Link to="/">
          <img height={41} src={logo} alt="logo-doxie my-auto" />
        </Link>
        {/* <Dropdown className="navbar_user_icon">
          <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
            <img src={avatar} alt="user icon" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-class me-2"
              >
                <g id="Group 427319026">
                  <g id="Group 427319027">
                    <g id="Group 427319026_2">
                      <path
                        id="Path 17558"
                        d="M13.25 5.6395V4.70648C13.2499 4.22218 13.1543 3.74264 12.9688 3.29529C12.7832 2.84794 12.5113 2.44156 12.1686 2.09934C11.8259 1.75711 11.4192 1.48575 10.9716 1.30081C10.524 1.11587 10.0442 1.02096 9.55994 1.02149H4.68994C4.20564 1.02096 3.72605 1.11587 3.27844 1.30081C2.83084 1.48575 2.42399 1.75711 2.0813 2.09934C1.73861 2.44156 1.4668 2.84794 1.28125 3.29529C1.0957 3.74264 1.00013 4.22218 1 4.70648V15.8365C1.00013 16.3208 1.0957 16.8003 1.28125 17.2477C1.4668 17.695 1.73861 18.1014 2.0813 18.4437C2.42399 18.7859 2.83084 19.0572 3.27844 19.2422C3.72605 19.4271 4.20564 19.522 4.68994 19.5215H9.56995C10.545 19.5218 11.4803 19.1349 12.1703 18.446C12.8603 17.7572 13.2487 16.8225 13.25 15.8475V14.9045"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="svg-class"
                      />
                      <path
                        id="Path 17559"
                        d="M20.04 10.2715H8"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="svg-class"
                      />
                    </g>
                    <path
                      id="Path 17560"
                      d="M17.1094 7.35645L20.0394 10.2715L17.1094 13.1875"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="svg-class"
                    />
                  </g>
                </g>
              </svg>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </div>
  );
}

export default Header;
