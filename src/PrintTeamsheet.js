import React from 'react';
import {PDFDocument, rgb} from 'pdf-lib';

// Import the image
import sampleImage from './assets/SAMSL-logo.png';
import {useData} from "./DataContext";

const CreateAndPrintPDF = () => {

    const {data} = useData();
    let availablePlayers = data.selectedPlayers;

    const rowsToAdd = 24 - availablePlayers.length;

    if (rowsToAdd > 0) {

        for (let i = 0; i < rowsToAdd; i++) {
            availablePlayers.push(
                {
                    "id": 99999999,
                    "dateofbirth": "",
                    "type": "",
                    "status": "",
                    "team": "",
                    "name": "",
                    "shirtno": ""
                });
        }
    }

    availablePlayers = availablePlayers.sort((a, b) => {
        if (a.name === "" && b.name !== "") {
            return 1; // Move a to the end
        }
        if (a.name !== "" && b.name === "") {
            return -1; // Move b to the end
        }
        if (a.name === "" && b.name === "") {
            return 0; // Keep the same order if both are empty
        }
        return a.name.localeCompare(b.name);
    });

    const createPdf = async () => {

        const drawTable = (data, x, y, rowHeight, columnWidths) => {
            // const numRows = data.length + 1;
            // const numCols = data[0].length;

            let xCount = x + 4;

            // Draw header row
            data[0].forEach((header, i) => {
                page.drawText(header, {
                    x: xCount + 2,
                    y: y + 4,
                    size: 12,
                });
                page.drawRectangle({
                    x: xCount,
                    y: y,
                    width: columnWidths[i],
                    height: rowHeight,
                    borderColor: rgb(0, 0, 0),
                    borderWidth: 1,
                });

                xCount = xCount + columnWidths[i];
            });

            // Draw data rows
            data.slice(1).forEach((row, rowIndex) => {

                if (rowIndex < 24) {

                    xCount = x + 4;
                    row.forEach((cell, colIndex) => {
                        page.drawText(cell, {
                            x: xCount + 2,
                            y: (y + 4) - (rowIndex + 1) * rowHeight,
                            size: rowHeight - 4,
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
                }
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
            y: 720,
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
            ['Shirt', 'Name', 'Guest', 'Goals', 'Cards', 'Injuries', '3-2-1'],
            ...availablePlayers.map(player => [" " + player.shirtno, player.name, " ", " ", " ", " ", " "]),
        ];

        drawTable(tableData, 34, 680, 18, [32, 180, 40, 40, 40, 166, 40]);

        const t2rows = [data.homeTeamName, data.awayTeamName]
        const table2Data = [
            [' ', 'HT', 'FT', 'ET (HT)', 'ET(FT)', 'Pens'],
            ...t2rows.map((teamName) => [teamName, " ", " ", " ", " ", " "]),
        ];

        drawTable(table2Data, 34, 218, 20, [268, 54, 54, 54, 54, 54]);

        const t3rows = ["Team Manager/Delegate", "Referee"]
        const table3Data = [
            ['Officials', 'Name', 'Signature'],
            ...t3rows.map(player => [player, " ", " "]),
        ];

        drawTable(table3Data, 34, 146, 20, [202, 168, 168]);


        page.drawRectangle({
            x: 37,
            y: 719,
            width: 540,
            height: 50,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });


        page.drawText(data.homeTeamName + " v " + data.awayTeamName, {
            x: 50,
            y: 750,
            size: 18,
        });

        page.drawText("Round : " + data.round
            + " \t Venue: " + data.venue
            + " \t Date/Time: " + data.dateAndTime, {
            x: 50,
            y: 730,
            size: 12,
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
            x: 37,
            y: 10,
            width: 269,
            height: 80,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        page.drawText('Teams ', {
            x: 50,
            y: 74,
            size: 14,
        });

        page.drawText('Check all information on this teamsheeet is correct.', {
            x: 50,
            y: 60,
            size: 10,
        });


        page.drawText('Then sign above if you agree it is correct. ', {
            x: 50,
            y: 48,
            size: 10,
        });

        page.drawText('SMS results to 0423 380 333 by 5:00pm.', {
            x: 50,
            y: 36,
            size: 10,
        });



        page.drawRectangle({
            x: 306,
            y: 10,
            width: 269,
            height: 80,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        page.drawText('Referees ', {
            x: 313,
            y: 74,
            size: 14,
        });

        page.drawText('Return this teamsheet to the team after the game OR', {
            x: 313,
            y: 60,
            size: 10,
        });


        page.drawText('hand it to Razor, Dave Sedgwick or Andy Whitfield. ', {
            x: 313,
            y: 48,
            size: 10,
        });

        page.drawText('Players of ' + data.theTeamName, {
            x: 50,
            y: 704,
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
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});

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
