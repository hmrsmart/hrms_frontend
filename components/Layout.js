import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { logout } from "../lib/auth";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem as NavList,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "reactstrap";

const Layout = (props) => {
  const title = "ZYCLYX | HRMS";
  const { user, setUser } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isSideNavExpanded, setSideNavExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const toggleSideNav = () => setSideNavExpanded(!isSideNavExpanded);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar
        color="dark"
        dark
        expand="md"
        fixed="top"
        className="fixed top-nav py-2"
      >
        <Link href="/">
          <a className="navbar-brand">
            <img src="./logo-white.png" alt="ZYCLYX" />
          </a>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link href="/password_reset">
                      <a>Reset Password</a>
                    </Link>
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem>
                    <Link href="/login">
                      <a
                        className=""
                        onClick={() => {
                          logout();
                          setUser(null);
                        }}
                      >
                        Logout
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign In</a>
              </Link>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      <div className="container-fluid">
        {user && (
          <div className="side-nav">
            <SideNav onToggle={() => toggleSideNav()}>
              <SideNav.Toggle />
              <SideNav.Nav>
                <Link href="/">
                  <NavItem
                    eventKey="home"
                    onSelect={(selected) => setActiveLink(selected)}
                    active={activeLink === "home"}
                  >
                    <NavIcon title="Home">
                      <FontAwesomeIcon
                        icon={["fas", "home"]}
                        style={{
                          fontSize: "1.3em",
                          color: activeLink === "home" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                </Link>
                <Link href="/my-profile">
                  <NavItem
                    eventKey="profile"
                    active={activeLink === "profile"}
                    onSelect={(selected) => setActiveLink(selected)}
                  >
                    <NavIcon title="My Profile">
                      <FontAwesomeIcon
                        icon={["fas", "address-card"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "profile" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>My Profile</NavText>
                  </NavItem>
                </Link>
                <Link href="/timesheets">
                  <NavItem
                    eventKey="tasks"
                    active={activeLink === "tasks"}
                    onSelect={(selected) => setActiveLink(selected)}
                  >
                    <NavIcon title="Tasks">
                      <FontAwesomeIcon
                        icon={["fas", "tasks"]}
                        style={{
                          fontSize: "1.3em",
                          color: activeLink === "tasks" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>My Tasks</NavText>
                  </NavItem>
                </Link>

                <Link href="/attendance">
                  <NavItem
                    eventKey="attendance"
                    active={activeLink === "attendance"}
                    onSelect={(selected) => setActiveLink(selected)}
                  >
                    <NavIcon title="Attendance">
                      <FontAwesomeIcon
                        icon={["fas", "clock"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "attendance" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Attendance</NavText>
                  </NavItem>
                </Link>
                <Link href="/holidays">
                  <NavItem
                    eventKey="holidays"
                    active={activeLink === "holidays"}
                    onSelect={(selected) => setActiveLink(selected)}
                  >
                    <NavIcon title="Holidays">
                      <FontAwesomeIcon
                        icon={["fas", "mug-hot"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "holidays" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Holidays</NavText>
                  </NavItem>
                </Link>
                <Link href="/leaves">
                  <NavItem
                    eventKey="leaves"
                    onSelect={(selected) => setActiveLink(selected)}
                    active={activeLink === "leaves"}
                  >
                    <NavIcon title="Leaves">
                      <FontAwesomeIcon
                        icon={["fas", "walking"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "leaves" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Leaves</NavText>
                  </NavItem>
                </Link>
                <Link href="/payslips">
                  <NavItem
                    eventKey="payslips"
                    onSelect={(selected) => setActiveLink(selected)}
                    active={activeLink === "payslips"}
                  >
                    <NavIcon title="Payslips">
                      <FontAwesomeIcon
                        icon={["fas", "money-check-alt"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "payslips" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Payslips</NavText>
                  </NavItem>
                </Link>
                <Link href="/grievances">
                  <NavItem
                    eventKey="grievances"
                    onSelect={(selected) => setActiveLink(selected)}
                    active={activeLink === "grievances"}
                  >
                    <NavIcon title="Grievances">
                      <FontAwesomeIcon
                        icon={["fas", "envelope-open-text"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "grievances" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Grievances</NavText>
                  </NavItem>
                </Link>
                <Link href="/policies">
                  <NavItem
                    eventKey="policies"
                    onSelect={(selected) => setActiveLink(selected)}
                    active={activeLink === "policies"}
                  >
                    <NavIcon title="Policies">
                      <FontAwesomeIcon
                        icon={["fas", "file-contract"]}
                        style={{
                          fontSize: "1.3em",
                          color:
                            activeLink === "policies" ? "#EB9B20" : "#00a14b",
                        }}
                      />
                    </NavIcon>
                    <NavText>Policies</NavText>
                  </NavItem>
                </Link>
              </SideNav.Nav>
            </SideNav>
          </div>
        )}
        <div
          className={`content-wrapper ${isSideNavExpanded && "content-fluid"} `}
        >
          <Container fluid>{props.children}</Container>
        </div>
      </div>
      <style jsx>{`
        .navbar-dark .navbar-nav .nav-link {
          color: #ffffff !important;
        }
        .content-wrapper {
          margin-top: 72px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
