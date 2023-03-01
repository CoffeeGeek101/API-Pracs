import React from "react";
import {Line, LineChart, Tooltip} from "recharts";
import "./report.css";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "8px",
          borderRadius: "20px",
          boxShadow:'1px 2px 10px -2px #979797'
        }}
      >
        <p
          className="label"
          style={{ borderStyle: "solid 1px ", fontSize: "13px", fontWeight: "600" }}
        >{`${label} : ${payload.value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Report({ weatherData, forecastData }) {
    console.log(weatherData.city);
    console.log(forecastData.cod);

    let data = [];
    forecastData.list.slice(0,8).map((forecast)=>{
        return data.push(Math.floor(forecast.main.temp));
    });
    console.log(data);

  return (
    <div className="general-report-conatianer">
      <div className="general-report-wrapper">
        <div className="widget-header-container">
          <div className="location-details">
            <p className="location-value">{weatherData.city}.</p>
            <p className="location-weather">{weatherData.name}</p>
          </div>
          <p className="location-temp">{Math.floor(weatherData.main.temp)}°c</p>
        </div>
        <LineChart
        className="chart"
          width={250}
          height={150}
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            dot={false}
            strokeWidth="4px"
          />
          <Tooltip content={<CustomTooltip />} cursor={true} wrapperStyle={{outline:'none'}}/>
        </LineChart>
        <p className="chart-label">Temperature for next 24hrs</p>
        <div className="sun-stat">
            <div className="sun-stat-ele">
                <h4>Sunrise Time</h4>
                <p>5:45</p>
            </div>
            <div className="sun-stat-ele">
                <h4>Sunset Time</h4>
                <p>5:45</p>
            </div>
        </div>
        <div className="forecast-next-day">
            <p className="prediction-title">Weather Forecast.</p>
            <div className="prediction">
                <div className="prediction-ele">
                    <p className="predict-day">Feburary 25</p>
                    <div className="predict-main">
                        <p className="predict-weather">Partly Cloudy</p>
                        <p>26/18</p>
                    </div>
                </div>
                <div className="prediction-ele">
                    <p className="predict-day">Feburary 25</p>
                    <div className="predict-main">
                        <p className="predict-weather">Partly Cloudy</p>
                        <p>26/18</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
