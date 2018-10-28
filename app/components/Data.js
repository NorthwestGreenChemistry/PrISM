import React, { Component } from 'react';


type Props = {};

const ALL_PRODUCTS = 'allProducts';

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
            //have to do this seven times
            let introStep = {
                title: "Introduction and Design Principles",
                content: ["/content/Introduction.md"],
                questions: "app/assets/quiz/guiding_questions1.json",
                questionsUI: "app/assets/quiz/guiding_questions1_ui.json"
            };
            localStorage.setItem("1", JSON.stringify(introStep));

            let scopeStep = {
                title: "Scoping, Problem Formulation & Design Goals",
                content: ["/content/step1-scoping-and-goals.md"],
                questions: "app/assets/quiz/guiding_questions1.json",
                questionsUI: "app/assets/quiz/guiding_questions1_ui.json"
            };

            localStorage.setItem("2", JSON.stringify(scopeStep));

            let feedstockStep = {
                title: "Feedstock",
                content: ["/content/step2-feedstock.md"],
                questions: "app/assets/quiz/guiding_questions1.json",
                questionsUI: "app/assets/quiz/guiding_questions1_ui.json"
            };

            localStorage.setItem("3", JSON.stringify(feedstockStep));
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
        return getNonNull(JSON.parse(localStorage.getItem(ALL_PRODUCTS), {}));
    }

    // returns map of all steps along with their answers
    getAnswers = (id) => {
        console.log('calling get answers with', id);
        return getNonNull(JSON.parse(localStorage.getItem(id), {}));
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
    return val != null ? val : val2;
}

export default Data;
