import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Typography } from "antd";
const { Paragraph } = Typography;
const BadgePassword = (props) => {
  const { password } = props;
  const [showPassword, setShowPassword] = useState(false);
  if (!password) return "-";
  return (
    <div className="flex justify-start items-center gap-[1.2rem]">
      <p> {showPassword ? password : "*** ***"}</p>
      <div
        className="flex justify-start items-center gap-[0.8rem] cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        <Paragraph
          className="!my-auto pt-[0.3rem]"
          copyable={{
            text: password,
          }}
        ></Paragraph>
      </div>
    </div>
  );
};

export default BadgePassword;
