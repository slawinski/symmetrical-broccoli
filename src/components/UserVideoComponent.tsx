import OpenViduVideoComponent from './OvVideo';

type MyProps = {
  streamManager: any,
  className?: any
  className2?: any
}


const UserVideoComponent = ({streamManager, className, className2}: MyProps) => {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
        <div>
            {streamManager !== undefined ? (
                <div>
                    <div className={className2}>
                        <OpenViduVideoComponent className={className} streamManager={streamManager} />
                    </div>
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    )
}

export default UserVideoComponent
