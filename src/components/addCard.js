import React from 'react'
import { Button, Modal, Input, Row, Col } from 'antd'
import { FaCentercode, FaPlus } from 'react-icons/fa'
import {setItems, updateTimer} from '../actions/actions'
import { connect } from 'react-redux'
import '../App.css'
import * as params from '../actions/actionParams'

class addCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      storeName: "",
      invoicePrice: 0,
      imagePreviewUrl: '',
      imageSize: '100%',
      visible: false,
      timerFlag: false,
      modalStyle: {
        textAlign: 'center',
        marginBottom: 20
      }
    }
    this.showModal = this.showModal.bind(this);
    this.submitCard = this.submitCard.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      file: null,
      invoicePrice: 0,
      imagePreviewUrl: '',
      storeName: ''
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  storeChange= (e) => {
    this.setState({ storeName: e.target.value });
  };

  priceChange= (e) => {
    this.setState({ invoicePrice: e.target.value });
  };

  submitCard = () => {
    if(this.state.storeName === '' || this.state.invoicePrice === 0) {
      alert("Please Input Correctly")
    }
    else {
      this.props.setItems({
        id: 1,
        name: this.state.storeName,
        price: this.state.invoicePrice,
        top: 0,
        time: params.DELAY_TIME,
        image: this.state.imagePreviewUrl,
        endStatus: false
      })
      this.setState({
        visible: false,
        file: null,
        invoicePrice: 0,
        imagePreviewUrl: '',
        storeName: ''
      });
      if(this.state.timerFlag === false) {
        setInterval( () => {
          if( this.props.items ) {
            for(let i = 0; i < this.props.items.length; i++) {
              if(this.props.items[i].time > 0) {
                this.props.items[i].time --
                this.props.updateTimer({
                  id: this.props.items[i].id,
                  time: this.props.items[i].time
                })
              }
            }
          }
        }, 1000)
        this.setState({
          timerFlag: true 
        })
      }
    }
  };

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} style={{width: this.state.imageSize}} alt="ImagePreview"/>);
    } else {
      $imagePreview = (<p>QR CODE PREVIEW</p>);
    }

    return(
      <div className="cardBox">
        <div className="addBtn" onClick={this.showModal}>
          <span><FaPlus /></span>
        </div>
        <Modal
            visible={this.state.visible}
            onCancel={this.hideModal}
            footer={null}
            width={700}
            bodyStyle={{padding: 50}}
            >
              <Row gutter={24, 24}>
                <Col span={12} sm={24} md={12} xs={24} style={this.state.modalStyle}>
                  <div className="uploadSide">
                    <h1 className="uploadTitle">UPLOAD</h1>
                    <Input className="storeEdit" size="large" placeholder="ENTER STORE NAME" onChange={ this.storeChange } value={this.state.storeName}/>
                    <Input className="priceEdit" size="large" placeholder="ENTER INVOICE PRICE" onChange={ this.priceChange } value={this.state.invoicePrice}/>
                    <Button type="default" shape="round" className="submitBtn" onClick={this.submitCard}>SUBMIT</Button>
                  </div>
                </Col>
                <Col span={12} style={this.state.modalStyle} xs={24} sm={24} md={12}>
                  <div className="previewComponent">
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                    <form onSubmit={(e)=>this._handleSubmit(e)}>
                        <label htmlFor="file-upload" className="custom-file-upload">SELECT QR CODE</label>
                        <input id="file-upload" type="file" onChange={(e)=>this._handleImageChange(e)}/>
                    </form>
                  </div>
                </Col>
              </Row>
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
  setItems,
  updateTimer
}

export default connect(mapStateToProps, mapDispatchToProps)(addCard);