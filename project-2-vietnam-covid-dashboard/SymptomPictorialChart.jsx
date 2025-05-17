import React from 'react';
import { createSymptomPictorialChart } from '../../apis/graph/pictorial';
import { useChart } from '../hooks/UseChart';

const SymptomPictorialChart = () => {
  useChart(createSymptomPictorialChart, 'SymptomPictorial');

  return (
    <div
      id="SymptomPictorial"
      className="w-100"
      style={{
        height: '25rem',
      }}
    />
  );
};

export default SymptomPictorialChart;