import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import useAxios from 'axios-hooks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import IRepository from '../../types/repositories';
import './SearchBar.scss';
import { updateRepository } from '../../store/repositorySlice';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();

  const formLoading = useSelector<RootState>(
    (state) => state.repository.loading,
  ) as boolean;

  const [owner, setOwner] = useState<string>('');

  // Moved this to another function to debounce the input
  function onOwnerInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setOwner(event.target.value);
  }

  const onSubmit = (values: typeof formInitialValues) => {
    dispatch(updateRepository(values));
  };

  const formInitialValues = {
    owner: '',
    name: '',
  };

  // Making request to obtain all repositories of the author
  const [
    {
      data: repositories,
      loading: repositoriesLoading,
      error: repositoriesRequestFailed,
    },
    loadRepositoriesList,
  ] = useAxios<IRepository[]>(
    `/orgs/${owner}/repos`,
    { manual: true },
  );

  useEffect(() => {
    if (owner) {
      loadRepositoriesList().catch(() => null);
    }
  }, [owner]);

  return (
    <Form
      className="search_bar__container"
      onFinish={onSubmit}
      initialValues={formInitialValues}
      layout="inline"
    >
      <Form.Item
        validateStatus={repositoriesRequestFailed ? 'error' : undefined}
        help={repositoriesRequestFailed && "Owner's not found"}
        name="owner"
        rules={[{ required: true }]}
      >
        <Input
          onChange={debounce(onOwnerInputChanged, 750)}
          placeholder="Owner of the repository"
        />
      </Form.Item>

      <Form.Item>
        /
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true }]}
        validateStatus={repositoriesRequestFailed ? 'error' : ''}
        help={repositoriesRequestFailed && 'Owner has no repositories'}
      >
        <Select
          allowClear
          className="search_bar__repo_select"
          options={
            repositoriesRequestFailed || !repositories?.length
              ? []
              : repositories
          }
          fieldNames={{
            label: 'name',
            value: 'name',
          }}
          placeholder="Choose repository"
          loading={repositoriesLoading}
          showSearch
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={formLoading}
          htmlType="submit"
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}
