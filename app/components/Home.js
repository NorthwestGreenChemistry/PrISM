// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import routes from '../constants/routes';
import styles from './Home.css';
import Data from './Data';
import Button from '@material-ui/core/Button';

type Props = {};

export default class Home extends Component<Props> {
    constructor(props) {
        super(props)
        this.data = Data.getInstance();
        this.state = {
            markdownFiles: [],
            showIntro: false
        };
        this.fetchIntroMarkdown();
    }

    fetchIntroMarkdown = () => {
        this.data.getContentList('intro').map((mdPath) => {
            fetch(mdPath)
                .then((resp) => {
                    return resp.text();
                })
                .then((text) => {
                    let mdFiles = this.state.markdownFiles;
                    mdFiles.push(<ReactMarkdown key={mdPath + 'intro'} source={text} />)
                    console.log('updated md files', mdFiles);
                    this.setState({
                        markdownFiles: mdFiles
                    })
                });
        })
    }

    toggleIntro = () => {
        this.setState({
            showIntro: !this.state.showIntro
        });
    }

    render() {
        return <div className={styles.container} data-tid="container">
                    <div className={styles.contentMarkdown}>
                        {!this.data.checkIfFirstTime() ? <Button variant="outlined" onClick={this.toggleIntro}>Show Intro</Button> : null}
                        <Link to={routes.PRISM} onClick={() => {this.data.openedApp()}}>
                            {' '}
                            <i className="fa fa-arrow-right fa-3x" />{' '}
                        </Link>
                        {this.data.checkIfFirstTime() || this.state.showIntro ? this.state.markdownFiles.map(val => {
                            return val;
                        }) : null}
                    </div>
                </div>;
    };
}
