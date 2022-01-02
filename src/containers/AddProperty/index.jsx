import { Menu, Layout, InputNumber } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const AddPropertyForm = () => {
  const history = useNavigate();
  const { Header } = Layout;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const addPropertyAsync = (value) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    };
    fetch("http://localhost:8000/Properties", requestOptions)
      .then((response) => response.json())
      .then((data) => history(`/propertyDetail/${value?.id}`));
  };

  const onFinish = (values) => {
    let val = {
      ...values,
      images: values.images.fileList.fill(
        "https://www.onceuponapicture.co.uk/wp-content/uploads/2019/02/46456227_2504829799542273_7554593422053474304_o-700x525.jpg"
      ),
      carpetArea: values.carpetArea + " sqmt",
      views: 0,
      favorite: "false",
      addedDate: "This week",
      id: uuidv4(),
    };
    console.log("onfinish");
    if (val.name) addPropertyAsync(val);
  };

  return (
    <>
      <Layout style={{ height: "150vh" }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Link to="/">
              <Menu.Item key="1">Home</Menu.Item>
            </Link>
            <Menu.Item key="2">Add property</Menu.Item>
          </Menu>
        </Header>
        <div className="app">
          <Form
            form={form}
            name="horizontal_login"
            onFinish={onFinish}
            style={{ maxWidth: "60%" }}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your property name!" },
              ]}
            >
              <Input placeholder="property name" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input your Description" },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="images"
              label="Upload your Imgs"
              rules={[{ required: true, message: "Please upload Img" }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item
              name="locality"
              rules={[
                { required: true, message: "Please input your locality!" },
              ]}
            >
              <Input placeholder="Locality" />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your Price",
                },
              ]}
            >
              <InputNumber
                addonAfter={<span>$</span>}
                style={{ width: "100%" }}
                placeholder="Price"
              />
            </Form.Item>
            <Form.Item
              name="bedrooms"
              rules={[
                {
                  required: true,
                  message: "Please input your bedrooms no",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Bedrooms No"
              />
            </Form.Item>
            <Form.Item
              name="bath"
              rules={[
                {
                  required: true,
                  message: "Please input your bath no",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Bath No" />
            </Form.Item>
            <Form.Item
              name="carpetArea"
              rules={[
                {
                  required: true,
                  message: "Please input your carpet area",
                },
              ]}
            >
              <InputNumber
                addonAfter="Sq Mt"
                style={{ width: "100%" }}
                placeholder="Carpet Area"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit">
                  Add Property
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default AddPropertyForm;
