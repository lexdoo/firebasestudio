import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn("prose prose-sm dark:prose-invert max-w-none prose-p:leading-normal prose-a:text-primary")}
      components={{
        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
