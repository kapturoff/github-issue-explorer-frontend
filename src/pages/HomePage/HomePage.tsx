import {
  Avatar,
  Space,
  List, Skeleton,
  Tag,
} from 'antd';
import IssuesApiProvider, { IIssue } from '../../api/issues.api';
import './HomePage.scss';
import calculateColor from '../../utils/calculateColor';

function HomePage() {
  const issuesApiProvider = new IssuesApiProvider();
  const repository = { repositoryName: 'facebook/react' };

  const [data, loading] = issuesApiProvider.list(repository);

  const itemListRenderer = (item: IIssue) => (
    <List.Item>
      <Skeleton title={false} loading={loading} active>
        <List.Item.Meta
          className="home_page__list_item"
          avatar={<Avatar src={item.user.avatar_url} />}
          title={item.title}
          description={(
            item.labels.map(
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
          { `#${item.number}` }
        </Space>
      </Skeleton>
    </List.Item>
  );

  return (
    <List
      className="home_page__list"
      loading={loading}
      dataSource={data}
      renderItem={itemListRenderer}
    />
  );
}

export default HomePage;
