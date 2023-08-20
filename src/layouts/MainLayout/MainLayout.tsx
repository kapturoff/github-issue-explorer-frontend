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
          <h2 className="main_layout__logotype">
            <Space align="center">
              <GithubOutlined />

              <div>Github issue tracker</div>
            </Space>
          </h2>
        </Header>

        <Content className="main_layout__content">
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout;
