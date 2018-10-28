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
import jsPDF from 'jspdf'
import Form from "react-jsonschema-form";

const wheelUrl = path.join(__dirname, 'assets/prism-wheel.png');

Modal.setAppElement('#root');
type Props = {};


export default class Prism extends Component<Props> {

    constructor(props) {
        super(props)
        this.data = Data.getInstance()

        console.log('get all products', this.data.getAllProducts());
        this.state = {
            modalIsOpen: false,
            displayStep: 0,
            dropdownSelection: "",
            activeProductId: "",
            productName: "",
            activeForm: {},
            markdownFiles: [],
            products: this.data.getAllProducts()
        }

        console.log('INITIAL STATE', this.state);
    }

    handleClick = (step) => {
        console.log('ACTIVE PRODUCT ID', this.state.activeProductId);
        if (!this.state.activeProductId || this.state.activeProductId === "") {
            //TODO: display warning to the user that they have to select a product
            console.log('CHOOSE A PRODUCT!')
            return;
        }

        this.setState({
            displayStep: step,
            modalIsOpen: true
        })

        this.loadMDFiles(step);
        this.loadSchemaFiles(step);
    }

    handleDropdownChange = (event) => {
        console.log('inside of handle dropdown change', event.target.value);
        this.setState({
            dropdownSelection: event.target.value,
            activeProductId: event.target.value
        })
    }

    handleProductNameChange = (event) => {
        this.setState({ productName: event.target.value })
    }

    createProduct = () => {
        let id = this.uuidv4()
        this.data.createProduct(id, this.state.productName)
        console.log('creating product', this.state.productName);
        console.log('all products', this.data.getAllProducts());
        this.setState({
            products: {
                ...this.data.getAllProducts(),
            },
            activeProductId: "",
            dropdownSelection: this.state.productName,
            productName: ""
        })
    }

    makePDF = () => {
        var doc = new jsPDF()

        doc.text('Hello world!', 10, 10)
        doc.save('a4.pdf')
    }

    submitAnswers = (form) => {
        this.data.storeAnswer(this.state.activeProductId,
            this.state.displayStep,
            form.formData);
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    //generates random guuid, all credit goes to
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    wheelClick = (step) => {
        this.handleClick(step);
    }


    //takes in list of files
    loadMDFiles = (step) => {
        this.data.getContentList(step).map((mdPath) => {
            fetch(mdPath)
                .then((resp) => {
                    return resp.text();
                })
                .then((text) =>{
                    let mdFiles = this.state.markdownFiles;
                    mdFiles.push(<ReactMarkdown key={mdPath} source={text}/>)
                    console.log('updated md files', mdFiles);
                    this.setState({
                        markdownFiles: mdFiles
                    })
                });
        })
    }

    //takes in list of files
    loadSchemaFiles = (step) => {
        if (step > 0) {
            let questionFile = this.data.getQuestionFile(step);
            let questionUIFile = this.data.getQuestionUIFile(step);

            fetch(questionFile)
                .then((resp) => {
                    return resp.json();
                })
                .then((json) =>{
                    console.log('grabbing json', json)
                    var formSchemaObj = {...this.state.activeForm}
                    formSchemaObj.schema = json
                    this.setState({formSchemaObj})
                })

            fetch(questionUIFile)
                .then((resp) => {
                    return resp.json();
                })
                .then((json) =>{
                    // console.log('grabbing json', json);
                    // this.setState({
                    //     activeForm: {
                    //         ...this.state.activeForm,
                    //         uiSchema: json
                    //     }
                    // })

                    console.log('grabbing json ui schema', json)
                    var formSchemaObj = {...this.state.activeForm}
                    formSchemaObj.uiSchema = json
                    this.setState({formSchemaObj})
                })
        }
    }


    render() {
        console.log('state change!', this.state.activeForm);
        let allAnswers = this.data.getAnswers(this.state.activeProductId);
        let formData = {}
        if (allAnswers && this.state.displayStep) {
            formData = allAnswers[this.state.displayStep]
        }

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
                        onChange={this.handleDropdownChange}  >
                        {this.state.products != undefined ? Object.keys(this.state.products).map((key) => {
                            return <MenuItem key={key} value={key}>{this.state.products[key]}</MenuItem>
                        }) : null }
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

                    <Button onClick={this.makePDF}>
                        Making the PDF's!
                    </Button>
                </div>

                <Modal isOpen={this.state.modalIsOpen} contentLabel="Step Modal">
                    <Button onClick={this.closeModal}>close</Button>
                    <h2 className={styles.stepHeader}>{this.state.displayStep > 0 ? this.data.getTitle(this.state.displayStep) : null}</h2>
                    <div className={styles.contentMarkdown}>
                        {this.state.displayStep > 0 ? this.state.markdownFiles.map((val) => {
                            return val;
                        }) : null}
                    </div>
                    <h1 style={{textAlign: 'center'}}>Guiding Questions</h1>
                    {this.state.activeProductId && this.state.displayStep > 0
                        && this.state.activeForm.schema && this.state.activeForm.uiSchema ?
                        <Form formData={formData}
                              schema={this.state.activeForm.schema}
                              uiSchema={this.state.activeForm.uiSchema}
                              onSubmit={this.submitAnswers}
                            /> : null}
                </Modal>

            </div>
        );
    }
}
