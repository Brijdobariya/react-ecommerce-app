import { PlusOutlined } from "@ant-design/icons";
import { Form, FormProps, Input, Select, Slider, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

import { toast } from "react-toastify";
import CButton from "../../components/Custom/CButton";

const { TextArea } = Input;

type FieldType = {
  p_name?: string;
  p_price?: number;
  p_category?: string;
  p_description?: string;
  p_image?: any[]; // Changed to array of any
  p_color?: string[];
  p_newColor?: string;
  p_size?: Array<number>;
  p_newSize?: string;
  p_rating?: number;
  p_stock?: number;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList.map((file: any) => ({
    ...file,
    uid: file.uid || Math.random(),
  }));
};

const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValues] = useState<FieldType>({
    p_color: [], // Initialize color as an empty array
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { p_color, ...rest } = values;
    const data = {
      ...rest,
      p_color: p_color
        ? p_color.length > 0
          ? p_color
          : value.p_color
        : value.p_color,
    };

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    if (data.p_image && Array.isArray(data.p_image)) {
      data.p_image.forEach((file) => {
        formData.append("p_image", file.originFileObj);
      });
    }

    try {
      axios
        .post("http://localhost:3000/api/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          // Clear the form
          form.resetFields();
          setValues({ p_color: [] });
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
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    toast.error("Error while adding product");
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleColorRemove = (color: string) => {
    setValues((prevData) => ({
      ...prevData,
      p_color: prevData.p_color.filter((c) => c !== color),
    }));
  };

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

          <Form.Item
            label="Image"
            valuePropName="fileList"
            name="p_image"
            getValueFromEvent={normFile}
            rules={[
              { required: false, message: "Please input Product image!" },
            ]}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              maxCount={4}
              fileList={value.p_image}
              onChange={({ fileList }) =>
                setValues((prev) => ({ ...prev, p_image: fileList }))
              }
            >
              {value.p_image && value.p_image.length >= 4 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
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
