//Add dummy data so that the data has the correct nodes to form a tree.
function addDummyData(data) {
  var categories = new Set([]);
  var i = 0;
  //Get all categories that are non-empty.
  data.forEach((highlight) => {
    if (highlight["Credibilty Indicator Category"]) {
      categories.add(highlight["Credibilty Indicator Category"]);
      i ++;
    }
  });
  //Add all categories as nodes to the data with parent as CATEGORIES.
  categories.forEach((category) => {
    data[i] = {"Credibilty Indicator Category": "CATEGORIES", "Credibility Indicator Name": category};
    i ++;
  })
      
  

  //Add root nodes.
  data[i] = {"Credibilty Indicator Category": undefined, "Credibility Indicator Name": "CATEGORIES"};
        

  return data;
}

//Convert data to a hierarchical format.
function convertToHierarchy(data) {
  //Stratify converts flat data to hierarchal data.

  var stratify = d3.stratify()
    .id(d => d["Credibility Indicator Name"])
    .parentId(d => d["Credibilty Indicator Category"])
    (data);
  //Hierarchy converts data to the same format that the D3 code expects.
  return d3.hierarchy(stratify);
}
