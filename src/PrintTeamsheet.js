import React from 'react';
import {PDFDocument, rgb } from 'pdf-lib';

// Import the image
import sampleImage from './assets/SAMSL-logo.png';

const CreateAndPrintPDF = (props)=> {

    var availablePlayers = props.selected;
    console.log("Selected: " +props.selected);

    const createPdf = async () => {

        const drawTable = (data, x, y, rowHeight, columnWidths) => {
            // const numRows = data.length + 1;
            // const numCols = data[0].length;

            let xCount = x + 4;

            // Draw header row
            data[0].forEach((header, i) => {
                page.drawText(header, {
                    x: xCount +2,
                    y: y+4,
                    size: 12,
                });
                page.drawRectangle({
                    x: xCount,
                    y: y ,
                    width: columnWidths[i],
                    height: rowHeight,
                    borderColor: rgb(0, 0, 0),
                    borderWidth: 1,
                });

                xCount = xCount + columnWidths[i];
            });

            // Draw data rows
            data.slice(1).forEach((row, rowIndex) => {
                xCount = x + 4;
                row.forEach((cell, colIndex) => {
                    page.drawText(cell, {
                        x: xCount +2,
                        y: (y +4) - (rowIndex + 1) * rowHeight,
                        size: 12,
                    });
                    page.drawRectangle({
                        x: xCount,
                        y: y - (rowIndex + 1) * rowHeight,
                        width: columnWidths[colIndex],
                        height: rowHeight,
                        borderColor: rgb(0, 0.1, 0.1),
                        borderWidth: 1,
                    });
                    xCount = xCount + columnWidths[colIndex];
                });
            });
        };

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        const imageBytes = await fetch(sampleImage).then(res => res.arrayBuffer());
        // Embed the image in the PDF document
        const pngImage = await pdfDoc.embedPng(imageBytes);

        // Define the image dimensions
        const imageWidth = 50;
        const imageHeight = 50;

        // Add the image to the page at the specified position and size
        page.drawImage(pngImage, {
            x: 510,
            y: 740,
            width: imageWidth,
            height: imageHeight,
        });

        // Draw the fixture box.


        // page.drawRectangle({
        //     x:400,
        //     y: 50,
        //     height: 30,
        //     width: 500,
        //     borderColor: rgb(1, 1, 1),
        //     fillColor: rgb(0, 0, 0)});

        const tableData = [
            ['Shirt','Name','Guest','Goals','Cards','Injuries','3-2-1'],
            ...availablePlayers.map(player => [" "+player.shirtno,  player.name," "," "," "," "," "] ),
        ];

            drawTable (tableData, 50, 660, 20, [30, 180, 40, 40,40,140,40]);

        const t2rows = [' ',' ', ' ']
        const table2Data = [
            [' ','HT','FT','ET (HT)','ET(FT)','Pens'],
            ...t2rows.map(player => [" ",  " "," "," "," "," "] ),
        ];

        drawTable (table2Data, 30, 270, 20, [250, 50, 50, 50,50,50]);

        const t3rows = ["Team Manager/Delegate",  "Referee"]
        const table3Data = [
            ['Officials','Name','Signature'],
            ...t3rows.map(player => [player ," "," "]),
        ];

        drawTable (table3Data, 30, 180, 24, [180, 180, 180]);




        page.drawRectangle({
            x: 30,
            y: 740 ,
            width: 540,
            height: 48,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        // page.drawRectangle({
        //     x: 30,
        //     y: 256 ,
        //     width: 540,
        //     height: 16,
        //     borderColor: rgb(0, 0, 0),
        //     borderWidth: 1,
        // });
        //
        // page.drawRectangle({
        //     x: 30,
        //     y: 240 ,
        //     width: 540,
        //     height: 48,
        //     borderColor: rgb(0, 0, 0),
        //     borderWidth: 1,
        // });


        // page.drawRectangle({
        //     x: 30,
        //     y: 140 ,
        //     width: 540,
        //     height: 50,
        //     borderColor: rgb(0, 0, 0),
        //     borderWidth: 1,
        // });

        page.drawRectangle({
            x: 30,
            y: 10 ,
            width: 270,
            height: 80,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        page.drawText('Teams ', {
            x: 36,
            y: 74,
            size: 14,
        });

        page.drawRectangle({
            x: 300,
            y: 10 ,
            width: 270,
            height: 80,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        page.drawText('Referees ', {
            x: 306,
            y: 74,
            size: 14,
        });

        page.drawText('Players of ', {
            x: 50,
            y: 700,
            size: 14,
        });


        // page.drawText('Shirt     Player Name                          Guest   Goals   Cards   Injuries              3-2-1', {
        //     x: 50,
        //     y: 680,
        //     size: 12,
        // });

        //${index + 1}.
        // availablePlayers.forEach((player, index) => {
        //     page.drawText(`${player.name}`, {
        //         x: 90,
        //         y: 660 - index * 16,
        //         size: 12,
        //     });
        // });

        const pdfBytes = await pdfDoc.save();

        // Convert the PDF to Blob
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Convert the Blob to an object URL
        const url = URL.createObjectURL(blob);

        // Open the PDF in a new window for printing
        const printWindow = window.open(url);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    return (
        <div>
            <button onClick={createPdf}>Print Teamsheet</button>
        </div>
    );
};

export default CreateAndPrintPDF;
