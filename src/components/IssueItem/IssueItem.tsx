import {
  Avatar,
  Image,
  List,
  Skeleton,
  Space,
  Spin,
  Typography,
} from 'antd';
import { IIssue } from '../../types/issues';
import LabelsViewer from '../LabelsViewer/LabelsViewer';
import './IssueItem.scss';

export default function IssueItem(item: IIssue) {
  const {
    user,
    title,
    labels,
    number,
    created_at: createdAt,
  } = item;

  return (
    <List.Item className="issue__list_item_container">
      <Skeleton title={false} loading={false} active>
        <List.Item.Meta
          className="issue__list_item"
          avatar={(
            <Avatar
              src={(
                <Image
                  src={user.avatar_url}
                  placeholder={<Spin />}
                  preview={false}
                />
              )}
            />
          )}
          title={title}
          description={(
            <Space direction="vertical">
              { new Date(createdAt).toLocaleString() }

              <LabelsViewer labels={labels} />
            </Space>
          )}
        />

        <Typography.Text type="secondary" className="issue__list_item_id">
          {`#${number}`}
        </Typography.Text>
      </Skeleton>
    </List.Item>
  );
}
