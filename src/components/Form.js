import React from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContexto } from "../hooks/useContexto";

const Form = () => {

  const {fetching, inputs, setInputs, defaultInput} = useContexto()

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleDateP = (date) => {
        setInputs({
      ...inputs,
      date
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(inputs.id){
      await axios.put("https://crud-mern-ontiveros.herokuapp.com/api/notes/" + inputs.id, inputs)
    }else{
      await axios.post("https://crud-mern-ontiveros.herokuapp.com/api/notes/", inputs)
    }
    setInputs(defaultInput)
    fetching()

  }

  return (
    <>
      <form className="card card-body t" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título de tu tarea</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            required
            className="form-control mb-3"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            value={inputs.description}
            required
            className="form-control mb-3"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Autor</label>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={inputs.author}
            required
            className="form-control mb-3"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha a realizar la tarea</label>
          <DatePicker
            className="form-control mb-3"
            selected={inputs.date}
            onChange={handleDateP}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Guardar
        </button>
      </form>
    </>
  );
};

export default Form;
