import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';

const { Title, Text } = Typography;

// const data = [
//   {
//     ticketNo: 33,
//     escritorio: 3,
//     agente: 'Fernando Herrera',
//   },
//   {
//     ticketNo: 34,
//     escritorio: 4,
//     agente: 'Melissa Flores',
//   },
//   {
//     ticketNo: 35,
//     escritorio: 5,
//     agente: 'Carlos Castro',
//   },
//   {
//     ticketNo: 36,
//     escritorio: 3,
//     agente: 'Fernando Herrera',
//   },
//   {
//     ticketNo: 37,
//     escritorio: 3,
//     agente: 'Fernando Herrera',
//   },
//   {
//     ticketNo: 38,
//     escritorio: 2,
//     agente: 'Melissa Flores',
//   },
//   {
//     ticketNo: 39,
//     escritorio: 5,
//     agente: 'Carlos Castro',
//   },
// ];

export const ColaPage = () => {
  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    socket.on('ticket-asignado', (asignados) => {
      setTickets(asignados);
    });

    return () => {
      socket.off('ticket-asignado');
    };
  }, [socket]);

  useEffect(() => {
    getUltimos().then((tickets) => setTickets(tickets));
  }, []);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(ticket) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{ticket.agente}</Tag>,
                    <Tag color="volcano">Escritorio: {ticket.escritorio}</Tag>,
                  ]}
                >
                  <Title>No. {ticket.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(ticket) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${ticket.numero}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio</Text>
                      <Tag color="magenta">{ticket.numero}</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="magenta">{ticket.agente}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
