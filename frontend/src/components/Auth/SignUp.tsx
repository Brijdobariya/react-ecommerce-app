import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';

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



const SignUp:React.FC = () => {
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
    >


    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
      >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
      >
      <Input type='email' />
      
    </Form.Item>  
    <Form.Item<FieldType>
      label="mobile no"
      name="phone"
      rules={[{ required: true, message: 'Please input your password!' }]}
      >
      <Input type='number' />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
      >
      <Input.Password />
    </Form.Item>

   

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        SignIn
      </Button>
    </Form.Item>
  </Form>  
      </div>
    </>
  );
};

export default SignUp;
