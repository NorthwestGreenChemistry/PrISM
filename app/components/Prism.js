// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prism.css';
import routes from '../constants/routes';
import Data from './Data';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

type Props = {};


export default class Prism extends Component<Props> {
    constructor(props) {
        super(props)
        this.data = new Data()

        this.state = {
            steps: {
                '1': false,
                '2': false,
                '3': false
            },
            displayStep: 0,
            dropdownSelection: "",
            activeProduct: "",
            productName: "",
            products: this.data.getAllProducts()
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        let step = event.currentTarget.getAttribute('data-step')
        this.setState(state => ({
            displayStep: step
        }))
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

    //generates random guuid, taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render() {
        // let products = this.data.getAllProducts();
        // let products = {abc: "test product", def:"another test product"};

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

