import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

export const EscritorioPage = () => {
  useHideMenu(false);
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const salir = () => {
    localStorage.clear();
    navigate('/ingresar', { replace: true });
  };
  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
      setTicket(ticket);
    });
  };
  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to="/ingresar" />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket numero: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col offset={18} span={6} align="right">
          <Button shape="round" type="primary" onClick={siguienteTicket}>
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
