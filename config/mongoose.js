//pass-NSfVNKefcmZg9vKo
//user-mayanksaraswat77

//g0eFv7fiWCVXYyvB
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://mayanksaraswat77:WLC14CHVVGXn49Et@issue-tracker.bhysxdn.mongodb.net/?retryWrites=true&w=majority';
// const dbURL = 'mongodb+srv://mayanksaraswat77:<g0eFv7fiWCVXYyvB>@csv.9or0pcn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL).then(() => {
    console.log('Successfully connected to the database');
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});