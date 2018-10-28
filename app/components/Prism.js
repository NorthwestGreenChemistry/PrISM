// @flow
import path from 'path'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Prism.css'
import routes from '../constants/routes'
import Wheel from './Wheel'
import Progress from './Progress'
import Data from './Data'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from 'react-modal'
import Form from "react-jsonschema-form"
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import jsPDF from 'jspdf'
import electron from 'electron'


const ipcRenderer = electron.ipcRenderer;

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
            products: this.data.getAllProducts()
        }

        ipcRenderer.on('SAVE_PDF', this.makePDF.bind(this));

        console.log('INITIAL STATE', this.state)
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

    render() {
        let schema = null;
        let uiSchema = null;

        if (this.state.displayStep > 0) {
            let questionFile = this.data.getQuestionFile(this.state.displayStep);
            let questionUIFile = this.data.getQuestionUIFile(this.state.displayStep);

            try {
                schema = JSON.parse(fs.readFileSync(questionFile).toString());
                uiSchema = JSON.parse(fs.readFileSync(questionUIFile).toString());
            } catch(err) {
                console.log(err);
            }
        }

        let allAnswers = this.data.getAnswers(this.state.activeProductId);
        let formData = {}
        if (allAnswers && this.state.displayStep) {
            formData = allAnswers[this.state.displayStep]
        }

        return (
            <div>
                <Button className={styles.backButton} color="default" data-tid="backButton" >
                    <Link to={routes.HOME}>
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </Button>

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
                            <Button className={styles.createBtn} variant="outlined" color="primary" onClick={this.createProduct}>Create</Button>
                        </div> : null}
                </div>

                <Grid container className={styles.wheel} spacing={16}>
                    <Grid item xs={6}>
                        <Wheel onWheelClick={this.wheelClick} />
                    </Grid>
                    <Grid item xs={6}>
                        <h3>
                            Your Progress
                        </h3>

                        <Progress handleClick={this.handleClick} data={this.data} />
                        <hr />

                        <Button onClick={this.makePDF} className={styles.button} variant="contained" color="default">
                            Generate Report PDF
                        </Button>
                    </Grid>
                </Grid>

                <Modal isOpen={this.state.modalIsOpen} contentLabel="Step Modal">
                    <Button variant="outlined" onClick={this.closeModal}>close</Button>
                    <h2 className={styles.stepHeader}>{this.state.displayStep > 0 ? this.data.getTitle(this.state.displayStep) : null}</h2>
                    <div className={styles.contentMarkdown}>
                        {this.state.displayStep > 0 ? this.data.getContentList(this.state.displayStep).map((mdPath) => {
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
                    <h1 style={{textAlign: 'center'}}>Guiding Questions</h1>
                    {this.state.activeProductId && this.state.displayStep > 0 ?
                        <Form formData={formData}
                              schema={schema}
                              uiSchema={uiSchema}
                              onSubmit={this.submitAnswers}
                            /> : null}
                </Modal>
            </div>
        );
    }
}
