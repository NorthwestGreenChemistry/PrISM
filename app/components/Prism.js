// @flow
import path from 'path'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './Prism.css'
import routes from '../constants/routes'
import Wheel from './Wheel'
import Pdf from './Pdf'
import ProgressItem from './ProgressItem'
import Data from './Data'
import List from '@material-ui/core/List'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Snackbar from '@material-ui/core/Snackbar'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Modal from 'react-modal'
import Form from 'react-jsonschema-form'
import applyRules from 'react-jsonschema-form-conditionals'
import Engine from 'json-rules-engine-simplified'
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

    data = Data.getInstance()
    state = {
        alertOpen: false,
        modalIsOpen: false,
        displayStep: 0,
        dropdownSelection: "",
        activeProductId: "",
        productName: "",
        activeForm: {},
        modalForm: {},
        markdownFiles: [],
        products: this.data.getAllProducts()
    }

    constructor(props) {
        super(props)
        ipcRenderer.on('SAVE_PDF', this.makePDF.bind(this))
    }

    handleClick = (step) => {
        console.log('ACTIVE PRODUCT ID', this.state.activeProductId);
        if (!this.state.activeProductId || this.state.activeProductId === "") {
            this.setState({ alertOpen: true })
            return;
        }

        this.setState({
            displayStep: step,
            modalIsOpen: true
        })

        this.loadMDFiles(step)
        this.loadSchemaFiles(step)
    }

    handleClose = (reason) => {
        if (reason == 'new_product') {
            this.setState({
                dropdownSelection: 'new-product',
                activeProductId: 'new-product'
            })
        }
        this.setState({ alertOpen: false })
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
            activeProductId: id,
            dropdownSelection: id,
            productName: ""
        })
    }

    makePDF = () => {
        let pdfData = this.data.getPDFContent(this.state.activeProductId);
        if (!pdfData) {
            this.setState({ alertOpen: true })
            return null
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

    navPrev = () => {
        let prevStep = this.data.getPrevStep(this.state.displayStep);
        if (!prevStep) {
            return;
        }

        this.setState({
            displayStep: prevStep,
            markdownFiles: [],
            activeForm: {},
        })

        this.loadMDFiles(prevStep);
        this.loadSchemaFiles(prevStep);
    }

    navNext = (event) => {
        console.log(this.state.modalForm);
        console.log(event);
        this.state.modalForm.props.onSubmit(event);
    }

    submitAnswers = (form) => {
        this.data.storeAnswer(
            this.state.activeProductId,
            this.state.displayStep,
            this.state.modalForm.formData);


        this.data.setPDFStepResults(
            this.state.activeProductId,
            this.state.displayStep,
            this.state.modalForm.formData
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


        let rules = [];
        if (this.state.displayStep == 2 && this.state.activeForm.schema !== undefined) {
            rules = [
                {
                    "conditions": {
                        "Select the following attributes that describe the base feedstock:": {
                            or: [
                                "empty",
                                {not:
                                    {includes: "Biobased"}
                                }
                            ]
                        }
                    },
                    "event": {
                        "type": "remove",
                        "params": {
                            field: [
                                "Is the biobased feedstock rapidly renewable?",
                                "Is it certified sustainably harvested?",
                                "Is the biobased feedstock sustainably harvested, such as wood certified by the Forest Stewardship Council (FSC)?",
                                "If so, fill in the certification",
                                "Is it certified sustainably harvested?",
                                "Does the biobased feedstock compete for land use with social, ecological, or food production value?"
                            ]
                        }
                    }
                },
                {
                    "conditions": {
                        "Select the following attributes that describe the base feedstock:": {
                            or: [
                                "empty",
                                {not:
                                    {includes: "Waste/Recycled"}
                                }
                            ]
                        }
                    },
                    "event": {
                        "type": "remove",
                        "params": {
                            // field: [
                            //     "Do you use catalysts?"
                            // ]
                            field: [
                                "Is the recycled material post consumer?",
                                "Is the recycled material post industrial?",
                                "Does generation of your product from this feedstock result in downcycling, or does it maintain the value level, or increase the value level?",
                                "Have you requested information about the purity of the material? Some materials, such as those derived from mixed plastics may contain residual toxic chemicals that were added as flame retardants or plasticizers in the previous products"
                            ]
                        }
                    }
                }
            ]
        }
        let FormWithConditionals = applyRules(this.state.activeForm.schema,
            this.state.activeForm.uiSchema, rules, Engine)(Form);

        return (
            <div className={styles.root}>
                <Button component={Link} to={routes.HOME} className={styles.backButton} color="default" data-tid="backButton" >
                    <i className="fa fa-arrow-left fa-3x" />
                </Button>

                {/* PRODUCT MENU */}
                <FormControl variant="outlined" className={styles.selector}>
                    <InputLabel htmlFor="product_name" className={styles.defaultLabel}>
                        Product Name
                    </InputLabel>
                    <Select
                        className={styles.selectorDropdown}
                        value={this.state.dropdownSelection}
                        defaultValue=""
                        onChange={this.handleDropdownChange}
                        input={
                            <OutlinedInput
                                labelWidth={120}
                                value="Product Name"
                                name="product_name"
                                id="product_name"
                            />
                        }
                    >
                        {this.state.products != undefined ? Object.keys(this.state.products).map((key) => {
                            return <MenuItem className={styles.selectorOption} key={key} value={key}>{this.state.products[key]}</MenuItem>
                        }) : null }
                        <MenuItem className={styles.selectorOption} value="new-product">--New Product--</MenuItem>
                    </Select>
                </FormControl>

                {this.state.dropdownSelection === 'new-product' ?
                    <FormControl variant="outlined" className={styles.selector}>
                        <TextField
                            label="Product Name"
                            className={styles.createInput}
                            value={this.state.productName}
                            onChange={this.handleProductNameChange}
                        />
                        <Button className={styles.createButton}
                                variant="contained" color="primary"
                                onClick={this.createProduct}
                        >
                            Create
                        </Button>
                    </FormControl> : null
                }

                {/* PRISM WHEEL & STEPS */}
                <Grid container spacing={0}>
                    <Grid className={styles.wheel} item xs={7}>
                        <Wheel onWheelClick={this.wheelClick} />
                    </Grid>
                    <Grid className={styles.steps} item xs={5}>
                        <h3>
                            Your Progress
                        </h3>

                        <List component="nav">
                            {this.stepsData().map((step, index) => {
                                if (index > 6) { return null }
                                return <ProgressItem
                                            handleClick={this.handleClick}
                                            step={step} stepCounter={index + 1}
                                            key={'step_' + (index + 1)}
                                        />
                            })}
                        </List>
                        <hr />

                        <Button onClick={this.makePDF} className={styles.button}
                                variant="contained" color="default">
                            Generate Report PDF
                        </Button>
                    </Grid>
                </Grid>

                {/* FORM MODAL */}
                <Modal isOpen={this.state.modalIsOpen} contentLabel="Step Modal">
                    <div className={styles.navArrows}>
                        { this.state.displayStep > 1 &&
                            <Button onClick={this.navPrev}
                                    className={styles.leftButton}
                                    variant="contained" color="default"
                            >
                                <i className = "fa fa-arrow-left fa-3x" />
                                &nbsp; Back
                            </Button>
                        }
                        <h2 className={styles.stepHeader}>
                            {this.state.displayStep > 0 ? this.data.getTitle(this.state.displayStep) : null}
                        </h2>
                        { this.state.displayStep < 7 &&
                            <Button onClick={this.navNext}
                                    className={styles.rightButton}
                                    variant="contained" color="default"
                            >
                                Next &nbsp;
                                <i className = "fa fa-arrow-right fa-3x" />
                            </Button>
                        }
                    </div>
                    <Button className={styles.button} variant="outlined" onClick={this.closeModal}>
                        Close and Return to PrISM
                    </Button>

                    {/*markdown section*/}

                    <div className={styles.contentMarkdown}>
                        {this.state.displayStep > 0 ? this.state.markdownFiles.map((val) => {
                            return val;
                        }) : null}
                    </div>

                    {/*form section*/}

                    {this.state.activeProductId && this.state.displayStep > 0
                        && this.state.activeForm.schema && this.state.activeForm.uiSchema ?
                        <Fragment>
                            <h1 style={{textAlign: 'center'}}>Guiding Questions</h1>

                            <FormWithConditionals noValidate={true} formData={formData}
                                onSubmit={this.submitAnswers}
                                onError={(errors) => console.log("errors in form", errors)}
                                ref={(form) => {this.state.modalForm = form;}}
                            >
                                <button type="submit" className={styles.hidden}>Submit</button>
                            </FormWithConditionals>
                        </Fragment>: null
                    }

                    <div className={styles.navArrows}>
                        { this.state.displayStep > 1 &&
                            <Button onClick={this.navPrev}
                                    className={styles.leftButton}
                                    variant="contained" color="default"
                            >
                                <i className = "fa fa-arrow-left fa-3x" />
                                &nbsp; Back
                            </Button>
                        }

                        <Button onClick={this.navNext}
                                className={styles.rightButton}
                                variant="contained" color="primary">
                            Save and {this.state.displayStep < 7 ? 'Continue' : 'Close'} &nbsp;
                            <i className = "fa fa-arrow-right fa-3x" />
                        </Button>

                    </div>
                </Modal>

                {/* Alert No Product Name */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.alertOpen}
                    autoHideDuration={6000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    className={styles.alertPopup}
                    message={
                        <span id="message-id">
                            You must select or create a product
                        </span>
                    }
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={(e) => {this.handleClose('new_product')}}>
                            New Product
                        </Button>,
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={this.handleClose}
                        >
                            <Icon>close</Icon>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}
