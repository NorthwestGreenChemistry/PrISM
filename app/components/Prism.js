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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
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
import NWChemLogo from '../assets/ngc-logo.png';


const ipcRenderer = electron.ipcRenderer;

Modal.setAppElement('#root');

const STEP_TITLES = [
    "01 Design Goals", "02 Feedstock", "03 Production", "04 Use",
    "05 End of Life", "06 Whole Product", "07 Evaluation & Optimization"
];


export default class Prism extends Component<Props> {

    data = Data.getInstance()
    state = {
        alertOpen: false,
        deleteDialogOpen: false,
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
    submitAnswersCallback = null

    constructor(props) {
        super(props);
        ipcRenderer.on('SAVE_PDF', this.makePDF.bind(this));
        ipcRenderer.on('EXPORT', this.exportProduct.bind(this));
        ipcRenderer.on('IMPORT', this.importProduct.bind(this));
    }

    handleClick = (step) => {
        if (!this.state.activeProductId
            || this.state.activeProductId === ""
            || this.state.activeProductId === "new-product") {
            this.setState({ alertOpen: true })
            return;
        }

        this.setState({
            displayStep: step,
            modalIsOpen: true
        })

        this.loadMDFiles(step);
        this.loadSchemaFiles(step);
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
            activeProductId: event.target.value,
            alertOpen: false
        })
    }

    handleProductNameChange = (event) => {
        this.setState({ productName: event.target.value })
    }

    createProduct = () => {
        let id = this.data.uuidv4()
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

    exportProduct = (event, file) => {
        if (this.state.activeProductId && this.state.activeProductId !== "new-product") {
            this.data.exportProduct(this.state.activeProductId, file);
        } else {
            this.setState({
                alertOpen: true
            });
        }
    }

    importProduct = (event, files) => {
        const id = this.data.importProduct(files[0]);

        this.setState({
            products: {
                ...this.data.getAllProducts(),
            },
            activeProductId: id,
            dropdownSelection: id,
            productName: ""
        });
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

    warnDeleteProduct = () => {
        this.setState({deleteDialogOpen: true});
    }

    deleteProduct = () => {
        this.setState({deleteDialogOpen: false});
        this.data.deleteProduct(this.state.activeProductId);
        this.setState({
            products: {
                ...this.data.getAllProducts()
            },
            activeProductId: "",
            dropdownSelection: "",
            productName: ""
        });
    }

    handleDeleteClose = () => {
        this.setState({deleteDialogOpen: false});
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
        });

        this.loadMDFiles(prevStep);
        this.loadSchemaFiles(prevStep);
    }


    // goes to next page in the navigation, does not save answers
    navNext = () => {
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

    navPrevHandler = (event) => {
        this.submitAnswersCallback = this.navPrev;
        this.state.modalForm.props.onSubmit(event);
    }

    navNextHandler = (event) => {
        this.submitAnswersCallback = this.navNext;
        this.state.modalForm.props.onSubmit(event);
    }

    navCloseHandler = (event) => {
        this.submitAnswersCallback = this.closeModal;
        this.state.modalForm.props.onSubmit(event);
    }

    submitAnswers = (form) => {
        let productId = this.state.activeProductId,
            step = this.state.displayStep;

        this.data.storeAnswer(
            productId,
            step,
            this.state.modalForm.formData
        );

        this.data.setPDFStepResults(
            productId,
            step,
            this.state.modalForm.formData
        );

        if (typeof this.submitAnswersCallback == 'function') {
            this.submitAnswersCallback();
            this.submitAnswersCallback = null;
        }
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            markdownFiles: [],
            activeForm: {},
        })
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
                    mdFiles.push(<ReactMarkdown
                        key={mdPath + step}
                        source={text} />)
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
            let questionRulesFile = this.data.getQuestionRulesFile(step);

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

            if (questionRulesFile) {
                fetch(questionRulesFile)
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((json) => {
                        let formSchemaObj = {...this.state.activeForm}
                        formSchemaObj.rules = json
                        console.log(json);
                        this.setState(prevState => ({activeForm: formSchemaObj}))
                    });
            }
        }
    }

    render() {
        let allAnswers = this.data.getAnswers(this.state.activeProductId);
        let formData = {}
        if (allAnswers && this.state.displayStep) {
            formData = allAnswers[this.state.displayStep]
        }


        let rules = [];
        if (this.state.activeForm.rules) {
            rules = this.state.activeForm.rules;
        }

        let FormWithConditionals;
        if (this.state.activeProductId && this.state.displayStep > 0
                && this.state.activeForm.schema && this.state.activeForm.uiSchema) {
            FormWithConditionals = applyRules(this.state.activeForm.schema,
                this.state.activeForm.uiSchema, rules, Engine)(Form);
        }

        return (
            <div className={styles.root}>
                <div className={styles.headerBar}>

                    <Button component={Link} to={routes.HOME} className={styles.backButton} color="default" data-tid="backButton" >
                        <i className="fa fa-arrow-left fa-3x" />
                    </Button>

                    <img src={NWChemLogo} className={styles.logoImg}/>

                    {/* PRODUCT MENU */}
                    <FormControl variant="outlined" className={styles.selector}>
                        <InputLabel htmlFor="product_name" className={styles.defaultLabel}>
                            Product Name
                        </InputLabel>
                        <Select
                            className={styles.selectorDropdown}
                            value={this.state.dropdownSelection}
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


                </div>
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

                        {(this.state.dropdownSelection !== "" && this.state.dropdownSelection !== "new-product") ?
                        <Button onClick={this.warnDeleteProduct} className={styles.button}
                            variant="contained" color="default">
                            Delete Product
                        </Button> : null }
                    </Grid>
                </Grid>

                {/* FORM MODAL */}
                <Modal isOpen={this.state.modalIsOpen} contentLabel="Step Modal">
                    <div className={styles.navArrows}>
                        { this.state.displayStep > 1 &&
                            <Button onClick={this.navPrevHandler}
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
                            <Button onClick={this.navNextHandler}
                                    className={styles.rightButton}
                                    variant="contained" color="default"
                            >
                                Next &nbsp;
                                <i className = "fa fa-arrow-right fa-3x" />
                            </Button>
                        }
                    </div>
                    <Button className={styles.button} variant="outlined" onClick={this.navCloseHandler}>
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
                            <FormWithConditionals noValidate={true}
                                formData={formData}
                                onSubmit={this.submitAnswers}
                                onError={(errors) => console.log("errors in form", errors)}
                                ref={(form) => {this.state.modalForm = form;}}>
                                <button type="submit" className={styles.hidden}>Submit</button>
                            </FormWithConditionals>
                        </Fragment>: null
                    }

                    <div className={styles.navArrows}>
                        { this.state.displayStep > 1 &&
                            <Button onClick={this.navPrevHandler}
                                    className={styles.leftButton}
                                    variant="contained" color="default"
                            >
                                <i className = "fa fa-arrow-left fa-3x" />
                                &nbsp; Back
                            </Button>
                        }

                        <Button onClick={this.navNextHandler}
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
                {/* Dialog warning for deleting items */}
                <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDeleteClose}
                >
                    <DialogTitle>{'Are you sure you want to delete product "' + this.state.products[this.state.dropdownSelection] + '"?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You won't be able to undo this action.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteProduct}>Yes</Button>
                        <Button onClick={this.handleDeleteClose}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
