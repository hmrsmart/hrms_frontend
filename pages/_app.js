import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faAddressCard,
  faTasks,
  faClock,
  faMugHot,
  faWalking,
  faMoneyCheckAlt,
  faEnvelopeOpenText,
  faFileContract,
  faFileSignature,
  faDownload,
  faBriefcase,
  faAddressBook,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../styles/style.css";
import "../styles/layout.css";
import "react-datetime/css/react-datetime.css";
import "react-calendar/dist/Calendar.css";

library.add(
  faHome,
  faAddressCard,
  faTasks,
  faClock,
  faMugHot,
  faWalking,
  faMoneyCheckAlt,
  faEnvelopeOpenText,
  faFileContract,
  faFileSignature,
  faFileSignature,
  faDownload,
  faBriefcase,
  faAddressBook,
  faPencilAlt
);
class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get("token");
    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            Cookie.remove("token");
            this.setState({ user: null });
            throw Error(res.statusText);
          }
          const user = await res.json();
          this.setUser(user);
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AppContext.Provider
          value={{
            user: this.state.user,
            isAuthenticated: !!this.state.user,
            isManager:
              this.state.user && this.state.user.role.type === "manager",
            setUser: this.setUser,
          }}
        >
          <Head>
            <link rel="icon" type="image/x-icon" href="./favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
              integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
              crossOrigin="anonymous"
            />
            <script
              src="https://kit.fontawesome.com/f3f3fd1f55.js"
              crossOrigin="anonymous"
            ></script>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withData(MyApp);
