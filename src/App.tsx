import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import {useState, useEffect, useRef} from 'react';
import SessionLogIn from './modules/SessionLogIn';
import MainFeed from './modules/MainFeed';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

 const App = () => {
     const [OV, setOV] = useState<any>(() => new OpenVidu())
     const [mySessionId, setMySessionId] = useState<string>('HTD')
     const [myUserName, setMyUserName] = useState<string>('Participant' + Math.floor(Math.random() * 100))
     const [session, setSession] = useState<any>(undefined)
     const [mainStreamManager, setMainStreamManager] = useState<any>(undefined)
     const [publisher, setPublisher] = useState<any>(undefined)
     const [subscribers, setSubscribers] = useState<string[]>([])
     const mounted = useRef<boolean>(false);

     useEffect(() => {
         if (!mounted.current) {
            // componentDidMount logic
            window.addEventListener('beforeunload', onbeforeunload);
            mounted.current = true;
         }
         return () => {
            window.removeEventListener('beforeunload', onbeforeunload);

         }
     }, [])

    const onbeforeunload = (event: any) => {
        leaveSession();
    }

    const handleChangeSessionId = (e: any) => {
        setMySessionId(e.target.value)
    }

    const handleChangeUserName = (e: any) => {
        setMyUserName(e.target.value)
    }

    const handleMainVideoStream = (stream: any) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream)
        }
    }

    const deleteSubscriber = (streamManager: any) => {
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            setSubscribers(subscribers)
        }
    }

    const getToken = () => {
        return createSession(mySessionId).then((sessionId) => createToken(sessionId));
    }

    const createSession = (sessionId: any) => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ customSessionId: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                var error = Object.assign({}, response);
                if (error?.response?.status === 409) {
                    resolve(sessionId);
                } else {
                    console.log(error);
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' +
                        OPENVIDU_SERVER_URL,
                    );
                    if (
                        window.confirm(
                            'No connection to OpenVidu Server. This may be a certificate error at "' +
                            OPENVIDU_SERVER_URL +
                            '"\n\nClick OK to navigate and accept it. ' +
                            'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                            OPENVIDU_SERVER_URL +
                            '"',
                        )
                    ) {
                        window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
                }
            });
    });
    }

    const createToken = (sessionId: any) => {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }

    const leaveSession = () => {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        setOV(null)
        setMySessionId('HTD')
        setMyUserName('Participant' + Math.floor(Math.random() * 100))
        setSession(undefined)
        setMainStreamManager(undefined)
        setPublisher(undefined)
        setSubscribers([])
    }

    const joinSession = () => {
        // --- 1) Get an OpenVidu object ---
        setOV(new OpenVidu());

        // --- 2) Init a session ---
        setSession(OV.initSession())

        // --- 3) Specify the actions when events take place in the session ---
        // On every new Stream received...
        setSession((session: any) => {
            session.on('streamCreated', (event: any) => {
                // Subscribe to the Stream to receive it. Second parameter is undefined
                // so OpenVidu doesn't create an HTML video by its own
                var subscriber = session.subscribe(event.stream, undefined);
                subscribers.push(subscriber);

                // Update the state with the new subscribers
                setSubscribers(subscribers)
            });

            // On every Stream destroyed...
            session.on('streamDestroyed', (event: any) => {

                // Remove the stream from 'subscribers' array
                deleteSubscriber(event.stream.streamManager);
            });

            // On every asynchronous exception...
            session.on('exception', (exception: any) => {
                console.warn(exception);
            });

            // --- 4) Connect to the session with a valid user token ---

            // 'getToken' method is simulating what your server-side should do.
            // 'token' parameter should be retrieved and returned by your own backend
            getToken().then((token) => {
                // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                session
                    .connect(
                        token,
                        { clientData: myUserName },
                    )
                    .then(() => {

                        // --- 5) Get your own camera stream ---

                        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                        // element: we will manage it on our own) and with the desired properties
                        let publisher = OV.initPublisher(undefined, {
                            audioSource: undefined, // The source of audio. If undefined default microphone
                            videoSource: undefined, // The source of video. If undefined default webcam
                            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                            publishVideo: true, // Whether you want to start publishing with your video enabled or not
                            resolution: '640x480', // The resolution of your video
                            frameRate: 30, // The frame rate of your video
                            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                            mirror: false, // Whether to mirror your local video or not
                        });

                        // --- 6) Publish your stream ---

                        session.publish(publisher);

                        // Set the main video in the page to display our webcam and store our Publisher
                        setMainStreamManager(publisher)
                        setPublisher(publisher)
                    })
                    .catch((error: any) => {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    });
            });
            return session
        })
    }

             return (
            <div className="container">
                {session === undefined ? (
                    <SessionLogIn {...{myUserName, mySessionId, joinSession, handleChangeUserName, handleChangeSessionId}}/>
                ) : null}

                {session !== undefined ? (
                    <MainFeed {...{mySessionId, mainStreamManager, publisher, subscribers, leaveSession, handleMainVideoStream}} />
                ) : null}
            </div>
        );
 }

 export default App
