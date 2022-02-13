import { IChatInput } from '../types';

const ChatInput = ({ myMessage, sendMessage, handleChangeMessage }: IChatInput) => {
  return (
    <form onSubmit={sendMessage}>
      <input
        className="caption text-darkNavy placeholder-current input-field py-5 px-4 mb-2 w-full bg-white bg-opacity-50 border border-solid border-white"
        type="text"
        id="message"
        value={myMessage}
        placeholder="Message..."
        onChange={handleChangeMessage}
      />
    </form>
  );
};

export default ChatInput;
