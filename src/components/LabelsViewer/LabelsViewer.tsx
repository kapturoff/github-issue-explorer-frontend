import { Tag } from 'antd';
import { IIssue } from '../../types/issues';
import calculateColor from '../../utils/calculateColor';

interface LabelViewerProps {
  labels: IIssue['labels']
}

export default function LabelViewer(props: LabelViewerProps) {
  const { labels } = props;
  return (
    <div className="issue__list_labels">
      {
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
        }
    </div>
  );
}
