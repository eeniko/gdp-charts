import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


function ChartsList() {
  const [chartData, updateChartData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("ABW");
  const [selectedCountryName, setSelectedCountryName] = useState("Aruba");

  const typeaheadRef = useRef(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [selectedCountryId]);

  async function fetchChartData() {
    try {
      const request = await axios.get(
        `https://api.worldbank.org/v2/countries/${selectedCountryId}/indicators/NY.GDP.MKTP.KD.ZG?per_page=30&MRV=30&format=json`
      );
      updateChartData(request.data[1]);
      setSelectedCountryName(request.data[1][0].country.value);
      console.log(request.data[1][0].country.value);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCountries = () => {
    fetch("http://api.worldbank.org/v2/country?per_page=300&format=json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data[1]);
      })
      .catch((err) => console.log(err));
  };

  const selectChange = (event) => {
    setSelectedCountryId(event[0].value);
    typeaheadRef.current.clear();
  };



  function renderBarChartData(barChartData) {
    return (
      <BarChart
        width={700}
        height={350}
        data={barChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gdp" fill="darkblue" />
      </BarChart>
    );
  }

  function renderAreaChartData(chartData) {
    return (
      <AreaChart
        width={700}
        height={350}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="gdp"
          stroke="#8884d8"
          fill="darkblue"
          name={selectedCountryId}
        />
      </AreaChart>
    );
  }
  function renderChartData() {
    if (chartData.length) {
      const chartGenData = chartData
        .map((item) => {
          return {
            name: item.date,
            gdp: item.value,
          };
        })
        .reverse();
      return (
        <div className="d-flex flex-column align-items-center mt-2">
          {renderBarChartData(chartGenData)}
          {renderAreaChartData(chartGenData)}
        </div>
      );
    }
  }
  return (
    <>
      <div>
        <p className="select-label"> Please select a country</p>
        <Typeahead
          ref={typeaheadRef}
          key={selectedCountryId}
          id="country_select"
          onChange={selectChange}
          options={countries.map((country) => ({
            label: country.name,
            value: country.id,
            id: country.id,
          }))}
        />
      </div>
    <div className="charts-div">
      <h2> GDP of {selectedCountryName} </h2>
      {renderChartData()}
      </div>
    </>
  );
}

export default ChartsList;
