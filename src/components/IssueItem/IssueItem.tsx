import {
  Avatar,
  List,
  Skeleton,
  Space,
  Tag,
} from 'antd';
import { IIssue } from '../../types/issues';
import calculateColor from '../../utils/calculateColor';
import './IssueItem.scss';

export default function IssueItem(item: IIssue, loading: boolean) {
  const {
    user, title, labels, number,
  } = item;

  return (
    <List.Item>
      <Skeleton title={false} loading={loading} active>
        <List.Item.Meta
          className="issue__list_item"
          avatar={<Avatar src={user.avatar_url} />}
          title={title}
          description={(
            labels.map(
              (label) => (
                <Tag
                  key={label.id}
                  color={`#${label.color}`}
                  style={{ color: calculateColor(label.color) }}
                >
                  { label.name }
                </Tag>
              ),
            )
          )}
        />

        <Space>
          { `#${number}` }
        </Space>
      </Skeleton>
    </List.Item>
  );
}
