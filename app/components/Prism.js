// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prism.css';
import routes from '../constants/routes';
import Button from '@material-ui/core/Button';


type Props = {};


export default class Prism extends Component<Props> {
    constructor(props) {
        super(props);
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
        console.log('EVENT====');
        console.log(event);
        let step = 1; // ToDo: get step from event
        this.setState(state => ({
            displayStep: step
        }));
    }

    render() {
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
                        onClick={(e) => this.handleClick(e)}
                    >
                        Open Step 1
                    </Button>
                </div>
            </div>
        );
    }
}

