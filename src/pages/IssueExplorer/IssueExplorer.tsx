import { GithubOutlined, LeftOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Image,
  Skeleton,
  Space,
  Spin,
  Typography,
} from 'antd';
import useAxios from 'axios-hooks';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import LabelsViewer from '../../components/LabelsViewer/LabelsViewer';
import { IIssue } from '../../types/issues';
import './IssueExplorer.scss';

export type TIssueExplorerParams = {
  owner: string,
  repositoryName: string,
  issueId: string
};

export default function IssueExplorer() {
  const {
    owner,
    repositoryName,
    issueId,
  } = useParams<TIssueExplorerParams>();

  const [
    {
      data: issue,
      loading: issueLoading,
    },
  ] = useAxios<IIssue>(
    `/issues/${owner}/${repositoryName}/${issueId}`,
  );

  return (
    <>
      <Space.Compact>
        <Button
          href="/"
          type="link"
          className="back_button"
        >
          <LeftOutlined />
          Go back
        </Button>

        <Button
          href={issue?.html_url}
          type="link"
          target="_blank"
          className="view_button"
        >
          <GithubOutlined />
          View on Github
        </Button>
      </Space.Compact>

      <Card
        className="issue"
        bordered={false}
      >
        <Skeleton loading={issueLoading}>
          <Card.Meta
            className="issue__header"
            title={(
              <div className="issue__title">
                <Space>
                  {issue?.title}

                  <Typography.Text type="secondary">
                    {`#${issue?.number}`}
                  </Typography.Text>
                </Space>

                <LabelsViewer labels={issue?.labels || []} />
              </div>
          )}
            avatar={(
              <Avatar
                src={(
                  <Image
                    src={issue?.user.avatar_url}
                    placeholder={<Spin />}
                    preview={false}
                  />
              )}
              />
          )}
            description={
            new Date(issue?.created_at || '').toLocaleString()
          }
          />

          <div className="issue__content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue?.body || ''}
            </ReactMarkdown>
          </div>
        </Skeleton>
      </Card>
    </>
  );
}
