import React from 'react';

interface IMessage {
  name: string;
  message: string;
  origin: 'foreign' | 'own';
}

interface IMainFeed {
  mySessionId: string;
  mainStreamManager: any;
  publisher: any;
  subscribers: any;
  leaveSession: () => void;
  handleMainVideoStream: (stream: any) => void;
  toggleVideo: () => void;
  toggleMute: () => void;
  isVideo: boolean;
  isMute: boolean;
  myMessage: string;
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messages: IMessage[];
}

interface ISessionLoginProps {
  myUserName: string;
  mySessionId: string;
  joinSession: () => void;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSessionId: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IChatInput {
  myMessage: string;
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
