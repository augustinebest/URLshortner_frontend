import React, { Component, Fragment } from 'react';
import Alerts from '../Components/Alert/Alert'
import Navbar from './Navbar.js';
import Content from './Content';
import Footer from './Footer';
import validate from '../Factories/Validate';
import './Style.css';
import axios from 'axios';
import './Alert/Script';
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
            ol: null,
            status: false
        }
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
        this.setState({loading: true});
        if(!validate('url', url)) {
            this.setState({ error: 'This URL format is invalid!', status: true, loading: false});
            setTimeout(()=> {
                this.setState({ error: null, status: false});
            }, 4000)
        } else if(string === '') {
            this.canSubmit();
        } else if(!validate('string', string)) {
            this.setState({error: 'Custom Name format is invalid!', status: true, loading: false})
            setTimeout(()=> {
                this.setState({ error: null, status: false});
            }, 4000)
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
                this.setState({ error: res.data.message, link: res.data.link, ol: res.data.ol, status: true, loading: false });
                setTimeout(()=> {
                    this.setState({ error: null, status: false});
                }, 4000)
            } else {
                this.setState({ error: res.data.message, link: res.data.link, ol: res.data.ol, status: true, loading: false });
                setTimeout(()=> {
                    this.setState({ error: null, status: false});
                }, 4000)
            }
        })
    }

    focus = () => {
        this.setState({ link: null })
    }

    render() {
        const { error, link, ol, status, loading } = this.state;
        return (
            <Fragment>
                <Navbar />
                    <div className='row'>
                        <div className='column'>
                            <div className='left_section'>
                                URL SHORTNER
                            </div>
                        </div>
                        <div className='column'>
                            <div className='right_section'>
                                <div className='right_content'>
                                    <form onSubmit={this.submit} className='form'>
                                    {
                                        error && status && <Alerts text={error} />
                                    }
                                        <input 
                                            type='text' 
                                            name='url'
                                            placeholder='Enter long URL...' 
                                            onChange={this.handleChange}
                                            onFocus={this.focus}
                                            required
                                        /><br /><br />
                                        
                                        <input 
                                            type='text' 
                                            name='string'
                                            placeholder='Enter custom name (Optional)...' 
                                            onChange={this.handleChange}
                                        />
                                        <div className='eg'>(e.g &nbsp; fashsionweek7)</div>
                                        {
                                            link &&
                                            <div className='links'>visit: <a href={ol} target='_blank'>{link}</a></div>
                                        }
                                        <div className='buttons'>
                                            <button  className={!loading ? 'btn2' : 'btn3'}>{!loading ? <span>Shorten URL</span> : <span className='loading'>Loading...</span> }</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Content />
                <Footer />
            </Fragment>
        )
    }
}

export default Homepage;