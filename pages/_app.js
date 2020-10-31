import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../styles/style.css";
import "../styles/layout.css";

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
          this.setState({ isPageLoading: false });
          if (!res.ok) {
            Cookie.remove("token");
            this.setState({ user: null });
            throw Error(res.statusText);
          }
          const user = await res.json();
          this.setUser(user);
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
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <Head>
          <link rel="icon" type="image/x-icon" href="./favicon.ico" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
