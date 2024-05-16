import React, { MouseEventHandler } from 'react';
import { StepsData } from '../types';

type StepsListProps = {
  steps: StepsData[],
  setSteps: React.Dispatch<React.SetStateAction<StepsData[]>>,
  setForm: React.Dispatch<React.SetStateAction<StepsData>>,
}

function StepsList({ steps = [], setSteps, setForm }: StepsListProps) {
  const handleDelete: MouseEventHandler<HTMLDivElement> = (e) => {
    setSteps(steps.filter((step) => step.id !== e.currentTarget.id));
  }

  const handleEdit: MouseEventHandler<HTMLDivElement> = (e) => {
    setForm(steps.filter((step) => step.id === e.currentTarget.id)[0]);
  }

  return (
    <div className="steps-list">
      <div className="steps-list-header">
        <div>Дата (ДД.ММ.ГГГГ)</div>
        <div>Пройдено км</div>
        <div>Действия</div>
      </div>
      <div className="steps-list-body">
        {steps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((step) => (
          <div className="steps-list-item" key={step.id}>
            <div>{step.date}</div>
            <div>{step.length}</div>
            <div className="steps-list-actions">
              <div onClick={handleEdit} id={step.id}>&#9998;</div>
              <div onClick={handleDelete} id={step.id}>&#10008;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepsList;
