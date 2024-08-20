import React from 'react';
import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const Test: React.FC = () => {
  const [value, setValue] = React.useState('');

  console.log('Value:', value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Handling Change, Event Value:', event.target.value);
    setValue(event.target.value);
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose an option</FormLabel>
        <RadioGroup
          aria-label="options"
          name="options"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default Test;
