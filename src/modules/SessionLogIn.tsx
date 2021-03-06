import logo from '../assets/logo.svg';
import { ISessionLoginProps } from '../types';

const SessionLogIn = ({
  myUserName,
  mySessionId,
  joinSession,
  handleChangeUserName,
  handleChangeSessionId,
}: ISessionLoginProps) => {
  return (
    <section className="container justify-center bg-lightGrey">
      <div id="join" className="mx-5">
        <div id="img-div" className="mb-24">
          <img className="m-auto" src={logo} alt="OpenVidu logo" />
        </div>
        <div id="join-dialog" className="flex flex-col">
          <h2 className="mb-10 self-center"> Join a video session </h2>
          <form className="" onSubmit={joinSession}>
            {/* TODO add label for accessibility */}
            <input
              className="caption text-grey input-field py-5 px-4 mb-2 w-full"
              type="text"
              id="userName"
              value={myUserName}
              onChange={handleChangeUserName}
              required
              placeholder="Your name"
            />
            {/* TODO add label for accessibility */}
            <input
              className="caption text-grey input-field py-5 px-4 mb-10 w-full"
              type="text"
              id="sessionId"
              value={mySessionId}
              onChange={handleChangeSessionId}
              required
              placeholder="You better type WarsawJS here"
            />
            <button className="label text-lightGrey button-join py-5 w-full" type="submit">
              Join session
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SessionLogIn;
