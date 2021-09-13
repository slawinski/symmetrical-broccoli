import UserVideoComponent from '../UserVideoComponent';

const MainFeed = ({mySessionId, mainStreamManager, publisher, subscribers, leaveSession, handleMainVideoStream}:any) => {
  return (
    <div id="session">
        <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={leaveSession}
                value="Leave session"
            />
        </div>

        {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={mainStreamManager} />
            </div>
        ) : null}
        <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                    <UserVideoComponent
                        streamManager={publisher} />
                </div>
            ) : null}
            {subscribers.map((sub: any, i: any) => (
                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                    <UserVideoComponent streamManager={sub} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default MainFeed
