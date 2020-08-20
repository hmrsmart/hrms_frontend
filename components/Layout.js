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
import { Container } from "reactstrap";

const Layout = (props) => {
  const title = "ZYCLYX | HRMS";
  const { user, setUser } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect to login page if user not logged in
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>

      {/* <header className="top-nav py-3 d-flex">
        <div className="logo-wrapper ml-3">
          <img src="./logo-white.png" alt="ZYCLYX logo" />
        </div>
        <div className="ml-auto pr-4 d-flex align-items-center">
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </div>
      </header> */}
      <Navbar color="dark" dark expand="md" className="top-nav py-2">
        <Link href="/">
          <a className="navbar-brand">
            <img src="./logo-white.png" alt="ZYCLYX logo" className="ml-2" />
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
                  <DropdownItem>Profile</DropdownItem>

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
            <SideNav
              onSelect={(selected) => {
                // Add your code here
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">
                <Link href="/">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.5em" }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                </Link>
                <Link href="/my-profile">
                  <NavItem eventKey="profile">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-user"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>My Profile</NavText>
                  </NavItem>
                </Link>
                <Link href="/timesheets">
                  <NavItem eventKey="timesheet">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-tasks"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Timesheets</NavText>
                  </NavItem>
                </Link>

                <Link href="/attendance">
                  <NavItem eventKey="attendance">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-clock-o"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Attendance</NavText>
                  </NavItem>
                </Link>

                <Link href="/leaves">
                  <NavItem eventKey="leaves">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-sign-out"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Leaves</NavText>
                  </NavItem>
                </Link>
                <Link href="/payslips">
                  <NavItem eventKey="payslips">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-usd"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Payslips</NavText>
                  </NavItem>
                </Link>
                <Link href="/team">
                  <NavItem eventKey="team">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-users"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Team</NavText>
                  </NavItem>
                </Link>
                <Link href="/hiring">
                  <NavItem eventKey="hiring">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-briefcase"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Hiring</NavText>
                  </NavItem>
                </Link>
                <Link href="/noticeboard">
                  <NavItem eventKey="noticeboard">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-newspaper-o"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>Noticeboard</NavText>
                  </NavItem>
                </Link>
                <Link href="/iprocurement">
                  <NavItem eventKey="iprocurement">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-check-square"
                        style={{
                          fontSize: "1.5em",
                          color: "#EB9B20",
                          opacity: 1,
                        }}
                      />
                    </NavIcon>
                    <NavText>IProcurement</NavText>
                  </NavItem>
                </Link>
              </SideNav.Nav>
            </SideNav>
          </div>
        )}
        <div className="content-wrapper">
          <Container fluid>{props.children}</Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;
