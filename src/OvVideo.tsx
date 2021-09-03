import React, { Component } from 'react';

type MyProps = {
  streamManager: any
}

type MyState = {
  videoRef: any
}

export default class OpenViduVideoComponent extends Component<MyProps, MyState> {


  constructor(props: any) {
    super(props);

    this.state = {
      videoRef: undefined
    };

  }

    componentDidUpdate(props:any) {
        if (props && !!this.state.videoRef) {
            this.props.streamManager.addVideoElement(this.state.videoRef.current);
        }
    }

    componentDidMount() {
      this.setState({
            videoRef: React.createRef(),
        });
        if (this.props && !!this.state.videoRef) {
            this.props.streamManager.addVideoElement(this.state.videoRef.current);
        }
    }

    render() {
        return <video autoPlay={true} ref={this.state.videoRef} />;
    }

}
