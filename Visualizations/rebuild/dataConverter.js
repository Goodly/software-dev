//Add dummy data so that the data has the correct nodes to form a tree.
function addDummyData(data) {
  var categories = new Set([]);
  var i = 0;

  //Get all categories that are non-empty.
  data.forEach((highlight) => {
    if (highlight["Credibility Indicator Category"]) {
      categories.add(highlight["Credibility Indicator Category"]);
      i++;
    }
  });
  //Add all categories as nodes to the data with parent as CATEGORIES.
  categories.forEach((category) => {
    data[i] = {"Credibility Indicator Category": "CATEGORIES", "Credibility Indicator Name": category};
    i ++;
  })
      
  

  //Add root nodes.
  data[i] = {"Credibility Indicator Category": undefined, "Credibility Indicator Name": "CATEGORIES"};
  return data;
}

//Convert data to a hierarchical format.
function convertToHierarchy(data) {
  //Stratify converts flat data to hierarchal data.

  var stratify = d3.stratify()
    .id(d => d["Credibility Indicator Name"])
    .parentId(d => d["Credibility Indicator Category"])
    (data);
  //Hierarchy converts data to the same format that the D3 code expects.
  return d3.hierarchy(stratify);
}


/** Takes a heirarchical json file and converts it into a tree with unique branches 
and unique leaves.
@param data: a heirarchicical json file outputted by convertToHeirarchy
*/
function condense(d) {
    if (d.height == 1) {
        var indicators = new Map();
        var indicator;
        for (indicator of d.children) {
            if (indicators.get(indicator.data.data["Credibility Indicator Name"])) {
                json = indicators.get(indicator.data.data["Credibility Indicator Name"]).data.data;
                json["Points"] = parseFloat(json.Points) + parseFloat(indicator.data.data["Points"]);
            } else {
                //console.log(indicator.data.data["Credibility Indicator Name"]);
                indicators.set(indicator.data.data["Credibility Indicator Name"], indicator);
            }
        }
        //console.log(indicators);
        var newChildren = Array.from(indicators.values());
        d.children = newChildren;
        d.data.children = newChildren;
        //d.children = newChildren;
        
    } else {
        var child;
        for (child of d.children) {
            condense(child);
        }
    }
}


