import React from "react";
import { useStore } from 'use-store'
 
export default function AvgTemp() {
  let [ avgTemp, setAvgTemp ] = useStore('avgTemp', [])

  const sum = avgTemp.reduce((a, b) => a + b, 0);
  const avg = (sum / avgTemp.length) || 0;

  return (
      <p>Avg Temp : {avg}</p>
  )
}

