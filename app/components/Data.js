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
                content: ["/content/Introduction.md"]
            };
            localStorage.setItem("intro", JSON.stringify(introStep));

            let scopeStep = {
                title: "Scoping, Problem Formulation & Design Goals",
                content: ["/content/step1-scoping-and-goals.md"],
                questions: "app/assets/quiz/guiding_questions1.json",
                questionsUI: "app/assets/quiz/guiding_questions1_ui.json"
            };

            localStorage.setItem("1", JSON.stringify(scopeStep));

            let feedstockStep = {
                title: "Feedstock",
                content: ["/content/step2-feedstock.md"],
                questions: "app/assets/quiz/guiding_questions2.json",
                questionsUI: "app/assets/quiz/guiding_questions2_ui.json"
            };

            localStorage.setItem("2", JSON.stringify(feedstockStep));

            let productionStep = {
                title: "Sustainable Product Design for the Use Phase",
                content: ["/content/step3-production-manufacturing.md"],
                questions: "app/assets/quiz/guiding_questions3.json",
                questionsUI: "app/assets/quiz/guiding_questions3_ui.json"
            };

            localStorage.setItem("3", JSON.stringify(productionStep));

            let useStep = {
                title: "Sustainable Product Design for the Use Phase",
                content: ["/content/step4-use.md"],
                questions: "app/assets/quiz/guiding_questions4.json",
                questionsUI: "app/assets/quiz/guiding_questions4_ui.json"
            };

            localStorage.setItem("4", JSON.stringify(useStep));

            let endOfLifeStep = {
                title: "Sustainable Product Design for the Use Phase",
                content: ["/content/step5-end-of-life.md"],
                questions: "app/assets/quiz/guiding_questions5.json",
                questionsUI: "app/assets/quiz/guiding_questions5_ui.json"
            }

            localStorage.setItem("5", JSON.stringify(endOfLifeStep));

            let lifeCycleStep = {
                title: "Introduction to Life Cycle Thinking and Life Cycle Assessment",
                content: ["/content/step6-whole-product.md"],
                questions: "app/assets/quiz/guiding_questions6.json",
                questionsUI: "app/assets/quiz/guiding_questions6_ui.json"
            }

            localStorage.setItem("6", JSON.stringify(lifeCycleStep));

            let finalStep = {
                title: "Decision Analysis",
                content: ["/content/step7-evaluation-and-optimization.md"],
                questions: "app/assets/quiz/guiding_questions7.json",
                questionsUI: "app/assets/quiz/guiding_questions7_ui.json"
            };

            localStorage.setItem("7", JSON.stringify(finalStep));
        }

        return Data.singleton;
    }

    setDefault(id) {
        localStorage.setItem("defaultId", id);
    }

    //string representing previously active product id
    getDefault() {
        return getNonNull(localStorage.getItem("defaultId"), "");
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
        console.log('calling get answers with', id);
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
