// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import routes from '../constants/routes';
import styles from './Home.css';
import Data from './Data';

type Props = {};

export default class Home extends Component<Props> {
    constructor(props) {
        super(props)
        this.data = Data.getInstance();
        this.state = {
            modalIsOpen: false,
            displayStep: 0,
            dropdownSelection: "",
            activeProductId: "",
            productName: "",
            activeForm: {},
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
                    mdFiles.push(<ReactMarkdown key={mdPath + 'intro'} source={text} />)
                    console.log('updated md files', mdFiles);
                    this.setState({
                        markdownFiles: mdFiles
                    })
                });
        })
    }

    render() {
        return <div className={styles.container} data-tid="container">
                    <div className={styles.contentMarkdown}>
                        <Link to={routes.PRISM}>
                            {' '}
                            <i className="fa fa-arrow-right fa-3x" />{' '}
                        </Link>
                        {this.state.markdownFiles.map(val => {
                            return val;
                        })}
                    </div>
                </div>;
    };
}
