import { List } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import useAxios from 'axios-hooks';
import IssueItem from '../../components/IssueItem/IssueItem';
import './HomePage.scss';
import { IIssue } from '../../types/issues';

function HomePage() {
  const repository = { repositoryName: 'facebook/react' };

  const [{ data: issues, loading }] = useAxios<IIssue[]>(
    `/repos/${repository.repositoryName}/issues`,
  );

  const paginationSettings: PaginationConfig = {
    position: 'top',
    align: 'center',
    pageSize: 15,
    // total: 300,
    showSizeChanger: false,
    // onChange(page, pageSize) {
    // },
  };

  return (
    <List
      pagination={paginationSettings}
      className="home_page__list"
      loading={loading}
      dataSource={issues}
      renderItem={(item) => IssueItem(item, loading)}
    />
  );
}

export default HomePage;
