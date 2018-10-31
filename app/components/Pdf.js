import jsPDF from 'jspdf'


export default class Pdf {
    constructor(data={}) {
        this.data = data
    }

    savePdf() {
        var doc = new jsPDF()

        let html = `
            <h1>PrISM by Northwest Green Chemistry</h1>
        `;

        for (let step of this.data.steps) {
            html += this.renderStep(step);
        }

        doc.fromHTML(html, 15, 15, {
            'width': 170
        });

        doc.save('PrISM ' + this.data.productName + '.pdf')
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
