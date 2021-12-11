import axios from "axios";

const dataCovidUrl = "https://disease.sh/v3";
const dataCountryUrl = "https://restcountries.com/v2";

export const fetchData = async () => {
  try {
    const {
      data: {
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
      },
    } = await axios.get(`${dataCovidUrl}/covid-19/all?yesterday=true&twoDaysAgo=false&allowNull=false`);

    return {
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      todayRecovered,
    };
  } catch (error) {}
};

export const fetchCountryData = async (country) => {
  try {
    const response = await axios.get(`${dataCovidUrl}/covid-19/countries/${country}?yesterday=true&twoDaysAgo=false&allowNull=false`);
    const {
      data: {
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
      },
    } = response;
    console.log(response.data);
    return { 
        cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      todayRecovered, };
  } catch (error) {}
};

export const fetchHistoricalDataApi = async () => {
  try {
    const { data } = await axios.get(`${dataCovidUrl}/covid-19/historical/all?lastdays=60`);
    return {
      data,
    };
  } catch (error) {}
};

export const fetchCountries = async () => {
    try {
      const { data } = await axios.get(`${dataCountryUrl}/all`);
      
      const modifiedData = data.map((country) => ({
        name: country.name,
      }));
      return modifiedData;
    } catch (error) {}
  };
