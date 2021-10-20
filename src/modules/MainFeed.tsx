import UserVideoComponent from '../components/UserVideoComponent';
import micEnabled from '../assets/mic_enabled.svg'
import cameraEnabled from '../assets/camera_enabled.svg'

// TODO use mySessionId as title
const MainFeed = ({mySessionId, mainStreamManager, publisher, subscribers, leaveSession, handleMainVideoStream}:any) => {
  return (
    <div id="session" className="container justify-between">
        <div id="session-header" className="flex justify-between">
            <button
                className="h-14 label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
                id="buttonToggleCamera"
                onClick={leaveSession}
            >
                <img className="opacity" src={cameraEnabled} alt="toggleMute" />
            </button>
            <button
                className="h-14 label text-lightGrey button-enabled bg-white bg-opacity-50 px-9"
                id="buttonToggleMute"
                onClick={leaveSession}
            >
                <img src={micEnabled} alt="toggleMute" />
            </button>
            <button
                className="h-14 label text-lightGrey button-leave bg-alert py-5 px-9"
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
        <div id="video-container" className="flex gap-2">
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
