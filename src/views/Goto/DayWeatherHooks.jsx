import React, { useState, useEffect } from 'react';
import { useStore } from 'use-store';

export default function DayWeatherHooks(props) {
  let [ avgTemp, setAvgTemp ] = useStore('avgTemp')
  // let avgTemp = 0;
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »

  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const { city } = props;

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    setLoading(true)
    setFetchErr(false)
    const weatherURL =
      `http://api.openweathermap.org/data/2.5/forecast?` +
      `appid=6ac65692ee43e6cd36a695242cc7c988` +
      `&lang=en&units=metric&q=${city}`;
    
      fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const { list } = data
        //const list = data.list
        setFetchErr(data.cod === '404')
        setLoading(false)
        setFullData(list);
        if (list.length) {
          const newAvgTemp = avgTemp.concat(list[0].main.temp)
          setAvgTemp(newAvgTemp)
        }
      });

    return function cleanup() { 
      console.log("Cleaning up");
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    fetchErr ? "Fetch error, unknown city ?" :
    loading ? "Loading..." :
    fullData.length && (<span>
          Current temperature is{" "}
          {fullData[0].main.temp}
      </span>)
  );
}
