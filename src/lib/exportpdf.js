import html2pdf from 'html2pdf.js'

export function exportPdf(htmlContent, fileName = 'file') {
    const opt = {
        margin: 1,
        filename: (fileName || 'file') + '.pdf',
        image: {type: 'jpeg', quality: 0.90},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'},
    }

    // New Promise-based usage:
    html2pdf().set(opt).from(htmlContent).save()
}
