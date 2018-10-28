import jsPDF from 'jspdf'


export default class Pdf {
    constructor(data={}) {
        this.data = data
    }

    savePdf() {
        var doc = new jsPDF()

        doc.text('Hello world!', 10, 10)
        doc.save('a4.pdf')
    }
    
}