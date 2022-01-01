import "./../../App.css";
import { Menu, Layout } from "antd";
import React from "react";
import DetailsThumb from "../../components/DetailsThumb";

const { Header } = Layout;
class ProdertyDetailsPage extends React.Component {
  state = {
    property: [],
    index: 0,
  };

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount() {
    fetch(`http://localhost:8000/Properties?id=1`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          property: data,
        });
        const { index } = this.state;
        this.myRef.current.children[index].className = "active";
      });
  }

  render() {
    const { property, index } = this.state;
    return (
      <Layout style={{ height: "100vh" }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Add property</Menu.Item>
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
                <p>
                  <span>{item?.bedrooms} bed</span>
                  <span>{item?.bath} bath</span>
                  <span>{item?.carpetArea}</span>
                </p>

                <DetailsThumb
                  images={item.images}
                  tab={this.handleTab}
                  myRef={this.myRef}
                />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export default ProdertyDetailsPage;
