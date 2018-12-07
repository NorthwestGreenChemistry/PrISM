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
                questionRules: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions2_rules.json",
                prevStep: "1",
                nextStep: "3"
            };

            localStorage.setItem("2", JSON.stringify(feedstockStep));

            let productionStep = {
                title: "Introduction to Production and Manufacturing",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step3-production-manufacturing.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions3.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions3_ui.json",
                questionRules: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions3_rules.json",
                prevStep: "2",
                nextStep: "4"
            };

            localStorage.setItem("3", JSON.stringify(productionStep));

            let useStep = {
                title: "Sustainable Product Design for the Use Phase",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step4-use.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions4.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions4_ui.json",
                questionRules: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions4_rules.json",
                prevStep: "3",
                nextStep: "5"
            };

            localStorage.setItem("4", JSON.stringify(useStep));

            let endOfLifeStep = {
                title: "End of Life Considerations",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step5-end-of-life.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions5.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions5_ui.json",
                questionRules: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions5_rules.json",
                prevStep: "4",
                nextStep: "6"
            }

            localStorage.setItem("5", JSON.stringify(endOfLifeStep));

            let lifeCycleStep = {
                title: "Whole Product Assessment ",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step6-whole-product.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions6.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions6_ui.json",
                prevStep: "5",
                nextStep: "7"
            }

            localStorage.setItem("6", JSON.stringify(lifeCycleStep));

            let finalStep = {
                title: "Decision Analysis",
                content: ["https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/content/step7-evaluation-and-optimization.md"],
                questions: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions7.json",
                questionsUI: "https://raw.githubusercontent.com/NorthwestGreenChemistry/PrISM/develop/app/assets/quiz/guiding_questions7_ui.json",
                prevStep: "6"
            };

            localStorage.setItem("7", JSON.stringify(finalStep));
        }

        return Data.singleton;
    }

    //returns key for previous step
    getPrevStep(step) {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.prevStep;
    }
    //returns key for next step
    getNextStep(step) {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.nextStep;
    }

    setPDFStepResults(id, step, formData) {
        console.log('formdata', formData);
        let storageId = "pdf-" + id;

        let pdfResults = localStorage.getItem(storageId);
        const stepData = JSON.parse(localStorage.getItem(step));
        let stepKey = step + " " + stepData.title;

        if (!pdfResults) {
            let steps = [];
            let results = [];

            Object.keys(formData).forEach((formProp) => {
                let question = formProp;
                let answer = formData[formProp];

                if (answer) {
                    if ((answer instanceof String || typeof answer === "string")
                        || answer instanceof Array) {
                        var qAndA = {
                            "question": question,
                            "answer": answer
                        }
                        results.push(qAndA);
                    } else {
                        Object.keys(answer).forEach((nestedQ) => {
                            let nestedAnswer = answer[nestedQ];

                            if (nestedAnswer) {
                                var qAndA = {
                                    "question": nestedQ,
                                    "answer": nestedAnswer
                                }
                                results.push(qAndA);
                            }
                        });
                    }
                }
            });

            if (results.length > 0) {
                let stepsVar = {
                    "title": stepKey,
                    "completed": true,
                    "results": results
                };

                steps[step] = stepsVar;
            }


            var fullObj = {
                "productName": this.getAllProducts()[id],
                "steps": steps
            }

            localStorage.setItem(storageId, JSON.stringify(fullObj))
        } else {
            let pdfStepsString = localStorage.getItem(storageId);
            let pdfStepsObj = JSON.parse(pdfStepsString);

            var stepExists = -1;
            let stepsList = pdfStepsObj.steps;

            stepsList.some(function(el, index) {
                if (el && el != null && el.title === stepKey) {
                    stepExists = index;
                    return true;
                }
            });


            if (stepExists > -1) {
                stepsList.splice(stepExists, 1);
            }

            let results = [];


            Object.keys(formData).forEach((formProp) => {
                let question = formProp;
                let answer = formData[formProp];

                if (answer) {
                    if ((answer instanceof String || typeof answer === "string")
                        || answer instanceof Array) {
                        var qAndA = {
                            "question": question,
                            "answer": answer
                        }
                        results.push(qAndA);
                    } else {
                        Object.keys(answer).forEach((nestedQ) => {
                            let nestedAnswer = answer[nestedQ];

                            if (nestedAnswer) {
                                var qAndA = {
                                    "question": nestedQ,
                                    "answer": nestedAnswer
                                }
                                results.push(qAndA);
                            }
                        });
                    }
                }
            });

            if (results.length > 0) {
                let stepsVar = {
                    "title": stepKey,
                    "completed": true,
                    "results": results
                };

                stepsList[step] = stepsVar;
            }

            pdfStepsObj.steps = stepsList;
            localStorage.setItem(storageId, JSON.stringify(pdfStepsObj));
        }
    }

    getStepsProgress(id) {

    }

    getPDFContent(id) {
        let storageId = "pdf-" + id;
        let stepString = localStorage.getItem(storageId);
        if (!stepString) {
            return undefined;
        }

        let pdfContent = JSON.parse(stepString);


        for (let i = 1; i < 8; i++) {
            let step = pdfContent.steps[i];
            if (step == null) {
                console.log('step', i, 'is null, gonna backfill');
                const stepData = JSON.parse(localStorage.getItem(i.toString()));
                const stepKey = i + ' ' + stepData.title;

                step = {
                    "title": stepKey,
                    "completed": false
                };

                pdfContent.steps[i] = step;
            }
        }

        console.log(pdfContent);
        return pdfContent;
    }

    checkIfFirstTime() { //assumes that Data Constructor has already been called
        return localStorage.getItem('opened') === 'false';
    }

    openedApp() {
        localStorage.setItem('opened', 'true');
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

    getQuestionRulesFile = (step) => {
        let stepString = localStorage.getItem(step);
        let stepObj = JSON.parse(stepString);
        return stepObj.questionRules;
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

    // return a list of un answered questions/sections..?
    getUnansweredQuestions = (id) => {

    }

    // "completed" = has an answer, returns true if at least one field has an answer
    isStepCompleted = (id, stepKey) => {
        const answers = this.getAnswers(id);

        if (!answers) {
            return false;
        }

        const stepAnswers = answers[stepKey];

        for (let key in stepAnswers) {
            if (stepAnswers.hasOwnProperty(key)) {
                let value = stepAnswers[key];

                if ((value !== undefined && value !== null)
                     && Object.keys(value).length !== 0) {
                    return true;
                }
            }
        }

        return false;
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
