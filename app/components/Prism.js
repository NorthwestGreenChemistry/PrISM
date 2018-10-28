// @flow
import path from 'path';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prism.css';
import routes from '../constants/routes';
import Wheel from './Wheel.js';
import Data from './Data';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import fs from 'fs';

const wheelUrl = path.join(__dirname, 'assets/prism-wheel.png');

Modal.setAppElement('#root');
type Props = {};


export default class Prism extends Component<Props> {

    constructor(props) {
        super(props)
        this.data = new Data()

        this.state = {
            modalIsOpen: false,
            steps: {
                '1': false,
                '2': false,
                '3': false
            },
            displayStep: "",
            dropdownSelection: "",
            activeProduct: "",
            productName: "",
            products: this.data.getAllProducts()
        }

        this.handleClick = this.handleClick.bind(this);
        this.wheelClick = this.wheelClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleClick(event) {
        if (this.state.activeProduct === "") {
            console.log('CHOOSE A PRODUCT!');
            return;
        }

        let step = event.currentTarget.getAttribute('data-step')
        this.setState(state => ({
            displayStep: step,
            modalIsOpen: true
        }))
        console.log('opening modal')
    }

    handleDropdownChange = (event) => {
        this.setState({
            dropdownSelection: event.target.value,
            activeProduct: event.target.key
        })
    }

    handleProductNameChange = (event) => {
        this.setState({ productName: event.target.value })
    }

    createProduct = (event) => {
        let id = this.uuidv4()
        this.data.createProduct(id, this.state.productName)
        this.setState({
            products: {
                ...this.data.getAllProducts(),
            },
            activeProduct: id,
            dropdownSelection: this.state.productName,
            productName: ""
        })
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    //generates random guuid, taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    wheelClick(step: number) {
        console.log('WE ARE CLICKED!!!');
        console.log(step);
    }

    render() {
        console.log('current directory', process.cwd());
        // console.log('markdown', file);
        return (
            <div>
                <div className={styles.backButton} data-tid="backButton">
                    <Link to={routes.HOME}>
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </div>

                <div className={styles.selector}>
                    <Select
                        className={styles.selectorDropdown}
                        value={this.state.dropdownSelection}
                        onChange={this.handleDropdownChange} >
                        {Object.keys(this.state.products).map((key) => {
                            return <MenuItem key={key} value={key}>{this.state.products[key]}</MenuItem>
                        })}
                        <MenuItem value="new-product">--New Product--</MenuItem>
                    </Select>

                    {this.state.dropdownSelection === 'new-product' ?
                        <div>
                            <TextField
                                label="Product Name"
                                value={this.state.productName}
                                onChange={this.handleProductNameChange}
                            />
                            <Button className={styles.createBtn} onClick={this.createProduct}>Create</Button>
                        </div> : null}
                </div>

                <div className={styles.wheel}>
                    <Wheel onWheelClick={this.wheelClick} />
                </div>
                <div className={`currentStep ${styles.currentStep}`} data-tid="currentStep">
                    {this.state.displayStep}

                    <Button
                        variant="contained"
                        color="primary"
                        data-step="intro"
                        onClick={this.handleClick}
                    >
                        Open Step 1
                    </Button>
                    &nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        data-step="scope"
                        onClick={this.handleClick}
                    >
                        Open Step 2
                    </Button>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className={styles.stepHeader}>{this.state.displayStep !== "" ? this.data.getTitle(this.state.displayStep) : null}</h2>
                    {this.state.displayStep !== "" ? this.data.getContentList(this.state.displayStep).map((mdPath) => {
                        let fullPath = `${__dirname}` + mdPath;

                        // const fullPath = path.join(path.dirname(__dirname), mdPath);
                        console.log('mdpath', fullPath);

                        var buf;
                        try {
                            buf = fs.readFileSync(fullPath);
                        } catch (err) {
                            console.log('error reading md file');
                        }

                        return <ReactMarkdown key={mdPath} source={buf.toString()} />
                        // fs.readFile(fullPath, function(err, data) {
                        //     console.log('err', err);
                        //     console.log('data to string', data.toString());
                        // });
                    }) : null}

                    <button onClick={this.closeModal}>close</button>
                </Modal>

            </div>
        );
    }
}

