import { Select, Menu } from "antd";
import { locality, Bedrooms, AddedDate, priceRange } from "./../../constants";
const SliderBody = ({ handleDate, handlePrice, handleBeds, handleChange }) => {
  const { SubMenu } = Menu;
  const { Option } = Select;

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Search by locality"
        onChange={handleChange}
      >
        {locality.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
      <br />
      <Menu mode="inline">
        <SubMenu title="Price Range">
          {priceRange.map((itm, i) => (
            <Menu.Item onClick={() => handlePrice(itm)} key={i}>
              {itm}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Menu mode="inline">
        <SubMenu title="Bedrooms">
          {Bedrooms.map((itm, i) => (
            <Menu.Item onClick={() => handleBeds(itm)} key={i}>
              {itm}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Menu mode="inline">
        <SubMenu title="Added Date">
          {AddedDate.map((itm, i) => (
            <Menu.Item onClick={() => handleDate(itm)} key={i}>
              {itm}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </>
  );
};

export default SliderBody;
