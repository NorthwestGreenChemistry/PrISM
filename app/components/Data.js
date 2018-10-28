import React, { Component } from 'react';


type Props = {};

const ALL_PRODUCTS = 'allProducts';
const EMPTY_OBJ = {};

class Data {

    static getInstance() {
        if (Data.singleton) {
            return Data.singleton;
        }

        Data.singleton = new Data();

        let openedIsDefined = localStorage.getItem('opened');
        if (!openedIsDefined) {
            localStorage.setItem('opened', 'false');
        }

        let stepsIsDefined = localStorage.getItem('steps');
        if (!stepsIsDefined) {
            //TODO: have to do this seven times and match files up correctly
            let introStep = {
                title: "Introduction and Design Principles",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/Introduction.md"],
            };

            localStorage.setItem("intro", JSON.stringify(introStep));

            let scopeStep = {
                title: "Scoping, Problem Formulation & Design Goals",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step1-scoping-and-goals.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions1.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions1_ui.json",
                nextStep: "2"
            };

            localStorage.setItem("1", JSON.stringify(scopeStep));

            let feedstockStep = {
                title: "Feedstock",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step2-feedstock.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions2.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions2_ui.json",
                nextStep: "3"
            };

            localStorage.setItem("2", JSON.stringify(feedstockStep));

            let productionStep = {
                title: "Introduction to Production and Manufacturing",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step3-production-manufacturing.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions3.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions3_ui.json",
                nextStep: "4"
            };

            localStorage.setItem("3", JSON.stringify(productionStep));

            let useStep = {
                title: "Sustainable Product Design for the Use Phase",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step4-use.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions4.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions4_ui.json",
                nextStep: "5"
            };

            localStorage.setItem("4", JSON.stringify(useStep));

            let endOfLifeStep = {
                title: "End of Life Considerations",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step5-end-of-life.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions5.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions5_ui.json",
                nextStep: "6"
            }

            localStorage.setItem("5", JSON.stringify(endOfLifeStep));

            let lifeCycleStep = {
                title: "Whole Product Assessment ",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step6-whole-product.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions6.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions6_ui.json",
                nextStep: "7"
            }

            localStorage.setItem("6", JSON.stringify(lifeCycleStep));

            let finalStep = {
                title: "Decision Analysis",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step7-evaluation-and-optimization.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions7.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions7_ui.json"
            };

            localStorage.setItem("7", JSON.stringify(finalStep));
        }

        return Data.singleton;
    }

    //returns key for next step
    getNextStep(step) {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.nextStep;
    }

