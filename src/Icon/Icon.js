import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import check from '../assets/icons/check.js';


const ICONS = {
    check,
};

class Icon extends Component {
    static propTypes = {
        type    : PropTypes.string.isRequired,
        onClick : PropTypes.func
    }


    handleClick = e => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };

    render() {
        const { type, props } = this.props;
        const Svg = ICONS[type];
        const iconStyle = cx('Icon',{  [type] : type});

        return (
            <Svg className={iconStyle} onClick={this.handleClick} />
        );
    }
}

export default Icon;
