import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

export const IngresarPage = () => {
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());
  useHideMenu(false);
  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem('agente', agente);
    localStorage.setItem('escritorio', escritorio);
    navigate('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if (usuario.agente && usuario.escritorio) {
    return <Navigate to="/escritorio" />
  }
  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: 'Porfavor ingrese su nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: 'Porfavor ingrese el numero de escritorio',
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button type="primary" shape="round" htmlType="submit">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
