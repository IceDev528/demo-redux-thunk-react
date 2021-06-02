import React from 'react';
import { Button, Input } from 'antd';
import '../App.css';

class bidFlipCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bidVal: 0
    }
    this.cancelBid = this.cancelBid.bind(this)
    this.submitBid = this.submitBid.bind(this)
    this.bidValue = this.bidValue.bind(this)
  }

  cancelBid = () => {
    if(this.props.onSubmit) {
      this.props.onSubmit(0)
    }
  }

  submitBid = () => {
    if(this.props.onSubmit) {
      this.props.onSubmit( this.state.bidVal)
    }
  }

  bidValue = (e) => {
    this.setState({ bidVal: e.target.value });
  }

  render() {
    return(
      <div>
        <p className="bidTitle">BID</p>
        <Input size="large" placeholder="ENTER BID" className="enterBid" onChange={ this.bidValue }/>
        <div className="bidForm">
            <Button type="default" className="bidCancelBtn" onClick={this.cancelBid}>CANCEL</Button>
            <Button type="default" className="bidSubmitBtn" onClick={this.submitBid}>SUBMIT</Button>
        </div>
      </div>
    );
  }
}

export default bidFlipCard;