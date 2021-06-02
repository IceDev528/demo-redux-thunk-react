import React from 'react';
import '../App.css';

class bidCard extends React.Component {

  render() {
    let {price, name, top, bid, end} = this.props
    return(
      <div>
        <p className="bidPrice">${price}</p>
        <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}>{end}</h2>
        <h1 style={{ marginBottom: 0, fontWeight: 'normal' }}>{bid} ${top}</h1>
        <h1 style={{ marginBottom: 0, fontSize: 50 }}>{name}</h1>
      </div>
    );
  }
}

export default bidCard;