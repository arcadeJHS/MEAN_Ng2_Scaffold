var db = require('../db/db');

var scores = [  
   {  
      "user":"usr4",
      "points":100,
      "flagsCounter":4,
      "flagsFirstOwnerCounter":1,
      "lastFlagTimestamp":1458731600070
   },
   {  
      "user":"usr1",
      "points":60,
      "flagsCounter":3,
      "flagsFirstOwnerCounter":2,
      "lastFlagTimestamp":1458731600020
   },
   {  
      "user":"usr2",
      "points":30,
      "flagsCounter":1,
      "flagsFirstOwnerCounter":0,
      "lastFlagTimestamp":1458731600030
   },
   {  
      "user":"usr3",
      "points":20,
      "flagsCounter":1,
      "flagsFirstOwnerCounter":1,
      "lastFlagTimestamp":1458731600005
   }
];

function dropScores() {
    db.scores.drop(insertScores);
}

function insertScores() {
    db.scores.insert(scores, function(err, result) {
        console.log("### SCORES: populating collection... ###");				
        console.log("Inserted items: " + scores.length);
        console.log(JSON.stringify(result));				
        console.log("### SCORES: populating complete! ###");			
        if (err) { console.log("INSERT ERROR: " + err); }
    });
}

function createScores() {
    db.scores.find(function(err,  collection) {
        console.log('Count(scores): ' + collection.length);
        if (!collection.length) {
            console.log('Scores collection empty. Filling with mock data...');
            insertScores();
        }
    });
}

db.on('connect', function () {
    createScores();
});

module.exports.create = createScores;