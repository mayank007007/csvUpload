const File = require('../models/csv.js');
// for display home page
module.exports.home = async function (req, res) {
    try {
        const file = await File.find({});
        return res.render('home', {
            title: 'Home',
            files: file
        });
    } catch (err) {

        console.log("Error: ", err);
        return;
    }
}