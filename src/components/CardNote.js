import React from "react";
import axios from 'axios'
import {format, register} from 'timeago.js'
import { useContexto } from "../hooks/useContexto";


const CardNote = ({dato}) => {

  const {fetching, setInputs} = useContexto()

  register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index]);

  const timeago = timestamp => format(timestamp, 'es_ES');

  const borrar = async (id) => {
    await axios.delete("https://crud-mern-ontiveros.herokuapp.com/api/notes/" + id)
    fetching()
  }

  const actualizar = async (id) => {
    const oneNote = await axios("https://crud-mern-ontiveros.herokuapp.com/api/notes/" + id)
    let {title, description, author, _id, date} = oneNote.data
    let dateTransform = new Date(date)
    setInputs({title, description, author, id: _id, date: dateTransform})    
  }

  return (
    <>
      <div className="card mt-4 animate__animated animate__fadeInUp">
        <div className="card-header">
          <h4>{dato.title}</h4>
          <span>
            <small>Creada </small>
            {timeago(dato.createdAt)}
          </span>
        </div>
        <div className="card-body reordenar">
          <div>
            <small>
              <b>Descripción</b>
            </small>
            <p>{dato.description}</p>
          </div>
          <hr />
          <div>
            <small>
              <b>Tarea escrita por:</b>
            </small>
            <p>{dato.author}</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <button className="btn btn-danger" onClick={() => borrar(dato._id)}>
              Borrar
            </button>
          </div>
          <div className="text-center">
            <div>
              <small>Realizar </small>
              {timeago(dato.date)}
            </div>
            <div>{new Date(dato.date).toLocaleDateString()}</div>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => actualizar(dato._id)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNote;
