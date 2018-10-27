import React, { Component } from 'react';

var localStorage = require('localStorage');

let myValue = {stuff: 'stuff'};

localStorage.setItem('myKey', JSON.stringify(myValue));
myValue = localStorage.getItem('myKey');

type Props = {};

const configSchema = {
    "title": "configuration schema",
    "version": 0,
    "description": "describes configuration for electron app",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "primary": true
        },
        "opened": {
            "type": "boolean",
        },
    }
};

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

        console.log('first time calling this');

        Data.singleton = this;
        return Data.singleton;
    }

    async initialize() {
        this.db = await this.createDB();
    }

    async checkIfFirstTime() {
        return;
    }

    getTitle = (step) => {
        // db.waitForLeadership().then(() => {
        //     console.log('waited for leadership');
        // });
    }

    getQuestions = () => {

    }

    getContent = () => {

    }

    storeAnswer = () => {

    }

    async createDB() {
    }
}

export default Data;
