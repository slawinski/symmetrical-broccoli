import React from 'react';

const MessageFeed = ({ messages }: any) => {
  const fadeOut = (key: any) => {
    if (key === 2) return '';
    if (key === 1) return 'bg-opacity-75 ';
    if (key === 0) return 'bg-opacity-50 ';
  };
  return (
    <div className="flex flex-col gap-2">
      {messages
        ?.slice(0, 3)
        .reverse()
        .map((msg: IMessage, index: number) => (
          <div
            key={index}
            className={`${fadeOut(
              index,
            )}flex gap-5 caption text-darkNavy py-3 px-4 bg-white rounded-full max-w-max`}
          >
            <p className="max-w-[80px] overflow-ellipsis overflow-hidden whitespace-nowrap">
              <strong>{msg.name}&nbsp;</strong>
            </p>
            <p className="break-all">{msg.message}</p>
          </div>
        ))}
    </div>
  );
};

export default MessageFeed;
