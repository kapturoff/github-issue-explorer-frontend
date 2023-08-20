import { List } from 'antd';
import IssuesApiProvider from '../../api/issues.api';
import IssueItem from '../../components/IssueItem/IssueItem';
import './HomePage.scss';

function HomePage() {
  const issuesApiProvider = new IssuesApiProvider();
  const repository = { repositoryName: 'facebook/react' };

  const [data, loading] = issuesApiProvider.list(repository);

  return (
    <List
      className="home_page__list"
      loading={loading}
      dataSource={data}
      renderItem={(item) => IssueItem(item, loading)}
    />
  );
}

export default HomePage;
