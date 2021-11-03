import UserVideoComponent from '../components/UserVideoComponent';
import micEnabled from '../assets/mic_enabled.svg'
import cameraEnabled from '../assets/camera_enabled.svg'

// TODO use mySessionId as title
const MainFeed = ({mySessionId, mainStreamManager, publisher, subscribers, leaveSession, handleMainVideoStream, toggleVideo, toggleMute}:any) => {
  return (
    <div id="session" className="container justify-between">
        <div id="session-header" className="flex justify-between mx-5">
            <button
                className="label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
                id="buttonToggleCamera"
                onClick={toggleVideo}
            >
                <img className="opacity" src={cameraEnabled} alt="toggleMute" />
            </button>
            <button
                className="label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
                id="buttonToggleMute"
                onClick={toggleMute}
            >
                <img src={micEnabled} alt="toggleMute" />
            </button>
            <button
                className="label text-lightGrey button-leave bg-alert py-5 px-9"
                id="buttonLeaveSession"
                onClick={leaveSession}
            >
                Leave call
            </button>
        </div>

        {mainStreamManager !== undefined ? (
            <div id="main-video" className="">
                <UserVideoComponent classVideo="video" streamManager={mainStreamManager} />
            </div>
        ) : null}
        <div id="video-container" className="flex gap-2 overflow-x-auto pl-5">
            {publisher !== undefined ? (
                <div className="w-14" onClick={() => handleMainVideoStream(publisher)}>
                    <UserVideoComponent
                        classVideo="video-circle"
                        classVideoCircleCropper="video-circle-cropper"
                        streamManager={publisher} />
                </div>
            ) : null}
            {subscribers.map((sub: any, i: any) => (
                <div key={i} className="w-14" onClick={() => handleMainVideoStream(sub)}>
                    <UserVideoComponent
                        classVideo="video-circle"
                        classVideoCircleCropper="video-circle-cropper"
                        streamManager={sub} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default MainFeed
