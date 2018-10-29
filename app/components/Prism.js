// @flow
import path from 'path'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Prism.css'
import routes from '../constants/routes'
import Wheel from './Wheel'
import Pdf from './Pdf';
import ProgressItem from './ProgressItem'
import Data from './Data'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Modal from 'react-modal'
import Form from "react-jsonschema-form"
import ReactMarkdown from 'react-markdown'
import electron from 'electron'


const ipcRenderer = electron.ipcRenderer;

Modal.setAppElement('#root');

type Props = {};

const STEP_TITLES = [
    "01 Design Goals", "02 Feedstock", "03 Production", "04 Use",
    "05 End of Life", "06 Whole Product", "07 Evaluation & Optimization"
];


export default class Prism extends Component<Props> {

    constructor(props) {
        super(props)
        this.data = Data.getInstance()

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

        ipcRenderer.on('SAVE_PDF', this.makePDF.bind(this));
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
        let pdfData = this.data.getPDFContent(this.state.activeProductId);
        if (!pdfData) {
            //TODO: notify user when there's no active id
            console.log('UH-OH, need no pdf data');
            return;
        }
        let pdf = new Pdf(pdfData);
        pdf.savePdf();
    }

    stepsData = () => {
        //TODO: pull title names from data? Perhaps "displayName" field?
        let result = [];
        const id = this.state.activeProductId;

        for (let i = 0; i <= STEP_TITLES.length; i++) {
            result[i] = {
                "title": STEP_TITLES[i],
                "completed": this.data.isStepCompleted(id, (i + 1).toString())
            }
        }
        return result;
    }

    submitAnswers = (form) => {
        console.log('submit answers! ', form);
        this.data.storeAnswer(
            this.state.activeProductId,
            this.state.displayStep,
            form.formData);

        this.data.setPDFStepResults(
            this.state.activeProductId,
            this.state.displayStep,
            form.schema,
            form.formData
        );

        let nextStep = this.data.getNextStep(this.state.displayStep);

        if (!nextStep) { //if there's no next step then we're on the final step
            this.closeModal();
            return;
        }

        this.setState({
            displayStep: nextStep,
            markdownFiles: [],
            activeForm: {},
        })

        this.loadMDFiles(nextStep);
        this.loadSchemaFiles(nextStep);
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            markdownFiles: [],
            activeForm: {},
        })
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
                    mdFiles.push(<ReactMarkdown key={mdPath + step} source={text}/>)
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
                    var formSchemaObj = {...this.state.activeForm}
                    formSchemaObj.schema = json
                    this.setState(prevState => ({activeForm: formSchemaObj}))
                })

            fetch(questionUIFile)
                .then((resp) => {
                    return resp.json();
                })
                .then((json) =>{
                    var formSchemaObj = {...this.state.activeForm}
                    formSchemaObj.uiSchema = json
                    this.setState(prevState => ({activeForm: formSchemaObj}))
                })
        }
    }

    render() {
        let allAnswers = this.data.getAnswers(this.state.activeProductId);
        let formData = {}
        if (allAnswers && this.state.displayStep) {
            formData = allAnswers[this.state.displayStep]
        }

        //TODO: make guiding questions header hide if there is no forms

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
                        onChange={this.handleDropdownChange}
                    >
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

                        <List component="nav">
                            {this.stepsData().map((step, index) => {
                                return <ProgressItem handleClick={this.handleClick} step={step} stepCounter={index + 1} key={'step_' + (index + 1)} />
                            })}
                        </List>
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
                        {this.state.displayStep > 0 ? this.state.markdownFiles.map((val) => {
                            return val;
                        }) : null}
                    </div>
                    <h1 style={{textAlign: 'center'}}>Guiding Questions</h1>
                    {this.state.activeProductId && this.state.displayStep > 0
                        && this.state.activeForm.schema && this.state.activeForm.uiSchema ?
                        <Form noValidate={true} formData={formData}
                              schema={this.state.activeForm.schema}
                              uiSchema={this.state.activeForm.uiSchema}
                              onSubmit={this.submitAnswers}
                            /> : null}
                </Modal>
            </div>
        );
    }
}
