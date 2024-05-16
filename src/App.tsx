import React from 'react';
import './App.css';
import Form from './components/Form';
import StepsList from './components/StepsList';
import { StepsData } from './types';

function App() {
  const [steps, setSteps] = React.useState<StepsData[]>([]);
  const [form, setForm] = React.useState<StepsData>({
    id: (Math.random() * 1000000).toFixed(0),
    date: '',
    length: '',
  });

  return (
    <div className="App">
      <div className="content">
        <Form form={form} setForm={setForm} setSteps={setSteps} />
        <StepsList steps={steps} setSteps={setSteps} setForm={setForm} />
      </div>
    </div>
  );
}

export default App;