    setPDFStepResults(id, step, schema, formData) {
        let storageId = "pdf-" + id;

        let pdfResults = localStorage.getItem(storageId);
        let stepKey = step + " " + schema.title;

        if (!pdfResults) {
            console.log('a set of pdf results does not exist');
            let steps = []
            let results = []
            Object.keys(schema.properties).forEach((e) => {
                // let nestedTitle = schema.properties[e].title
                var question = undefined;
                var answer = undefined;
                //temporarily ignoring all types that's NOT string + object
                if (schema.properties[e].type === 'string') {
                    question = schema.properties[e].title
                    console.log('type is string', question);
                    answer = formData[e];
                } else if (schema.properties[e].type === 'object') {
                    console.log('answer type is object', formData[e]);

                    Object.keys(schema.properties[e].properties).forEach((prop) => {
                        question = schema.properties[e].properties[prop].title;
                    })

                    //answer obj will always have one prop
                    Object.keys(formData[e]).forEach((prop) => {
                        answer = formData[e][prop]
                    })
                }

                if (question && answer) {
                    var qAndA = {
                        "question": question,
                        "answer": answer
                    }
                    results.push(qAndA);
                }
            })

            let stepsVar = {
                "title": stepKey,
                "completed": true, //TODO: hook up to Sam's code
                "results": results
            }
            steps.push(stepsVar)
            var fullObj = {
                "productName": this.getAllProducts()[id],
                "steps": steps
            }

            console.log('creating results for the first time', fullObj);
            localStorage.setItem(storageId, JSON.stringify(fullObj))
        } else {
            let pdfStepsString = localStorage.getItem(storageId);
            let pdfStepsObj = JSON.parse(pdfStepsString);

            var stepExists = -1;
            let stepsList = pdfStepsObj.steps;

            stepsList.some(function(el, index) {
                if (el.title === stepKey) {
                    stepExists = index;
                    console.log('updating a step thats in localStorage');
                    return true;
                }
            });


            if (stepExists > -1) {
                stepsList.splice(stepExists, 1);
            }

            let results = []


            Object.keys(schema.properties).forEach((e) => {
                var question = undefined;
                var answer = undefined;
                //temporarily ignoring all types that's NOT string + object
                if (schema.properties[e].type === 'string') {
                    question = schema.properties[e].title
                    console.log('type is string', question);
                    answer = formData[e];
                } else if (schema.properties[e].type === 'object') {
                    console.log('answer type is object', formData[e]);

                    Object.keys(schema.properties[e].properties).forEach((prop) => {
                        question = schema.properties[e].properties[prop].title;
                    })

                    //answer obj will always have one prop
                    Object.keys(formData[e]).forEach((prop) => {
                        answer = formData[e][prop]
                    })
                }

                if (question && answer) {
                    var qAndA = {
                        "question": question,
                        "answer": answer
                    }
                    results.push(qAndA);
                }
            })

            let stepsVar = {
                "title": stepKey,
                "completed": true, //TODO: hook up to Sam's code
                "results": results
            }

            stepsList.push(stepsVar)
            pdfStepsObj.steps = stepsList;

            console.log('the step + id already existed, new val is', pdfStepsObj)
            localStorage.setItem(storageId, JSON.stringify(pdfStepsObj));
        }
    }

    getPDFContent(id) {
        //todo: backfill the other empty sections
        let storageId = "pdf-" + id;
        let stepString = localStorage.getItem(storageId);
        if (!stepString) {
            return undefined;
        }

        return JSON.parse(stepString);
    }

    checkIfFirstTime() { //assumes that Data Constructor has already been called
        return localStorage.getItem('opened') === 'true';
    }

    getTitle = (step) => {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.title;
    }

    getQuestionFile = (step) => {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.questions;
    }

    getQuestionUIFile = (step) => {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.questionsUI;
    }

    getContentList = (step) => {
        let stepString = localStorage.getItem(step);
        if (!stepString) {
            return [];
        }
        let stepObj = JSON.parse(stepString);
        return stepObj.content;
    }

    createProduct = (id, prettyName) => {
        if (id === undefined || id === '') {
            return new Error;
        }

        let productTable = JSON.parse(localStorage.getItem(ALL_PRODUCTS));

        if (!productTable) {
            productTable = {};
        }

        productTable[id] = prettyName;
        localStorage.setItem(ALL_PRODUCTS, JSON.stringify(productTable));
    }

    // object id key and value prettyname
    getAllProducts = () => {
        return getNonNull(JSON.parse(localStorage.getItem(ALL_PRODUCTS)), {});
    }

    // returns map of all steps along with their answers
    getAnswers = (id) => {
        return getNonNull(JSON.parse(localStorage.getItem(id)), {});
    }

    storeAnswer = (id, stepKey, formData) => {
        let productExists = localStorage.getItem(id);
        if (!productExists) {
            let steps = {}
            steps[stepKey] = formData;
            localStorage.setItem(id, JSON.stringify(steps));
        } else {
            let stepsString = localStorage.getItem(id);
            let stepsObj = JSON.parse(stepsString);
            if (stepKey in stepsObj) {
                stepsObj[stepKey] = {
                    ...stepsObj[stepKey],
                    ...formData
                }
            } else {
                stepsObj[stepKey] = formData;
            }

            localStorage.setItem(id, JSON.stringify(stepsObj));
        }
    }
}


//helper function for picking non-null values
//out of two values. See getAnswers() and getProducts() for examples

//val should be a call that MAY evaluate to null
//val2 should NEVER be null
function getNonNull(val, val2) {
    if (typeof val == 'undefined' || val === null) {
        return val2
    }
    return val
}

export default Data;
