import './calendario.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import esLocale from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button } from 'react-bootstrap';

const locales = {
  "es-ES": esLocale
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});



const CalendarioComponent = () => {
  const [todosLosEventos, setTodosLosEventos] = useState([    
  ]);
  
  const [nuevoEvento, setNuevoEvento] = useState({titulo: "", fechaInicio: new Date(), fechaFin: new Date()});

  const [showModal, setShowModal] = useState(false);

  function manejarAñadirEvento() {
    setTodosLosEventos([...todosLosEventos, nuevoEvento]);
    setNuevoEvento({titulo: "", fechaInicio: new Date(), fechaFin: new Date()});
    setShowModal(false);
  }

  return (
    <div className="calendario-container">      
      <button className="botonAñadirEvento" style={{marginTop: "10px"}} onClick={() => setShowModal(true)}>Añadir evento</button>
      <Calendar
        className="calendar"
        localizer={localizer}
        events={todosLosEventos}
        startAccessor={(event) => new Date(event.fechaInicio)}
        endAccessor={(event) => new Date(event.fechaFin)}
        views={['month', 'week', 'day', 'agenda']}
        showMultiDayTimes
        titleAccessor="titulo"
        eventPropGetter={() => {
          return {
            className: 'evento',
            style: {          
            }
          };
        }}
      />  


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton >
          <Modal.Title>Añadir evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder='Añadir título' style={{width: "100%", marginBottom: "10px"}}
            value={nuevoEvento.titulo} onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
          />
          <DatePicker
            placeholderText="Fecha inicio" style={{marginRight: "10px", zIndex: 1000, backgroundColor: "white"}}
            selected={nuevoEvento.fechaInicio} onChange={(fechaInicio) => setNuevoEvento({...nuevoEvento, fechaInicio})}
          />
          <DatePicker
            placeholderText="Fecha fin" style={{backgroundColor: "white", zIndex: 1000}}
            selected={nuevoEvento.fechaFin} onChange={(fechaFin) => setNuevoEvento({...nuevoEvento, fechaFin})}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={manejarAñadirEvento}>
            Añadir evento
          </Button>
        </Modal.Footer>
      </Modal>    
    </div>
  );
};

export default CalendarioComponent;
