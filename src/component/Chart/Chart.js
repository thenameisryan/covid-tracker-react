import React, { useState, useEffect, Fragment } from "react";
import { fetchHistoricalDataApi, fetchCountryData } from "../../api";
import Country from "../Country/Country";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Chart.module.css";

export default function Chart() {
  const [historicalData, setHistoricalData] = useState({});
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      setHistoricalData(await fetchHistoricalDataApi());
    };
    fetchApi();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchApi = await fetchCountryData(country);
    setCountryData(fetchApi);
  };

  const dates = historicalData.data
    ? Object.keys(historicalData.data.cases)
    : null;

  const cases = historicalData.data
    ? Object.values(historicalData.data.cases)
    : null;

  const recovered = historicalData.data
    ? Object.values(historicalData.data.recovered)
    : null;

  const deaths = historicalData.data
    ? Object.values(historicalData.data.deaths)
    : null;

  const lineChart = historicalData.data ? (
    <Line
      data={{
        labels: dates.map((date) => date),
        datasets: [
          {
            data: cases.map((data) => data),
            label: "Infected",
            borderColor: "#3333ff",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            fill: false,
            pointHoverBorderWidth: 4,
          },
          {
            data: deaths.map((data) => data),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: false,
          },
          {
            data: recovered.map((data) => data),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
          },
        ],
      }}
    />
  ) : null;

  if (!countryData) {
    return (
      <div className={styles.container}>
        <h1>World Covid Chart</h1>
        {lineChart}
        <h2>Choose a country to see their covid charts</h2>
        <Country
          className={styles.Country}
          handleCountryChange={handleCountryChange}
        />
        <h2>No available data for the current country</h2>
      </div>
    );
  }

  const countryCases = countryData.cases
    ? Object.keys(countryData.cases)
    : null;

  const countryLineChart = countryCases ? (
    <Fragment>
      <Grid container spacing={4} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Cases
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.cases} duration={3} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of total cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.deaths} duration={2} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of total deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.recovered} duration={2} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={4} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Cases Today
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.todayCases} duration={3} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths Today
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.todayDeaths} duration={3} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of new cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered Today
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countryData.todayRecovered} duration={3} separator="," />
            </Typography>
            <Typography variant="body2">
              Number of total active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      </Fragment>
  ) : null;

  return (
    <div className={styles.container}>
      <h1>World Covid Chart</h1>
      {lineChart}
      <h2>Choose a country to see their covid charts</h2>
      <Country
        className={styles.Country}
        handleCountryChange={handleCountryChange}
      />
      {countryLineChart}
    </div>
  );
}
