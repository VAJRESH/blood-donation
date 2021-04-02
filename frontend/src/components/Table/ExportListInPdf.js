import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ExportListInPdf(rowData){
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Donors List';
    const headers = [rowData[0].filter((data, index) => {
        if(index === 7) return null;
        return [data];
    })];

    const data = rowData.filter((data, index) => {
        if(index === 0 || index === 7) return null;
        return [data];
    });

    let content = {
        startY: 50,
        head:  headers,
        body: data
    }
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('report.pdf');
}

export default ExportListInPdf;
