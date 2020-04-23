const CSVtoJSON = require("csvtojson");
const JSONtoCSV = require("json2csv");
const FileSystem = require("fs");

/*
This...method? Converts the csv to a json, then creates a new JSON
that is reformatted. The last part of this method writes a new JSON file
with the reformatted version. Assumes that the file lives in the same
folder as this documemt.
*/
function convertAndReformat(fileName) {
CSVtoJSON().fromFile("./" + fileName).then(data => {
        var finalJSON = {
            "CATEGORIES": []
        }
        finalJSON = addCategoryNames(finalJSON, data);
        finalJSON = addIndicatorNames(finalJSON, data);
        finalJSON = addRest(finalJSON, data);
        //Exporting to a separate json file called test.json
        FileSystem.writeFile('test.json', JSON.stringify(finalJSON), (err) => {
            if (err) throw err
            console.log('The file has been saved!');
        })
        return finalJSON;
    });
}

convertAndReformat('VisualizationData_1712.csv');

/* Returns whether or not the given array has a JSON object whose
'name' attribute is equivalent to name. More pratically, this
function checks whether or not the 'children' attribute of
a JSON object contains an object with the given name.
    arrayObject: an array of JSON objects
    name: a string
*/
function specialContains(arrayObject, name) {
    if (arrayObject.length == 0) {
        return false;
    } else {
        var keys = [];
        for (i=0;i < arrayObject.length;i++)  {
            keys.push(arrayObject[i]['name']);
        }
        return keys.includes(name);
    }
}


/* Returns the index of the JSON object that has the given name
in its 'name' attribute. Returns the index where the JSON
with the given name is in the list.
    arrayObject: an array of JSON objects
    name: a string
 */
function returnIndex(arrayObject, name) {
    for (i = 0; i < arrayObject.length;i++) {
        if (arrayObject[i]['name'] == name) {
            return i;
        }
    }
    console.log("Something went wrong :(")
}


/* Adds the category names (inner ring in our sunburst)
to the JSON, and returns it.
    finalJSON: the finalJSON object that we will write
        to a new file in the end
    data: the original JSON object read from csv
*/
function addCategoryNames(finalJSON, data) {
    var categoryNames = new Set()
    //Collect all the category names
    for (i=0; i <data.length; i++) {
        var category = data[i]["Credibility Indicator Category"]
        if (!category == '') {
            categoryNames.add(category);
        }
    }
    //Add them to the finalJSON
    var catName;
    for (var catName of categoryNames) {
        var categoryJSON = {};
        categoryJSON['name'] = catName;
        categoryJSON['children'] = [];
        finalJSON['CATEGORIES'].push(categoryJSON);
    }
    return finalJSON;
}


/* Adds the indicator names (outer ring in our sunburst)
to the JSON, and returns it.
    finalJSON: the finalJSON object that we will     write to a new file in the end
    data: the original JSON object read from csv
*/
function addIndicatorNames(finalJSON, data) {
    for (j=0; j < data.length; j++) {
        var indicator = data[j]["Credibility Indicator Name"];
        var parentCat = data[j]["Credibility Indicator Category"];
        if (indicator == '' || parentCat == '') {
            continue;
        } else {
            var parentIndex = returnIndex(finalJSON['CATEGORIES'], parentCat)
            var categoryChildren = finalJSON['CATEGORIES'][parentIndex]['children']
            if (!(specialContains(categoryChildren, indicator))) {
                var indicatorJSON = {
                    'name': indicator,
                    'size': 0,
                    'startIndices': [],
                    'endIndices': [],
                    'points':[]
                }
                finalJSON['CATEGORIES'][parentIndex]['children'].push(indicatorJSON)
            }
        }
    }
    return finalJSON;
}


/* Adds the start and end indices and points
to the JSON, and returns it. I'd add size here but idk what it is :p
    finalJSON: the finalJSON object that we will write to a new file in the end
    data: the original JSON object read from csv
*/
function addRest(finalJSON, data) {
    for (l=0; l < data.length; l++) {
        var start = data[l]['Start'];
        var end = data[l]['End'];
        var point = data[l]['Points'];
        var parentInd = data[l]["Credibility Indicator Name"];
        var parentCat = data[l]["Credibility Indicator Category"];
        if (parentInd == '' || parentCat == '') {
            continue;
        } else {
            var catIndex = returnIndex(finalJSON['CATEGORIES'], parentCat);
            var indIndex = returnIndex(finalJSON['CATEGORIES'][catIndex]['children'], parentInd);
            finalJSON['CATEGORIES'][catIndex]['children'][indIndex]['points'].push(point);
            finalJSON['CATEGORIES'][catIndex]['children'][indIndex]['startIndices'].push(start);
            finalJSON['CATEGORIES'][catIndex]['children'][indIndex]['endIndices'].push(end);
        }
    }
    return finalJSON;
}
