import html2pdf from 'html2pdf.js';

export async function handleSubmit(htmlContent, pdfName) {
    try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const options = {
            margin: 0.5,
            filename: `${pdfName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate the PDF and download it
        html2pdf().from(tempDiv).set(options).toPdf().save();

        // html2pdf().from(tempDiv).set(options).toPdf().get('pdf')
        // .then(function (pdf) {
        //     const totalPages = pdf.internal.getNumberOfPages();
        //     const hrTitle = "Human Resource";
        //     const hrManagerName = "Johnny Lever";
        //     const adminTitle = "Admin";
        //     const adminName = "Ralph Adam";

        //     // Set the font size and style for the footer text
        //     pdf.setFontSize(10);

        //     // Left side text
        //     pdf.setFontStyle('normal');
        //     pdf.text(hrTitle, 0.5, pdf.internal.pageSize.getHeight() - 0.5, { align: 'left' });

        //     // Left side text
        //     pdf.setFontStyle('bold');
        //     pdf.text(hrManagerName, 0.5, pdf.internal.pageSize.getHeight() - 0.7, { align: 'left' });

        //     // Right side text
        //     pdf.setFontStyle('normal');
        //     pdf.text(adminTitle, pdf.internal.pageSize.getWidth() - 0.5, pdf.internal.pageSize.getHeight() - 0.5, { align: 'right' });

        //     // Right side text
        //     pdf.setFontStyle('bold');
        //     pdf.text(adminName, pdf.internal.pageSize.getWidth() - 0.5, pdf.internal.pageSize.getHeight() - 0.7, { align: 'right' });

        //     pdf.setPage(totalPages);
        //     pdf.text(hrManagerName, 0.5, pdf.internal.pageSize.getHeight() - 0.7, { align: 'left' });
        //     pdf.text(adminName, pdf.internal.pageSize.getWidth() - 0.5, pdf.internal.pageSize.getHeight() - 0.7, { align: 'right' });

        //     pdf.save(`${pdfName}.pdf`);
    } catch (error) {
        throw error;
    }
}










