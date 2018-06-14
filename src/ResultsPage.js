import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './ResultPage.scss';


export default class ResultPage extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className={styles.ResultPage}>

            </div>
        );
    }
}
