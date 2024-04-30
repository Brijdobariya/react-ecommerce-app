
import { useEffect, useState } from "react";
import { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColorPicker, Form, Input, Select, Slider, Upload } from "antd";
import { IoAddSharp } from "react-icons/io5";
import axios from "axios";
 
import CButton from "../../components/Custom/CButton";
import { toast } from "react-toastify";
 
const { TextArea } = Input;
 
type FieldType = {
  p_name?: string;
  p_price?: number;
  p_category?: string;
  p_description?: string;
  p_image?: any[]; // Changed to array of any
  p_color?: Object[];
  p_newColor?: string;
  p_size?: Array<number>;
  p_newSize?: string;
  p_rating?: number;
  p_stock?: number;
};
 
console.log("outside");
 
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList.map((file: any) => file.originFileObj);
};
 
const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValues] = useState<FieldType>({
    p_color: [], // Initialize color as an empty array
  });
 
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setValues({ ...values, p_color: value.p_color }); // Merge values and color array
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
      p_newColor: e.target.value,
    }));
  };

  const handleAddColor = () => {
    if (value.p_newColor) {
      setValues((prev: any) => ({
        ...prev,
        p_color: [...prev.p_color!, prev.p_newColor],
        p_newColor: "",
      }));
    }
  };

  const handleColorRemove = (index) => {
    setValues((prevData) => ({
      ...prevData,
      p_color: prevData.p_color.filter((_, i) => _ !== index),
    }));
    console.log("click");
  };

  const handleSubmit = () => {
    try {
      axios
        .post("http://localhost:3000/api/product", value)
        .then((res) => {
          console.log(res.data);
          // Clear the form
          form.resetFields();
          // Handle success case
          toast.success("Product added...");
        })
        .catch((err) => {
          console.error(err);
          // Handle error case
          toast.error("Error while adding product");
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("inside function", value.p_color);
  console.log(value);
 
  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center mx-auto ">
        <Form
          form={form}
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
            name="p_name"
            rules={[{ required: true, message: "Please input Product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Price"
            name="p_price"
            rules={[
              { required: true, message: "Please input  Product price!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Category"
            name="p_category"
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
            name="p_description"
            rules={[
              { required: true, message: "Please input Product description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
 
          <Form.Item<FieldType>
            label="Image"
            valuePropName="fileList"
            name="p_image"
            getValueFromEvent={normFile}
            rules={[
              { required: false, message: "Please input Product image!" },
            ]}
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
            name="p_stock"
            rules={[{ required: true, message: "Please input Product stock!" }]}
          >
            <Slider />
          </Form.Item>
          <Form.Item<FieldType>
            label="ColorPicker"
            name="p_color"
            rules={[
              { required: false, message: "Please input Product color!" },
            ]}
          >
            <input
              type="color"
              value={value.p_newColor}
              onChange={handleChangeColor}
            />
            <IoAddSharp onClick={handleAddColor} size={25} />
            <div className="flex flex-row gap-3 ">
              {value.p_color?.map((color) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                  onClick={() => handleColorRemove(color)}
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item label="" className="items-center justify-center flex-1 ">
            <CButton
              className="bg-zinc-950 hover:bg-zinc-700 text-white"
              onClick={handleSubmit}
            >
              Add Product
            </CButton>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
 
export default ProductAdd;
 