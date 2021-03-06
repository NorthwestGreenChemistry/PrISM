// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import routes from '../constants/routes';
import styles from './Home.css';
import Data from './Data';

type Props = {};


export default class Home extends Component<Props> {
    constructor(props) {
        super(props)
        this.data = Data.getInstance();
        this.state = {
            markdownFiles: []
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
                    mdFiles.push(<ReactMarkdown key={mdPath + 'intro'} source={text}/>)
                    console.log('updated md files', mdFiles);
                    this.setState({
                        markdownFiles: mdFiles
                    })
                });
        })
    }

    render() {
        return (
            <Paper className={styles.container} data-tid="container" elevation={1}>

                <div className={styles.intro} data-tid="intro">
                    <img src={require('../assets/ngc-logo.png')} />
                    <br />
                    <Button
                        component={Link} to={routes.PRISM}
                        className={styles.button}
                        onClick={() => {this.data.openedApp()}}
                        variant="contained" color="default"
                    >
                        Skip & Get Started &nbsp;
                        <i className="fa fa-arrow-right" />
                    </Button>
                    <div>
                        {this.state.markdownFiles.map(val => {
                            return val;
                            })
                        }
                    </div>
                    <hr />
                    <Button
                        component={Link} to={routes.PRISM}
                        className={styles.primaryButton}
                        onClick={() => {this.data.openedApp()}}
                        variant="contained" color="primary"
                    >
                        Get Started with PrISM &nbsp;
                        <i className="fa fa-arrow-right" />
                    </Button>
                </div>
            </Paper>
        );
    };
}
