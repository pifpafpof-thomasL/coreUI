import React from "react";

class DayWeather extends React.Component {
  state = {
    fullData: [],
    dailyData: []
  };

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps) {
    // console.log("this.props, prevProps", prevProps, this.props);
    if (prevProps.city !== this.props.city) {
      this.fetchWeather();
    }
  }

  fetchWeather() {
    const { city } = this.props;
    const weatherURL =
      // `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=metric&APPID=6ac65692ee43e6cd36a695242cc7c988`
      //   `http://api.openweathermap.org/data/2.5/forecast?&q=Munich&units=metric&APPID=6ac65692ee43e6cd36a695242cc7c988`
      // const weatherURL =
      `http://api.openweathermap.org/data/2.5/forecast?` +
      `appid=6ac65692ee43e6cd36a695242cc7c988&lang=en&units=metric&q=${city}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData
          },
          // () => console.log(this.state)
        );
      });
  }

  render() {
    return (
      <div>
        <p>
          Current temperature is{" "}
          {this.state.dailyData.length
            ? this.state.fullData[0].main.temp
            : null}
        </p>
      </div>
    );
  }
}

export default DayWeather;
