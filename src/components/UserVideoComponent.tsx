import OpenViduVideoComponent from './OvVideo';

type MyProps = {
  streamManager: any,
  classVideo?: any
  classVideoCircleCropper?: any
}


const UserVideoComponent = ({streamManager, classVideo, classVideoCircleCropper}: MyProps) => {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }
    console.log(streamManager?.openvidu?.role);

    const ThumbCaption = (): any => {
        if (classVideo === 'video') {
            return <div></div>
        }
        if (classVideo === 'video-circle' && streamManager?.openvidu?.role === 'PUBLISHER') {
            return <div><p className="caption text-lightGrey text-center">You</p></div>
        }
        return <div><p className="caption text-lightGrey text-center overflow-ellipsis overflow-hidden whitespace-nowrap">{getNicknameTag()}</p></div>
    }

    return (
    <>
            {streamManager !== undefined ? (
                <>
                    <div className={classVideoCircleCropper}>
                        <OpenViduVideoComponent classVideo={classVideo} streamManager={streamManager} />
                    </div>
                    <ThumbCaption />
                </>
            ) : null}
    </>)
}

export default UserVideoComponent
