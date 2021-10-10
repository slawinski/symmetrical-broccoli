import {useRef, useEffect} from 'react'

type MyProps = {
  streamManager: any,
  className?: string,
}

const OpenViduVideoComponent = ({streamManager, className}: MyProps) => {
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
    <video className={className} autoPlay={true} ref={videoRef} />
  )
}

export default OpenViduVideoComponent
