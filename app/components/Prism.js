// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prism.css';
import routes from '../constants/routes';
import Data from './Data';
import Button from '@material-ui/core/Button';


type Props = {};


export default class Prism extends Component<Props> {
    constructor(props) {
        super(props);
        this.data = new Data();
        this.state = {
            steps: {
                '1': false,
                '2': false,
                '3': false
            },
            displayStep: 0
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let step = event.currentTarget.getAttribute('data-step');
        this.setState(state => ({
            displayStep: step
        }));
    }

    render() {
        this.data.checkIfFirstTime().then(value => {
            console.log('is this first time opening app?', value);
        });

        return (
            <div>
                <div className={styles.backButton} data-tid="backButton">
                    <Link to={routes.HOME}>
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </div>
                <div className={`currentStep ${styles.currentStep}`} data-tid="currentStep">
                    {this.state.displayStep}
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        data-step="1"
                        onClick={this.handleClick}
                    >
                        Open Step 1
                    </Button>
                    &nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        data-step="2"
                        onClick={this.handleClick}
                    >
                        Open Step 2
                    </Button>
                </div>
            </div>
        );
    }
}

