const CSV = require('../models/csv');
const csvParser = require('csv-parser');
const fs = require('fs');

// upload csv file
module.exports.upload = async function (req, res) {
    try {
        if (req.file.mimetype != 'text/csv') {
            return res.status(400).send('Select CSV files only.');
        }
        //Creates a new record in the CSV model
        const file = await CSV.create({
            fileName: req.file.originalname,
            path: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    }
    catch (err) {
        console.log(`Error in file upload ${err}`);
        res.status(500).send('Internal server error');
    }
}

// for display csv file data on the page
module.exports.view = async function (req, res) {
    try {
        const csvFile = await CSV.findById(req.params.id);
        const csvData = [];
        const csvHeader = [];
        fs.createReadStream(csvFile.path)
            .pipe(csvParser())
            .on('headers', (headers) => {
                headers.map((head) => {
                    csvHeader.push(head);
                });
            })
            .on('error', (err) => {
                console.log(`Error in open in file ${err}`);
            })
            .on('data', (data) => {
                csvData.push(data);
            })
            .on('end', () => {
                res.render('csvFile', {
                    title: 'csv Viewer',
                    fileName: csvData.fileName,
                    head: csvHeader,
                    data: csvData,
                    length: csvData.length
                });
            });
    }
    catch (err) {
        console.log(`Error in view csv file ${err}`);
        res.status(500).send('Internal server error');
    }
}

// to delete the csv file
module.exports.delete = async function (req, res) {
    try {
        const file = await CSV.findById(req.params.id);

        if (!file) {
            console.log("File not found");
            return res.redirect("/");
        }

        await CSV.deleteOne({ _id: req.params.id });
        return res.redirect('/');
    }
    catch (err) {
        console.log(`Error in delete file ${err}`);
        return;
    }
}