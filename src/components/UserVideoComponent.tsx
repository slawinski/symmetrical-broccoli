import OpenViduVideoComponent from './OvVideo';

type MyProps = {
  streamManager: any
}


const UserVideoComponent = ({streamManager}: MyProps) => {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    )
}

export default UserVideoComponent
