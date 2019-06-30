import React, { Component, Fragment } from 'react';
import './Alert.css';
import './Script';

class Alerts extends Component {
    render() {
        const color = this.props.color
        if(color === 0) {
            return (
                <Fragment>
                      <div className='alert_div' id='alert' style={{borderRadius: '5px', color: '#fff', border: 'none', padding: '8px 8px', backgroundColor: 'rgb(202, 29, 29)', display: 'flex', justifyContent: 'center'}}>
                        {this.props.text}
                      </div>
                </Fragment>
            )
        } else if(color === 1) {
            return (
                <Fragment>
                      <div className='alert_div' id='alert' style={{borderRadius: '5px', color: '#fff', border: 'none', padding: '8px 8px', backgroundColor: '#03a405', display: 'flex', justifyContent: 'center'}}>
                        {this.props.text}
                      </div>
                </Fragment>
            )
        }
    }
}

export default Alerts;