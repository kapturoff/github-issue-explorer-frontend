import { CopyOutlined } from '@ant-design/icons';
import { FloatButton, List } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IssueItem from '../../components/IssueItem/IssueItem';
import SearchBar from '../../components/SearchBar/SearchBar';
import { stopLoadingRepository } from '../../store/repositorySlice';
import { RootState } from '../../store/store';
import { IIssue } from '../../types/issues';
import IRepository from '../../types/repositories';
import './HomePage.scss';

const DEFAULT_PAGE_SIZE = 30;

function HomePage() {
  const dispatch = useDispatch();

  const repositoryFullName = useSelector<RootState>(
    (state) => (
      state.repository.name && state.repository.owner
        ? `${state.repository.owner}/${state.repository.name}`
        : ''
    ),
  );

  const [page, setPage] = useState<number>(-1);

  // Making request to obtain issues amount for pagination
  const [
    {
      data: issues,
      loading: issuesLoading,
    },
    loadIssues,
  ] = useAxios<IIssue[]>(
    {
      url: `/issues/${repositoryFullName}`,
      params: {
        page,
        per_page: DEFAULT_PAGE_SIZE,
        opened: true,
      },
    },
    { manual: true },
  );

  // Stop submit button loading animation when issues're loaded
  useEffect(() => {
    dispatch(stopLoadingRepository());
  }, [issues]);

  // Making request to obtain all issues of the repository
  const [
    { data: repository },
    loadRepository,
  ] = useAxios<IRepository>(
    `/repositories/${repositoryFullName}`,
    { manual: true },
  );

  // When page is changed, while the repository name is not empty, loads issues
  useEffect(() => {
    if (repositoryFullName) {
      loadIssues().catch(() => setPage(1));
    }
  }, [page]);

  // If repository owner or name in search bar was changed, go back to the first page
  useEffect(() => {
    setPage(1);

    if (repositoryFullName) {
      loadRepository();
      loadIssues().catch(() => null);
    }
  }, [repositoryFullName]);

  const paginationSettings: PaginationConfig = {
    className: 'home_page__pagination',
    position: 'top',
    align: 'center',

    pageSize: DEFAULT_PAGE_SIZE,
    total: repository?.open_issues_count,
    current: page,

    showSizeChanger: false,

    onChange(pageNumber: number) {
      setPage(pageNumber);
    },
  };

  return (
    <>
      <SearchBar />
      <List
        dataSource={issues}
        className="home_page__list"
        pagination={paginationSettings}
        loading={issuesLoading}
        renderItem={IssueItem}
      />
      <FloatButton
        icon={<CopyOutlined />}
        description="Logs"
        shape="square"
        type="primary"
        href="/logs"
      />
    </>
  );
}

export default HomePage;
