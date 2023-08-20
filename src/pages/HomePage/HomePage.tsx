import { List } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import IssueItem from '../../components/IssueItem/IssueItem';
import { IIssue } from '../../types/issues';
import IRepository from '../../types/repositories';
import './HomePage.scss';

const DEFAULT_PAGE_SIZE = 15;

function HomePage() {
  const [page, setPage] = useState<number>(1);

  const searchOptions = { repositoryName: 'facebook/react' };

  // Making request to obtain issues amount for pagination
  const [{
    data: issues,
    loading: issuesLoading,
  }] = useAxios<IIssue[]>({
    url: `/repos/${searchOptions.repositoryName}/issues`,
    params: {
      page,
      per_page: DEFAULT_PAGE_SIZE,
      opened: true,
    },
  });

  // Making request to obtain all issues of the repository
  const [{
    data: repository,
    loading: repositoryLoading,
  }] = useAxios<IRepository>(
    `/repos/${searchOptions.repositoryName}`,
  );

  const paginationSettings: PaginationConfig = {
    className: 'home_page__pagination',
    position: 'top',
    align: 'center',

    pageSize: DEFAULT_PAGE_SIZE,
    total: repositoryLoading
      ? DEFAULT_PAGE_SIZE
      : repository?.open_issues_count,

    showSizeChanger: false,

    onChange(pageNumber: number) {
      setPage(pageNumber);
    },
  };

  return (
    <List
      bordered
      pagination={paginationSettings}
      className="home_page__list"
      loading={issuesLoading}
      dataSource={issues}
      renderItem={IssueItem}
    />
  );
}

export default HomePage;
