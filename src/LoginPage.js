import React, {Component} from 'react';
import {withRouter} from 'react-router'
import Feature from './Feature.js'
import PropTypes from 'prop-types';
import './LoginPage.css';


class LoginPage extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        accessToken: ''
    }

    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: 193302211282683,
                cookie: true,
                xfbml: true,
                version: 'v3.0'
            });

            window.FB.Event.subscribe('auth.StatusChange', (response) => {
                if (response.authResponse) {
                    this.updateLoggedInState(response)
                } else {
                    this.updateLoggedOutState()
                }
            })
        }.bind(this)
    }
    checkLoginState = () => {
        const {history} = this.props;
        window.FB.login((response) => {
            if (response) {
                if (response.status == "connected") {
                    console.log(response.authResponse.accessToken);
                    history.push({
                        pathname: '/form',
                        state: {token: response.authResponse.accessToken}
                    })
                } else {
                    console.log("You are not login")
                }
            }
        }, {scope: 'user_tagged_places'});
    };

    renderLoginBlock = () => {
        return (
            <div className="LoginPage_Login">
                <div className="LoginPage_Title">
                    <h3>Welcome</h3>
                </div>
                <div className="LoginPage_Text">
                    <p className="LoginPage_Text_Paragraph">
                        We'll analyze different aspects of your life,<br/>
                        your habits and preferences to choose the best home specially for you
                    </p>
                    <p className="LoginPage_Text_Paragraph">
                        Just let us use your social network data to suggest the best accommodation
                    </p>
                </div>
                <div className="FbButton" onClick={this.checkLoginState}>
                    <div
                        className="fb-login-button"
                        data-max-rows="1"
                        data-size="large"
                        data-button-type="continue_with"
                        data-show-faces="false"
                        data-auto-logout-link="false"
                        data-use-continue-as="false">
                    </div>
                </div>
            </div>
        )
    };

    renderMasonry = () => {
        return(
            <div className='Masonry_Layout'>
                <div className='Masonry_Panel-Left'>
                    <Feature imgType='map' text='Show best region on the map' />
                </div>
                <div className='Masonry_Panel-Right'>
                    <div className='Masonry_Block'>
                        <Feature imgType='aerial' text='Countryside or city?' />
                        <Feature imgType='banknotes' text='Choose best price' />
                    </div>
                    <div className='Masonry_Block'>
                        <Feature imgType='ny' text='Appartment near your work' />
                    </div>
                </div>
            </div>
        )
    };

    renderFooter = () => {
        return(
            <div className="LoginPage_Footer">
                <div className='LoginPage_Footer_Nav'>
                    Best recommendations for apartments issue <br/>
                    | IASA |
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className={ 'LoginPage' }>
                <div className={ 'LoginPage_Wrapper' }>
                    <div className={ 'LoginPage_Header' }>
                        {/* <div className={ 'LoginPage_Header_Nav' }>
                            <a>About</a>
                            <a>Try it</a>
                            <a>Contacts</a>
                        </div> */}
                        <div className={ 'LoginPage_Header_Container' }>
                            <p>New personal real estate suggester. <br/>
                                We`ll help you find your new home
                            </p>
                        </div>
                    </div>
                    {this.renderLoginBlock()}
                    {this.renderMasonry()}
                    {this.renderFooter()}
                    </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
