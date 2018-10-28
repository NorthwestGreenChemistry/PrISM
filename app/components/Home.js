// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import routes from '../constants/routes';
import styles from './Home.css';
import Data from './Data';

type Props = {};

export default class Home extends Component<Props> {
    props: Props;

    render() {
        return (
            <div className={styles.container} data-tid="container">
                <ReactMarkdown source="# Northwest Green Chemistry" />
                <Link to={routes.PRISM}> <i className="fa fa-arrow-right fa-3x" /> </Link>
            </div>
        );
    }
}
