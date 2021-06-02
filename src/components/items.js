import React from 'react';
import BidCard from './bidCard';
import BidFlipCard from './bidFlipCard';
import '../App.css';
import {updateItems} from '../actions/actions'
import { connect } from 'react-redux'
import { Modal } from 'antd';

class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            itemStatus: 0,
        }
        this.clickCard = this.clickCard.bind(this);
        this.submitCard = this.submitCard.bind(this);
    }

    clickCard = () => {
        console.log("123")
        if(this.state.itemStatus === 0) {
            this.setState({
                itemStatus: this.state.itemStatus + 1,
            });
        }
        else if(this.state.itemStatus === 2) {
            this.setState({
                modalVisible: true
            });
        }
    };

    submitCard = (bidVal) => {
        this.setState({
            itemStatus: 0,
        });
        if(bidVal > this.props.top) {
            this.props.updateItems({
                id: this.props.id,
                top: bidVal,
            })
        }
    }

    hideModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        let currentItem
        let {endStatus, price, name, top, time} = this.props
        let endContent= "ENDS IN ", bidSentence = "HIGHEST BID"
        if(time === "0 SECONDS") {
            endStatus = true
            this.state.itemStatus = 2
        }
        if(this.state.itemStatus === 0 || this.state.itemStatus === 2) {
            if(endStatus === false) {
                endContent += time
            }
            else if(endStatus === true) {
                bidSentence = "WINNING BID"
                endContent = "ENDED"
            }
            currentItem = <BidCard price={price} name={name} top={top} bid={bidSentence} end={endContent}></BidCard>;
        }
        else if(this.state.itemStatus === 1)
            currentItem = <BidFlipCard onSubmit={this.submitCard}></BidFlipCard>;
        return(
            <div>
                <div className="bidBox" onClick={this.clickCard}>
                    {currentItem }
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width={700}
                    cancelText="Cancel"
                    >
                        Visible: {this.state.modalVisible ? "AAA" : "BBB"  }
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        items: state
    }
}
  
const mapDispatchToProps = {
    updateItems
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Items);