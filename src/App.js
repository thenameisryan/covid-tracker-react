import React from "react";
import styles from "./App.module.css";
import { Cards, Nav, Footer, Chart } from "./component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  homePage = () => {
    return (
      <React.Fragment>
        <Cards data={this.state.data} />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={styles.container}>
          <Nav />
          <Switch>
            <Route exact path="/" component={this.homePage} />
            <Route exact path="/country" component={Chart} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
