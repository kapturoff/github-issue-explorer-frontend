import {
  Avatar,
  Image,
  List,
  // Skeleton,
  Space,
  Spin,
  Typography,
  Card,
} from 'antd';
import { IIssue } from '../../types/issues';
import LabelsViewer from '../LabelsViewer/LabelsViewer';
import './IssueItem.scss';

export default function IssueItem(item: IIssue) {
  const {
    url,
    user,
    title,
    labels,
    number,
    created_at: createdAt,
  } = item;

  const repositoryFullName = /(?<=repos\/).+(?=\/issues)/.exec(url)?.[0];
  const localUrl = `/${repositoryFullName || ''}/${number}`;

  return (
    <Typography.Link href={localUrl}>
      <List.Item className="issue__list_item_container">
        <Card className="issue__list_item">
          <Card.Meta
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
            title={(
              <Space>
                <div>{title}</div>

                <Typography.Text type="secondary" className="issue__list_item_id">
                  {`#${number}`}
                </Typography.Text>
              </Space>
          )}
            description={(
              <Space direction="vertical">
                { new Date(createdAt).toLocaleString() }

                <LabelsViewer labels={labels} />
              </Space>
          )}
          />
        </Card>
      </List.Item>
    </Typography.Link>
  );
}
