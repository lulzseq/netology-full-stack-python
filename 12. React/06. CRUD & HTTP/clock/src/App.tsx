import moment from 'moment-timezone';

import { useEffect, useState } from 'react';
import Clock from './components/Clock';
import ClockName from './components/ClockName';
import Timezones from './components/Timezones';
import Timezone from './components/Timezone';
import timezones from './data/timezones.json';

import './App.css';

export default function App() {
  const defaultTimezone = moment.tz(moment.tz.guess()).format('Z');

  const [clockName, setClockName] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState(defaultTimezone);
  const [clocks, setClocks] = useState([]);

  useEffect(() => {
    const intervals = {};

    clocks.forEach(clock => {
      intervals[clock.clockName] = setInterval(() => {
        const currentTime = moment().utcOffset(clock.timezone).format('HH:mm:ss');
        updateClockTime(clock.clockName, currentTime);
      }, 1000);
    });

    return () => {
      Object.values(intervals).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, [clocks]);

  const updateClockTime = (clockName, currentTime) => {
    setClocks(prevClocks =>
      prevClocks.map(clock => (clock.clockName === clockName ? { ...clock, currentTime } : clock))
    );
  };

  const onClockNameChange = e => {
    setClockName(e.target.value);
  };

  const onChangeTimezone = e => {
    setSelectedTimezone(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newClock = {
      clockName,
      timezone: selectedTimezone,
      currentTime: moment().utcOffset(selectedTimezone).format('HH:mm:ss')
    };

    setClocks([...clocks, newClock]);
    setClockName('');
  };

  const handleRemoveClock = clockName => {
    setClocks(prevClocks => prevClocks.filter(clock => clock.clockName !== clockName));
  };

  return (
    <>
      <div className='add-new-clock'>
        <form className="form-row" onSubmit={onSubmit}>
          <ClockName value={clockName} onChange={onClockNameChange} />
          <Timezones selectedTimezone={selectedTimezone} onChange={onChangeTimezone}>
            <Timezone timezones={timezones} />
          </Timezones>
          <button className='button-add-new-clock' type="submit">Add</button>
        </form>
      </div>
      {clocks.map((clock, index) => (
        <Clock
          key={index}
          clockName={clock.clockName}
          currentTime={clock.currentTime}
          onRemove={() => handleRemoveClock(clock.clockName)}
        />
      ))}
    </>
  );
}
