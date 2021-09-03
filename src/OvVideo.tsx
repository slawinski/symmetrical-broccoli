import {useRef, useEffect} from 'react'

type MyProps = {
  streamManager: any
}

const OpenViduVideoComponent = ({streamManager}: MyProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {

        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
      mounted.current = true;
    } else {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }
  });

  return (
    <video autoPlay={true} ref={videoRef} />
  )
}

export default OpenViduVideoComponent
