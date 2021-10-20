import {useRef, useEffect} from 'react'

type MyProps = {
  streamManager: any,
  classVideo?: string,
}

const OpenViduVideoComponent = ({streamManager, classVideo}: MyProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
    // componentDidMount logic
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
      mounted.current = true;
    } else {
    // componentDidUpdate logic
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }
  });

  return (
    <video className={classVideo} autoPlay={true} ref={videoRef} />
  )
}

export default OpenViduVideoComponent
