import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ColorPicker, Form, Input, Select, Slider, Upload } from "antd";

import CButton from "../../components/Custom/CButton";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ProductAdd: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    color: "",
    stock: "",
  });
  const [color, setColor] = useState<string>("#000000");
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center mx-auto ">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <h1 className="text-3xl font-bold m-5 text-center ">
            Product Details
          </h1>
          <Form.Item label="Title">
            <Input />
          </Form.Item>
          <Form.Item label="Price">
            <Input />
          </Form.Item>
          <Form.Item label="Category">
            <Select>
              <Select.Option value="Mobile">Mobile</Select.Option>
              <Select.Option value="Cloths">Cloths</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Headphone">Headphone</Select.Option>
              <Select.Option value="Watch">Watch</Select.Option>
              <Select.Option value="Toys">Toys</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Stock">
            <Slider />
          </Form.Item>
          <Form.Item label="ColorPicker">
            <ColorPicker />
          </Form.Item>
          <Form.Item label="" className="items-center justify-center flex-1 ">
            <CButton className="bg-zinc-950 hover:bg-zinc-700 text-white">
              Add Product
            </CButton>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProductAdd;
