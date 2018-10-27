import React, { Component } from 'react';
import * as RxDB from 'rxdb';

type Props = {};

RxDB.plugin(require('pouchdb-adapter-websql'));

const configSchema = {
    "title": "configuration schema",
    "version": 0,
    "description": "describes configuration for electron app",
    "type": "object",
    "properties": {
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

    checkIfFirstTime = () => {
        // const configCollection = this.db['config'];
        console.log('inside of check if first time', this.db);
        // configCollection.find().exec().then(doc => console.log('grabbed doc!', doc));
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
        const db = await RxDB.create(
            {
                name: "nwchem",
                adapter: 'websql',
                multiInstance: false
            }
        );

        const configCollection = await db.collection({
            name: 'config',
            schema: configSchema
        });

        console.log('created collection', configCollection);

        // const configDoc = await configCollection.upsert({
        //     opened: false,
        // });

        // console.log('waited for doc', configDoc);

        const stepsCollection = await db.collection({
            name: 'steps',
            schema: stepSchema
        });

        console.log('created collection', stepsCollection);

        // const doc = await stepsCollection.upsert({
        //         step: "introduction",
        //         title: "Introduction And Design Principles",
        //         content: ["test.md", "other.md"],
        //         questions: {},
        //     });

        // console.log('waited for doc', doc);

        // const scope = await stepsCollection.upsert({
        //         step: "scope",
        //         title: "Scoping, Problem Formulation & Design Goals",
        //         content: ["test.md", "other.md"],
        //         questions: {},
        // });

        // console.log('waited for doc', scope);

        console.log('db', db);
        return db
    }
}

export default Data;
