import UserVideoComponent from '../components/UserVideoComponent';
import micEnabled from '../assets/mic_enabled.svg';
import micDisabled from '../assets/mic_disabled.svg';
import cameraEnabled from '../assets/camera_enabled.svg';
import cameraDisabled from '../assets/camera_disabled.svg';
import ChatInput from '../components/ChatInput';
import MessageFeed from '../components/MessageFeed';
import { IMainFeed } from '../types';

// TODO use mySessionId as title
const MainFeed = ({
  mySessionId,
  mainStreamManager,
  publisher,
  subscribers,
  leaveSession,
  handleMainVideoStream,
  toggleVideo,
  toggleMute,
  isVideo,
  isMute,
  myMessage,
  sendMessage,
  handleChangeMessage,
  messages,
}: IMainFeed) => {
  return (
    <div id="session" className="container gap-4 justify-between">
      <div id="session-header" className="flex justify-between px-5">
        <button
          className="label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
          id="buttonToggleCamera"
          onClick={toggleVideo}>
          <img
            className="opacity"
            src={isVideo ? cameraEnabled : cameraDisabled}
            alt="toggleMute"
          />
        </button>
        <button
          className="label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
          id="buttonToggleMute"
          onClick={toggleMute}>
          <img src={isMute ? micEnabled : micDisabled} alt="toggleMute" />
        </button>
        <button
          className="label text-lightGrey button-leave bg-alert py-5 px-9"
          id="buttonLeaveSession"
          onClick={leaveSession}>
          Leave call
        </button>
      </div>

      {mainStreamManager !== undefined ? (
        <div id="main-video" className="flex-grow">
          <UserVideoComponent classVideo="video" streamManager={mainStreamManager} />
        </div>
      ) : null}
      <div id="message-feed" className="px-5">
        <MessageFeed messages={messages} />
      </div>
      <div id="video-container" className="flex gap-2 overflow-x-auto pl-5">
        {publisher !== undefined ? (
          <div
            // style={{transform: 'rotateY(180deg)'}}
            className="w-14"
            onClick={() => handleMainVideoStream(publisher)}>
            <UserVideoComponent
              classVideo="video-circle"
              classVideoCircleCropper="video-circle-cropper"
              streamManager={publisher}
            />
          </div>
        ) : null}
        {subscribers.map((sub: any, i: number) => (
          <div key={i} className="w-14" onClick={() => handleMainVideoStream(sub)}>
            <UserVideoComponent
              classVideo="video-circle"
              classVideoCircleCropper="video-circle-cropper"
              streamManager={sub}
            />
          </div>
        ))}
      </div>
      <div id="message-input" className="px-5">
        <ChatInput {...{ myMessage, sendMessage, handleChangeMessage }} />
      </div>
    </div>
  );
};

export default MainFeed;
