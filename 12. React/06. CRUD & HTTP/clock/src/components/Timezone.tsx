import React from 'react';
import TimezoneProps from '../models/models';

const Timezone: React.FC<TimezoneProps> = ({ timezones }) => {
  return (
    <>
      {timezones.map((timezone: string) => (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      ))}
    </>
  );
};

export default Timezone;
