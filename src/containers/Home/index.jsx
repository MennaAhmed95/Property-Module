import { Menu, Layout } from "antd";
import "./../../App.css";
import SliderBody from "../../components/SliderBody";
import MyCard from "../../components/MyCard";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { Header, Footer, Content, Sider } = Layout;
  const [properties, setProperties] = useState([]);
  const [addedDate, setDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [locality, setLocality] = useState(null);

  let limit = 10;
  let from, to, url;
  const handleDate = (itm) => {
    if (itm !== "All") {
      setDate(itm);
      loadProperty(itm, price, bedrooms, locality);
    } else {
      setDate("");
      loadProperty(null, price, bedrooms, locality);
    }

    console.log(itm);
  };
  const handlePrice = (itm) => {
    if (itm !== "All") {
      setPrice(itm);
      loadProperty(addedDate, itm, bedrooms, locality);
    } else {
      setPrice("");
      loadProperty(addedDate, null, bedrooms, locality);
    }

    console.log(from, "ii", to);
  };
  const handleBeds = (itm) => {
    if (itm !== "All") {
      setBedrooms(itm);
      loadProperty(addedDate, price, itm, locality);
    } else {
      setBedrooms(null);
      loadProperty(addedDate, price, null, locality);
    }
    console.log(itm);
  };
  function handleChange(value) {
    setLocality(value);
    loadProperty(addedDate, price, bedrooms, value);
  }

  const baseURL = "http://localhost:8000/Properties?_start=0&_limit=";

  const loadProperty = (addedDate, price, bedrooms, locality) => {
    url = `${baseURL}${limit}`;
    if (price) {
      let priceRn = price.split("-");
      from = priceRn[0];
      to = priceRn[1];
      url = `${url}&price_gte=${from}&price_lte=${to}`;
    }
    if (addedDate) {
      url = `${url}&addedDate=${addedDate}`;
    }
    if (bedrooms) {
      url = `${url}&bedrooms=${bedrooms}`;
    }
    if (locality) {
      (locality.includes(",") ? locality.split(",") : [...locality]).map(
        (itm) => (url = `${url}&locality=${itm}`)
      );
    }
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        console.log(data);
      });
    debugger;
    limit += 5;
  };

  const handleScroll = (e) => {
    let isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;
    debugger;
    if (isAtBottom && limit <= 30) {
      loadProperty(addedDate, price, bedrooms, locality);
    }
  };

  useEffect(() => {
    loadProperty(addedDate, price, bedrooms, locality);
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <Header className="header" style={{ width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Home</Menu.Item>
          <Link to="/addForm">
            <Menu.Item key="2">Add property</Menu.Item>
          </Link>
        </Menu>
      </Header>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content>
          <Layout className="site-layout-background">
            <Sider className="sliderStyle">
              <SliderBody
                handleDate={handleDate}
                handlePrice={handlePrice}
                handleBeds={handleBeds}
                handleChange={handleChange}
              />
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
