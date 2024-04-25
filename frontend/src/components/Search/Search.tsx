import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchBox = () => {
  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        className={"w-96 mt-4"}
      />
    </Space>
  );
};

export default SearchBox;
