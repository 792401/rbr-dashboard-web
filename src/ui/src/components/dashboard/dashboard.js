import React, { useState, useEffect } from "react";

export default function RacingDashboard(props) {
    const [rpm, setRpm] = useState(0);
    const [speed, setSpeed] = useState(0);
  
    useEffect(() => {
      // Set up an interval to update the RPM and Speed values every 10 milliseconds
      const interval = setInterval(() => {
        // Increment the RPM value by 10 and reset it to 0 if it reaches 7000
        if (rpm >= 7000) {
          setRpm(0);
        } else {
          setRpm(rpm + 100);
        }
  
        // Increment the Speed value by 1 and reset it to 0 if it reaches 250
        if (speed >= 250) {
          setSpeed(0);
        } else {
          setSpeed(speed + 10);
        }
      }, 1);
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(interval);
    }, [rpm, speed]);
  
    return (
      <div>
        <p>RPM: {rpm}</p>
        <p>Speed: {speed}</p>
      </div>
    );
  }