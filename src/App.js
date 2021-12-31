import { Menu, Layout } from "antd";

import "./App.css";
import { Select } from "antd";

function App() {
  const { Header, Footer, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Option } = Select;

  const children = ["Lincoln", "New York", "Sola"];

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
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
              }}
            >
              <Menu mode="inline" multiple style={{ height: "100%" }}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Search by locality"
                  onChange={handleChange}
                >
                  {children.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
                <br />
                <SubMenu title="Price Range">
                  <Menu.Item key="1">10-15</Menu.Item>
                  <Menu.Item key="2">15-20</Menu.Item>
                  <Menu.Item key="3">20-25</Menu.Item>
                  <Menu.Item key="4">25-30</Menu.Item>
                </SubMenu>
                <SubMenu title="Bedrooms">
                  <Menu.Item key="5">2</Menu.Item>
                  <Menu.Item key="6">3</Menu.Item>
                  <Menu.Item key="7">4</Menu.Item>
                  <Menu.Item key="8">5</Menu.Item>
                </SubMenu>
                <SubMenu title="Added Date">
                  <Menu.Item key="9">This week</Menu.Item>
                  <Menu.Item key="10">Last 5 week</Menu.Item>
                  <Menu.Item key="11">Last 15 week</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 530 }}>
              Content
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <img src="/assets/imgs/foot.svg" alt="footer" />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
