// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prism.css';
import routes from '../constants/routes';
import Data from './Data';

type Props = {
    openFile: () => void,
    saveFile: () => void,
    saveFileAs: () => void,
    exportAsPDF: () => void,
    openStep: () => void,
    currentStep: number
};

export default class Prism extends Component<Props> {
    props: Props;

    constructor(props) {
        super(props);
        this.data = new Data();
    }

    render() {
        this.data.checkIfFirstTime();

        const {
            openFile,
            saveFile,
            saveFileAs,
            exportAsPDF,
            openStep,
            currentStep
        } = this.props;
        return (
            <div>
                <div className={styles.backButton} data-tid="backButton">
                    <Link to={routes.HOME}>
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </div>
                <div className={`currentStep ${styles.counter}`} data-tid="currentStep">
                    {currentStep}
                </div>
            </div>
        );
    }
}
