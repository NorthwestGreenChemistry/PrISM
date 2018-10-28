import jsPDF from 'jspdf'


export default class Pdf {
    constructor(data={}) {
        this.data = data
    }

    savePdf() {
        var doc = new jsPDF()

        let data = {
            "productName": "Pumpkin Butter",
            "steps": [
                {
                    "title": "01 Design Goals",
                    "completed": true,
                    "results": [
                        {
                            "question": "What was the name of your first pony?",
                            "answer": "Theodore"
                        },
                        {
                            "question": "How many hotdogs can you eat?",
                            "answer": "seven"
                        },
                        {
                            "question": "Select all the games you play",
                            "answer": [
                                "Mario Bros.",
                                "Pacman",
                                "BurgerTime"
                            ]
                        }
                    ]
                },
                {
                    "title": "02 Feedstock",
                    "completed": false,     // Should only be false if no answers at all
                    "results": null
                }
            ]
        }

        let html = `
            <h1>PrISM by Northwest Green Chemistry</h1>
        `;

        for (let step of data.steps) {
            html += this.renderStep(step);
        }

        doc.fromHTML(html, 15, 15, {
            'width': 170
        });

        doc.save('PrISM ' + data.productName + '.pdf')
    }

    renderStep(step) {
        let stepHtml =  `
            <h3>${step.title}</h3>
            <hr />
        `;
        if (step.completed) {
            for (let result of step.results) {
                stepHtml += this.renderResult(result);
            }
        } else {
            stepHtml += `
                <strong style="color: red">
                    You have not completed this step.
                </strong>
            `;
        }
        return stepHtml;
    }

    renderResult(result) {
        let answer = result.answer;
        if (typeof answer == 'object') {
            answer = `
                <ul>
                    <li>
                        ${answer.join('</li><li>')}
                    </li>
                </ul>
            `;
        }
        let resultHtml = `
            <p>
                <label>${result.question}</label>
                <br />
                ${answer}
            </p>
        `;
        return resultHtml;
    }
    
}