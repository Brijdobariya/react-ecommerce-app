import { useState } from "react";
import { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColorPicker, Form, Input, Select, Slider, Upload } from "antd";
import { IoAddSharp } from "react-icons/io5";

import CButton from "../../components/Custom/CButton";
import { toast } from "react-toastify";

const { TextArea } = Input;

type FieldType = {
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  image?: string;
  color?: string[];
  newColor?: string;
  size?: Array<number>;
  newSize?: string;
  rating?: number;
  stock?: number;
};

console.log("outside");

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [productData, setProductData] = useState<any>([]);
  const [value, setValues] = useState<FieldType>({
    color: [], // Initialize color as an empty array
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setProductData({ ...values, color: value.color }); // it can be done like this also add color array using this values and spread operator
    setValues(values);
    // console.log("Success:", values);
    toast.success("Product added...");
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    toast.error("Error while adding product");
  };

  const handleChangeColor = (e: any) => {
    setValues((prevData) => ({
      ...prevData,
      newColor: e.target.value,
    }));
  };

  const handleAddColor = () => {
    if (value.newColor) {
      setValues((prev: any) => ({
        ...prev,
        color: [...prev.color!, prev.newColor],
        newColor: "",
      }));
    }
  };
  console.log("indide sunction", value.color);
  console.log(productData);

  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center mx-auto ">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 className="text-3xl font-bold m-5 text-center ">
            Product Details
          </h1>
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input Product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input  Product price!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please input Product category!" },
            ]}
          >
            <Select>
              <Select.Option value="Mobile">Mobile</Select.Option>
              <Select.Option value="Cloths">Cloths</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Headphone">Headphone</Select.Option>
              <Select.Option value="Watch">Watch</Select.Option>
              <Select.Option value="Toys">Toys</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input Product description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Image"
            valuePropName="fileList"
            name="image"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please input Product image!" }]}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please input Product stock!" }]}
          >
            <Slider />
          </Form.Item>
          <Form.Item<FieldType>
            label="ColorPicker"
            name="color"
            rules={[
              { required: false, message: "Please input Product color!" },
            ]}
          >
            {/* if you use the ant design colorpicker you cant take an action on this and store that color ina array */}
            {/* <ColorPicker value={values.newColor} onChange={handleChangeColor} /> */}
            {/* but you can use this default colorpincker input you can stores the color in to the arrays */}
            <input
              type="color"
              value={value.newColor}
              onChange={handleChangeColor}
            />
            <IoAddSharp onClick={handleAddColor} size={25} />
            <div className="flex flex-row gap-3 ">
              {value.color?.map((color) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
              ))}
            </div>
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
