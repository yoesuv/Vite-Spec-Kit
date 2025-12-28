import { Layout, Menu, Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/create", label: "Create" },
  ];

  const selectedKey =
    menuItems.find((item) => location.pathname === item.key)?.key || "/";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div style={{ flex: 1 }} />
        <Menu
          theme={theme === "dark" ? "dark" : "dark"}
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            flex: "none",
            minWidth: 200,
            justifyContent: "center",
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </Header>
      <Content
        style={{
          padding: "24px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
