import React from 'react';
import '../App.css';
import AddCard from '../components/addCard.js';
import Item from '../components/items.js';
import { Row, Col, Button } from 'antd';
import {setItems, updateTimer} from '../actions/actions'
import { connect } from 'react-redux'
import * as params from '../actions/actionParams'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marginStyle: {
                marginBottom: 20
            }
        }
        this.resetTimer = this.resetTimer.bind(this)
    }

    resetTimer = () => {
        if( this.props.items ) {
            for(let i = 0; i < this.props.items.length; i++) {
                this.props.items[i].time = params.DELAY_TIME
                this.props.updateTimer({
                    id: this.props.items[i].id,
                    time: this.props.items[i].time,
                    endStatus: false
                })
            }
        }
    }

    render() {
        let { items } = this.props
        return (
            <div className="dashboard">
                <Button onClick={this.resetTimer} className="resetBtn">RESET</Button>
                <h1>MyStore</h1>
                <Row gutter={24, 24}>
                    <Col span={24} style={this.state.marginStyle} sm={24} md={12} lg={8}>
                        <AddCard></AddCard>
                    </Col>
                    {items && items.map((item) => {
                        let realTime = item.time + " SECONDS"
                        if(item.time > 60) realTime = (item.time / 60).toFixed(0) + " MINS"
                        return (
                            <Col key={item.id} span={24} sm={24} md={12} lg={8} style={this.state.marginStyle}>
                                <Item id={item.id} price={item.price} name={item.name} top={item.top} time={realTime} endStatus={item.endStatus}></Item>
                            </Col>
                    )})}
                </Row>
            </div>
        )
    }
  }
  
const mapStateToProps = state => {
    return {
        items: state,
    }
}

const mapDispatchToProps = {
    setItems,
    updateTimer
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);