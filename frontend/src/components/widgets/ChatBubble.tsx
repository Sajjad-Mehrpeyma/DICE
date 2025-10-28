import clsx from 'clsx';

interface ChatBubbleProps {
  content: string;
  owner: 'user' | 'assistant';
  timestamp?: Date;
  sources?: string[];
  className?: string;
}

export const ChatBubble = ({
  content,
  owner,
  timestamp,
  sources,
  className,
}: ChatBubbleProps) => {
  const isUser = owner === 'user';

  return (
    <div
      className={clsx(
        'flex mb-4',
        isUser ? 'justify-end' : 'justify-start',
        className,
      )}
    >
      <div
        className={clsx(
          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
          isUser
            ? 'bg-primary-600 text-white'
            : 'bg-white border border-gray-200 text-gray-900',
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>

        {timestamp && (
          <p
            className={clsx(
              'text-xs mt-1',
              isUser ? 'text-primary-100' : 'text-gray-500',
            )}
          >
            {timestamp.toLocaleTimeString()}
          </p>
        )}

        {sources && sources.length > 0 && !isUser && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Sources:</p>
            <div className="flex flex-wrap gap-1">
              {sources.map((source, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
