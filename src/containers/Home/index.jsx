import { Menu, Layout } from "antd";
import "./../../App.css";
import SliderBody from "../../components/SliderBody";
import MyCard from "../../components/MyCard";
import { useState, useEffect } from "react";

const Home = () => {
  const { Header, Footer, Content, Sider } = Layout;
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/Properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        console.log(data);
      });
  }, []);
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
            <Sider
              style={{
                height: "100vh",
                position: "fixed",
                left: 0,
                top: "64px",
                backgroundColor: "white",
              }}
            >
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
