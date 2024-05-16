import React from 'react';
import { StepsData } from '../types';

type FormProps = {
  form: StepsData,
  setForm: React.Dispatch<React.SetStateAction<StepsData>>,
  setSteps: React.Dispatch<React.SetStateAction<StepsData[]>>,
}

function Form({ form, setForm, setSteps }: FormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // прерываем выполнение функции, если нет даты или пройденного расстояния
    if (!form.date || !form.length) {
      return;
    }

    setSteps(prevState => {
      // проверяем, есть ли такая дата
      if (prevState.some((step) => step.date === form.date)) {
        // проверяем, есть ли такая дата с таким идентификатором
        if (prevState.some((step) => step.id === form.id)) {
          // если да, то обновляем запись
          return prevState.map((step) => step.date === form.date ? form : step);
        } else {
          // если нет, то добавляем к записи с такой датой значение пройденного растояния из формы
          return prevState.map((step) => step.date === form.date
            ? { ...step, length: `${+step.length + +form.length}` }
            : step);
        }
      }

      // если нет такой даты, то добавляем новую запись
      return [...prevState, form];
    });

    setForm({
      id: (Math.random() * 1000).toFixed(0),
      date: '',
      length: '',
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
        <input
          className="form-input"
          type="text"
          name="date"
          id="date"
          value={form.date}
          onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="length">Пройдено км</label>
        <input
          className="form-input"
          type="text"
          name="length"
          id="length"
          value={form.length}
          onChange={handleChange} />
      </div>
      <div className="form-group btn-group">
        <button className="btn-submit" type="submit">OK</button>
      </div>
    </form>
  );
}

export default Form;