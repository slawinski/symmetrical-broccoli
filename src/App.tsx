import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useState, useEffect, useRef } from 'react';
import SessionLogIn from './modules/SessionLogIn';
import MainFeed from './modules/MainFeed';
import { IMessage } from './types';

const App = () => {
  const [OV, setOV] = useState<any>(() => new OpenVidu());
  const [mySessionId, setMySessionId] = useState<string>('Test');
  const [myUserName, setMyUserName] = useState<string>('');
  const [myMessage, setMyMessage] = useState<string>('');
  const [session, setSession] = useState<any>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const mounted = useRef<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(true);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setMySessionId('Test');
    setMyUserName('');
    setSession(undefined);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setSubscribers([]);
  };

  const onbeforeunload = () => {
    leaveSession();
  };

  useEffect(() => {
    if (!mounted.current) {
      // componentDidMount logic
      window.addEventListener('beforeunload', onbeforeunload);
      mounted.current = true;
    }
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
    // eslint-disable-next-line
  }, []);

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyMessage(e.target.value);
  };

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager: any) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
  };

  const createSession = (sessionId: any) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(process.env.REACT_APP_OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                process.env.REACT_APP_OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId: any) => {
    return new Promise((resolve, reject) => {
      const data = {};
      axios
        .post(
          process.env.REACT_APP_OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  };

  const toggleMute = () => {
    publisher.publishAudio(!isMute);
    setIsMute(!isMute);
  };
  const toggleVideo = () => {
    publisher.publishVideo(!isVideo);
    setIsVideo(!isVideo);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (myMessage === '') return;
    session
      .signal({
        data: myMessage, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: 'my-chat', // The type of message (optional)
      })
      .then(() => {
        console.log('Message successfully sent');
      })
      .catch((error: any) => {
        console.error(error);
      });
    setMyMessage('');
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    setOV(new OpenVidu());

    // --- 2) Init a session ---
    setSession(OV.initSession());

    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    setSession((session: any) => {
      // receive chat messages
      session.on('signal', (event: any) => {
        if (event.from.connectionId === session.connection.connectionId) {
          setMessages((prevState) => [
            {
              name: JSON.parse(event.from.data).clientData,
              message: event.data,
              origin: 'own',
            },
            ...prevState,
          ]);
        } else {
          setMessages((prevState) => [
            {
              name: JSON.parse(event.from.data).clientData,
              message: event.data,
              origin: 'foreign',
            },
            ...prevState,
          ]);
        }
      });

      session.on('streamCreated', (event: any) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const subscriber = session.subscribe(event.stream, undefined);
        subscribers.push(subscriber);

        // Update the state with the new subscribers
        setSubscribers(subscribers);
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
          .connect(token, { clientData: myUserName })
          .then(() => {
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            const publisher = OV.initPublisher(undefined, {
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
            setMainStreamManager(publisher);
            setPublisher(publisher);
          })
          .catch((error: any) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
      });

      return session;
    });
  };

  return (
    <>
      {session === undefined ? (
        <SessionLogIn
          {...{ myUserName, mySessionId, joinSession, handleChangeUserName, handleChangeSessionId }}
        />
      ) : null}

      {session !== undefined ? (
        <MainFeed
          {...{
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
            handleChangeMessage,
            sendMessage,
            messages,
          }}
        />
      ) : null}
    </>
  );
};

export default App;
