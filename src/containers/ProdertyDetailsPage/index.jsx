import "./../../App.css";
import { Menu, Layout } from "antd";
import DetailsThumb from "../../components/DetailsThumb";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router";
const { Header } = Layout;
const ProdertyDetailsPage = () => {
  const [property, setProperty] = useState([]);
  const [index, setIndex] = useState(0);
  const myRef = useRef();
  const propertyId = useParams().id;
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  useEffect(() => {
    fetch(`http://localhost:8000/Properties?id=${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        myRef.current.children[index].className = "active";
      });
  }, []);
  return (
    <Layout style={{ height: "150vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Link to="/">
            <Menu.Item key="1">Home</Menu.Item>
          </Link>
          <Link to="/addForm">
            <Menu.Item key="2">Add property</Menu.Item>
          </Link>
        </Menu>
      </Header>
      <div className="app">
        {property.map((item) => (
          <div className="details" key={item.id}>
            <div className="big-img">
              <img src={item.images[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{item.name}</h2>
                <span>${item.price}</span>
              </div>

              <p>{item.description}</p>
              <p>Location : {item?.locality}</p>
              <p>Number of views : {item?.views}</p>
              <p>Added Date : {item?.addedDate}</p>
              <p>
                <span>{item?.bedrooms} bed</span>
                <span>{item?.bath} bath</span>
                <span>{item?.carpetArea}</span>
              </p>

              <DetailsThumb
                images={item.images}
                tab={handleTab}
                myRef={myRef}
              />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProdertyDetailsPage;
