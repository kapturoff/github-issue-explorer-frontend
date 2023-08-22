import { LeftOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import './ErrorPage.scss';

export default function ErrorPage() {
  return (
    <div className="error_page__container">
      <Empty description="Looks like there's nothing here">
        <Button
          href="/"
          type="link"
          className="back_button"
        >
          <LeftOutlined />
          Go home
        </Button>
      </Empty>
    </div>
  );
}
