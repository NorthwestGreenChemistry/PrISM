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
        this.data = Data.getInstance()

        this.state = {
            modalIsOpen: false,
            displayStep: 0,
            dropdownSelection: "",
            activeProduct: this.data.getDefault(),
            productName: "",
            products: this.data.getAllProducts()
        }

        this.handleClick = this.handleClick.bind(this);
        this.wheelClick = this.wheelClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleClick(step) {
        if (this.state.activeProduct === "") {
            //TODO: display warning to the user that they have to select a product
            console.log('CHOOSE A PRODUCT!');
            return;
        }

        this.setState({
            displayStep: step,
            modalIsOpen: true
        })
    }

    handleDropdownChange = (event) => {
        this.setState({
            dropdownSelection: event.target.value,
            activeProduct: event.target.key
        })
        // this.data.setDefault(event.target.key) //TODO: fix this, setting default not working
    }

    handleProductNameChange = (event) => {
        this.setState({ productName: event.target.value })
    }

    createProduct = () => {
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
        this.setState({modalIsOpen: false})
    }

    //generates random guuid, all credit goes to
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    wheelClick(step) {
        this.handleClick(step);
    }

    render() {
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

                <Modal isOpen={this.state.modalIsOpen} contentLabel="Step Modal">
                    <h2 className={styles.stepHeader}>{this.state.displayStep > 0 ? this.data.getTitle(this.state.displayStep) : null}</h2>
                    <div className={styles.contentMarkdown}>
                        {this.state.displayStep !== "" ? this.data.getContentList(this.state.displayStep).map((mdPath) => {
                            let fullPath = `${__dirname}` + mdPath;
                            var buf;
                            try {
                                buf = fs.readFileSync(fullPath);
                            } catch (err) {
                                console.log('error reading md file');
                            }
                            return <ReactMarkdown key={mdPath} source={buf.toString()} />
                        }) : null}
                    </div>
                    <Button onClick={this.closeModal}>close</Button>
                </Modal>

            </div>
        );
    }
}
