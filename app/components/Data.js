import React, { Component } from 'react';

// var localStorage = require('localStorage');

let myValue = {stuff: 'stuff'};

localStorage.setItem('myKey', JSON.stringify(myValue));

type Props = {};


const stepSchema = {
    "title": "step schema",
    "version": 0,
    "description": "describes step or resources for PRISM",
    "type": "object",
    "properties": {
        "step": {
            "type": "string",
            "primary": true
        },
        "title": {
            "type": "string",
        },
        "content": {
            "type": "array"
        },
        "questions": {
            "type": "object"
        }
    }
};

const answerSchema = {};

class Data {

    constructor() {
        if (Data.singleton) {
            console.log('already created');
            return Data.singleton;
        }

        Data.singleton = this;

        let openedIsDefined = localStorage.getItem('opened');
        if (!openedIsDefined) {
            localStorage.setItem('opened', 'false');
        }


        let stepsIsDefined = localStorage.getItem('steps');
        if (!stepsIsDefined) {
            //have to do this seven times
            let introStep = {
                title: "A Long and Descriptive Title",
                content: ["/content/Introduction.md"],
                questions: "assets/quiz/guiding_questions.json"
            };
            localStorage.setItem('intro', JSON.stringify(introStep));
            let scopeStep = {
                title: "A Scope Title",
                content: ["/content/Step1ScopingandGoals.md"],
                questions: "assets/quiz/guiding_questions.json"
            };
            localStorage.setItem('scope', JSON.stringify(scopeStep));
        }

        return Data.singleton;
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

    getContentList = (step) => {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.content;
    }

    //easy to implement, I want to see format of formdata first though before
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

export default Data;
