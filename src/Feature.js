import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Feature.css';
import classNames from 'classnames';

const cx = classNames.bind();

export default class Feature extends Component {
    static propTypes = {
        imgType: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };
    state={
        hover: false
    }

    hoverOn = () => {
        this.setState({ hover: true });
    };

    hoverOff= () => {
        this.setState({ hover: false });
    };

    render() {
        const {imgType,text} = this.props;
        const {hover} = this.state;
        const featureClasses = cx('Feature', { [imgType]: imgType },{hover:hover});
        console.log(featureClasses);
        return (
            <div className={featureClasses}
                 onMouseEnter={this.hoverOn}
                 onMouseLeave={this.hoverOff}>
                <div className={'Feature_Text'}>
                    <p>{text}</p>
                </div>
            </div>
        );
    }
}
