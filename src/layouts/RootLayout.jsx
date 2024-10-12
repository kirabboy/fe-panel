import { Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/getUser";
import { useNavigate } from "react-router-dom";
import paths from "../utils/paths";
import MyHeader from "../components/header/MyHeader";
import { Layout } from "antd";
const { Content } = Layout;
const RootLayout = () => {
  const navigate = useNavigate();
  const login = getAccessToken();
  if (!login) navigate(paths.LOGIN);
  return (
    <main className="flex min-h-screen w-full">
      <MyHeader />
      <div className="p-[1.6rem] flex-1 bg-[#F2F2F2]">
        <Content>
          <Outlet />
        </Content>
      </div>
    </main>
  );
};

export default RootLayout;
