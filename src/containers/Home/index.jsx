import { Menu, Layout } from "antd";
import "./../../App.css";
import SliderBody from "../../components/SliderBody";
import MyCard from "../../components/MyCard";
import React, { useState, useEffect } from "react";

const Home = () => {
  const { Header, Footer, Content, Sider } = Layout;
  const [properties, setProperties] = useState([]);

  let limit = 10;
  const loadProperty = () => {
    fetch(`http://localhost:8000/Properties?_start=0&_limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        console.log(data);
      });
    limit += 5;
  };

  const handleScroll = (e) => {
    console.log(e.target.documentElement.scrollTop);
    console.log(window.innerHeight);
    console.log(e.target.documentElement.scrollHeight);
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadProperty();
    }
  };

  useEffect(() => {
    loadProperty();
    window.addEventListener("scroll", handleScroll);
  }, [loadProperty, handleScroll]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Add property</Menu.Item>
        </Menu>
      </Header>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content>
          <Layout className="site-layout-background">
            <Sider className="sliderStyle">
              <SliderBody />
            </Sider>
            <div className="containContent">
              <Content className="container">
                {properties.map((itm, i) => (
                  <MyCard key={i} property={itm} />
                ))}
              </Content>
            </div>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <img src="/assets/imgs/foot.svg" alt="footer" />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
