import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from "../../context/AuthContext";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LogIn: React.FC = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  }); 

  const { login } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFinish = async () => {
console.log(formData)

    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display an error message to the user)
    }
  };
  
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='w-[40%]'
           // Submit directly to the handleSubmit function
        >
          <Form.Item label="Username"  rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input  name="username" onChange={handleChange} value={formData.username} />
          </Form.Item>

          <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password name="password" onChange={handleChange} value={formData.password} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LogIn;
