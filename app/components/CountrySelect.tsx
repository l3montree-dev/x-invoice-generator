import React from 'react';
import { Select } from 'antd';
import Countries from '../lib/x-invoice/constants';

const style = { width: '100%' };
const CountrySelect = () => {
  return (
    <Select
      showSearch
      style={style}
      placeholder="Land auswählen"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {Object.entries(Countries).map(([value, readableName]) => (
        <Select.Option key={value} value={value}>
          {readableName}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CountrySelect;
