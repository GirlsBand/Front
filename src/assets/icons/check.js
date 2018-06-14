import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';


export default class Check extends PureComponent {
    static propTypes = {
        className : PropTypes.string
    }

    static defaultProps = {
        className : ''
    }

    render() {
        const { className } = this.props;

        return (
            <svg width="40" height="29" viewBox='0 0 40 29' fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.625 14.158L14.687 25.5 36.625 3"
                      stroke="#fff"
                      strokeWidth="8"
                      strokeLinejoin="bevel"/>
            </svg>
        );
    }
}
