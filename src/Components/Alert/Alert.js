import React, { Component, Fragment } from 'react';
import './Alert.css';
import './Script';

class Alerts extends Component {
    render() {
        return (
            <Fragment>
                  <div className='alert_div' id='alert' style={{border: 'none', padding: '8px 8px', backgroundColor: 'rgb(108, 228, 108)', display: 'flex', justifyContent: 'center'}}>
                    {this.props.text}
                  </div>
            </Fragment>
        )
    }
}

export default Alerts;