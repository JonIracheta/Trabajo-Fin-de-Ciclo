import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Tarjeta({
  id,
  titulo,
  tipo,
  horasEstimadas,
  columna,
  moverTarjeta,
  cerrarTarea,
}) {
  return (
    <Card key={id} className="mb-3">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>Tipo: {tipo}</Card.Text>
        <Card.Text>Horas estimadas: {horasEstimadas}</Card.Text>
        {columna === "resolved" ? (
          <Button variant="success" onClick={() => cerrarTarea(id)}>
            Cerrar tarea
          </Button>
        ) : (
          <Button variant="primary" onClick={() => moverTarjeta(id)} style={{ backgroundColor: "#5d6388"}}>
            Mover
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

function PanelKanban() {
  const [columnas, setColumnas] = useState({
    new: [],
    active: [],
    resolved: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [horasEstimadas, setHorasEstimadas] = useState("");

  const añadirTarjeta = async () => {
    try {
      const response = await axios.post('http://localhost:5022/api/tareas/agregar', {
        nombreTarea: titulo,
        tipoTarea: tipo,
        horasEstimadas: parseInt(horasEstimadas), // Asegurarse de que sea un número
        porHacer: true, // Puedes ajustar esto según tus necesidades
      });

      if (response.status === 200) {
        const newCard = (
          <Tarjeta
            key={columnas.new.length}
            id={columnas.new.length}
            titulo={titulo}
            tipo={tipo}
            horasEstimadas={horasEstimadas}
            columna="new"
            moverTarjeta={moveCard}
            cerrarTarea={cerrarTarea}
          />
        );
        setColumnas((prevColumns) => ({
          ...prevColumns,
          new: [...prevColumns.new, newCard],
        }));
        setShowModal(false);
        setTitulo("");
        setTipo("");
        setHorasEstimadas("");
      } else {
        // Manejar errores según tus necesidades
        console.error('Error al agregar tarea:', response.statusText);
      }
    } catch (error) {
      // Manejar errores según tus necesidades
      console.error('Error al agregar tarea:', error);
    }
  }

  const moveCard = (cardId) => {
    setColumnas((prevState) => {
      const updatedColumns = { ...prevState };
      const currentColumn = Object.keys(updatedColumns).find((column) =>
        updatedColumns[column].some((card) => card.id === cardId)
      );
      const nextColumn = getNextColumn(currentColumn);

      const cardToMove = updatedColumns[currentColumn].find(
        (card) => card.id === cardId
      );
      updatedColumns[currentColumn] = updatedColumns[currentColumn].filter(
        (card) => card.id !== cardId
      );
      updatedColumns[nextColumn] = [...updatedColumns[nextColumn], cardToMove];

      return updatedColumns;
    });
  };

  const getNextColumn = (currentColumn) => {
    const columnOrder = ["new", "active", "resolved"];
    const currentIndex = columnOrder.indexOf(currentColumn);
    return currentIndex < columnOrder.length - 1
      ? columnOrder[currentIndex + 1]
      : currentColumn;
  };

  const cerrarTarea = (cardId) => {
    const updatedColumns = { ...columnas };
    const currentColumn = Object.keys(updatedColumns).find((column) =>
      updatedColumns[column].some((card) => card.props.id === cardId)
    );

    updatedColumns[currentColumn] = updatedColumns[currentColumn].filter(
      (card) => card.props.id !== cardId
    );

    setColumnas(updatedColumns);
  };

  return (
    <Container
      style={{
        minHeight: "calc(100vh - 60px)",
        marginTop: "60px",
        marginBottom: "60px",
        backgroundColor: "white",
      }}
    >
      <Row>
        <Col
          className="border border-dark p-3"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <h5>New</h5>
          <hr style={{ borderTop: "2px solid black" }} />
          {columnas.new.map((card) => (
            <Tarjeta
              key={card.id}
              id={card.id}
              titulo={card.titulo}
              tipo={card.tipo}
              horasEstimadas={card.horasEstimadas}
              columna="new"
              moverTarjeta={moveCard}
              cerrarTarea={cerrarTarea}
            />
          ))}
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="mt-3"
            style={{ backgroundColor: "#1d2646" }}
          >
            Añadir tarea
          </Button>
        </Col>
        <Col
          className="border border-dark p-3"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <h5>Active</h5>
          <hr style={{ borderTop: "2px solid black" }} />
          {columnas.active.map(card => (
            <Tarjeta
              key={card.id}
              id={card.id}
              titulo={card.titulo}
              tipo={card.tipo}
              horasEstimadas={card.horasEstimadas}
              columna="active"
              moverTarjeta={moveCard}
              cerrarTarea={cerrarTarea}
            />
          ))}
        </Col>
        <Col
          className="border border-dark p-3"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <h5>Resolved</h5>
          <hr style={{ borderTop: "2px solid black" }} />
          {columnas.resolved.map(card => (
            <Tarjeta
              key={card.id}
              id={card.id}
              titulo={card.titulo}
              tipo={card.tipo}
              horasEstimadas={card.horasEstimadas}
              columna="resolved"
              cerrarTarea={cerrarTarea}
            />
          ))}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="horasEstimadas">
              <Form.Label>Horas estimadas</Form.Label>
              <Form.Control
                type="text"
                value={horasEstimadas}
                onChange={(e) => setHorasEstimadas(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={añadirTarjeta}
            style={{ backgroundColor: "#1d2646" }}
          >
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PanelKanban;
