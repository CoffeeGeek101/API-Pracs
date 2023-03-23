import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis } from "recharts";
import "./report.css";
import {motion} from 'framer-motion';

export const CustomTooltip = ({ active, payload,label }) => {
  if (active && payload) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "8px",
          borderRadius: "20px",
          boxShadow: "1px 2px 10px -2px #979797",
        }}
      >
        <p
          className="label"
          style={{
            borderStyle: "solid 1px ",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {`${label} : ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

export default function Report({ weatherData, forecastData }) {
  // console.log(weatherData.city);
  // console.log(forecastData.cod);

  let data = [];
  forecastData.list.slice(0, 8).map((forecast) => {
    let temp = Math.floor(forecast.main.temp);
    let time = forecast.dt_txt.slice(11, 16);
    return data.push({ time: time, temp: temp });
  });
  // console.log(data);

  const timezone = weatherData.timezone;
  const sunrise = weatherData.sys.sunrise;
  const suntset = weatherData.sys.sunset;

  let sunriseTime = moment
    .utc(sunrise, "X")
    .add(timezone, "seconds")
    .format("HH:mm ");
  // console.log(sunriseTime);
  let sunsetTime = moment
    .utc(suntset, "X")
    .add(timezone, "second")
    .format("HH:mm ");
  // console.log(sunsetTime);

  const [monthname, setMonthnam] = useState("");
  const [monthname_two, setMonthnam_two] = useState("");
  const month = parseInt(forecastData.list[9].dt_txt.slice(5, 7), 10);
  const month_two = parseInt(forecastData.list[18].dt_txt.slice(5, 7), 10);
  // console.log(month);

  useEffect(() => {
    switch (month) {
      case 1:
        setMonthnam("January");

        break;
      case 2:
        setMonthnam("February");

        break;
      case 3:
        setMonthnam("March");

        break;
      case 4:
        setMonthnam("April");

        break;
      case 5:
        setMonthnam("May");

        break;
      case 6:
        setMonthnam("June");

        break;
      case 7:
        setMonthnam("July");

        break;
      case 8:
        setMonthnam("August");

        break;
      case 9:
        setMonthnam("September");

        break;
      case 10:
        setMonthnam("October");

        break;
      case 11:
        setMonthnam("November");

        break;
      case 12:
        setMonthnam("December");
    }

    switch (month_two) {
      case 1:
        setMonthnam_two("January");
        break;
      case 2:
        setMonthnam_two("February");
        break;
      case 3:
        setMonthnam_two("March");
        break;
      case 4:
        setMonthnam_two("April");
        break;
      case 5:
        setMonthnam_two("May");
        break;
      case 6:
        setMonthnam_two("June");
        break;
      case 7:
        setMonthnam_two("July");
        break;
      case 8:
        setMonthnam_two("August");
        break;
      case 9:
        setMonthnam_two("September");
        break;
      case 10:
        setMonthnam_two("October");
        break;
      case 11:
        setMonthnam_two("November");
        break;
      case 12:
        setMonthnam_two("December");
    }
  }, [monthname_two]);

  return (
    <motion.div
    initial={{opacity:0, x:200}}
    animate={{opacity:1,x:0}}
    transition={{delay:0.3,type:"linear"}}
    className="general-report-conatianer">
      <div className="general-report-wrapper">
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,type:"linear"}}
        className="widget-header-container">
          <div className="location-details">
            <p className="location-value">{weatherData.city}.</p>
            <p className="location-weather">{weatherData.name}</p>
          </div>
          <p className="location-temp">{Math.floor(weatherData.main.temp)}°c</p>
        </motion.div>
        <LineChart
          className="chart"
          width={330}
          height={150}
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            dot={false}
            strokeWidth="4px"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={true}
            wrapperStyle={{ outline: "none" }}
          />
          <XAxis
            dataKey="time"
            interval={1}
            dx={10}
            mirror={true}
            style={{ fontSize: "10px" }}
            axisLine={false}
          />
        </LineChart>
        <p className="chart-label">Temperature for next 24hrs in ℃</p>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.6,type:"linear"}}
        className="sun-stat">
          <div className="sun-stat-ele">
            <h4>Sunrise Time</h4>
            <p>{sunriseTime}</p>
          </div>
          <div className="sun-stat-ele">
            <h4>Sunset Time</h4>
            <p>{sunsetTime}</p>
          </div>
        </motion.div>
        <div className="forecast-next-day">
          <p className="prediction-title">Weather Forecast.</p>
          <div className="prediction">
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.8,type:"linear"}}
            className="prediction-ele">
              <p className="predict-day">
                {monthname} {`${forecastData.list[9].dt_txt.slice(8, 10)}`}
              </p>
              <div className="predict-main">
                <p className="predict-weather">{`${forecastData.list[9].weather[0].main}`}</p>
                <p>{`${Math.floor(forecastData.list[9].main.temp_max)}`}/{`${Math.floor(forecastData.list[9].main.temp_min)}`}</p>
              </div>
            </motion.div>
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1,type:"linear"}}
            className="prediction-ele">
              <p className="predict-day">
                {monthname_two} {`${forecastData.list[18].dt_txt.slice(8, 10)}`}
              </p>
              <div className="predict-main">
                <p className="predict-weather">{`${forecastData.list[18].weather[0].main}`}</p>
                <p>{`${Math.floor(forecastData.list[18].main.temp_max)}`}/{`${Math.floor(forecastData.list[18].main.temp_min)}`}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
