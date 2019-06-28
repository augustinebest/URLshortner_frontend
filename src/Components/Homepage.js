import React, { Component, Fragment } from 'react';
import { Alert } from 'reactstrap';
import Navbar from './Navbar.js';
import Footer from './Footer';
import validate from '../Factories/Validate';
import './Style.css';
import axios from 'axios';
import { URL } from '../Factories/Url';

class Homepage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            url: null,
            string: '',
            loading: false,
            visible: true,
            color: 'primary',
            error: null,
            link: null,
            ol: null
        }
        alert(1)
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    submit = (e) => {
        e.preventDefault();
        const { url, string } = this.state;
        if(!validate('url', url)) {
            this.setState({ error: 'This URL format is invalid!'});
        } else if(string === '') {
            this.canSubmit();
        } else if(!validate('string', string)) {
            this.setState({error: 'Custom Name format is invalid!'})
        } else {
            this.canSubmit();
        }
    }

    canSubmit = () => {
        const { url, string } = this.state;
        const data = {
            old_url: url,
            customise_url: string
        }
        axios.post(`${URL}/links/shortlink`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            if(res.data.code === 200) {
                this.setState({ error: res.data.message, link: res.data.link, ol: res.data.ol });
            } else {
                this.setState({ error: res.data.message, link: res.data.link, ol: res.data.ol });
            }
        })
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        const { url, string, loading, error, visible, color, link, ol } = this.state;
        console.log('link '+link)
        return (
            <Fragment>
                <Navbar />
                    <div className='row'>
                        <div className='column'>
                            <div className='left_section'>
                                column 1
                                {
                                        error &&
                                        <Alert color={color} isOpen={visible} toggle={this.onDismiss}>
                                            {error} Visit <a href={link}>{link}</a>
                                        </Alert>
                                    }
                            </div>
                        </div>
                        <div className='column'>
                            <div className='right_section'>
                                <div className='right_content'>
                                    <form onSubmit={this.submit} className='form'>
                                      {
                                        error &&
                                        <Alert color='warning' isOpen={visible} toggle={this.onDismiss}>
                                            {error} visit <a href={ol} target='_blank'>{link}</a>
   
                                        </Alert>
                                    }
                                        <input 
                                            type='text' 
                                            name='url'
                                            placeholder='Enter long URL...' 
                                            onChange={this.handleChange}
                                            required
                                        /><br /><br />
                                        
                                        <input 
                                            type='text' 
                                            name='string'
                                            placeholder='Enter custom name (Optional)...' 
                                            onChange={this.handleChange}
                                        />
                                        <div className='eg'>(e.g &nbsp; fashsionweek7)</div>
                                        <div className='buttons'>
                                            <button className='btn2'>Shorten URL</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Homepage;