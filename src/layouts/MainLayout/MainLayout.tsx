import { GithubOutlined } from '@ant-design/icons';
import {
  ConfigProvider,
  Layout, Space,
  ThemeConfig,
  message,
} from 'antd';
import { Outlet } from 'react-router-dom';
import './MainLayout.scss';

const { Header, Content } = Layout;

const AntThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#EA1179',
  },
};

function MainLayout() {
  const [, MessageContext] = message.useMessage();

  return (
    <ConfigProvider
      theme={AntThemeConfig}
    >
      {MessageContext}

      <Layout className="main_layout__container">

        <Header className="main_layout__header">
          <h1>
            <Space size={16}>
              <GithubOutlined />

              Github issue tracker
            </Space>
          </h1>
        </Header>

        <Content className="main_layout__content">
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout;
