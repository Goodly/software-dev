function sortJSONentries(json) {
  var sortArray = []; // an array of arrays
  for (i = 0; i < json.length; i++) {
      if (parseInt(json[i].Start) == -1 || parseInt(json[i].End) == -1 || json[i].Start == "") {
        continue; // ignore entries where indices are -1 or null
      }

    // [uniqueID, color, index, boolean]
    let uniqueID = json[i]["Credibility Indicator ID"] + "-" + json[i].Start + "-" + json[i].End;

    let startEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].Start), true];
    let endEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].End), false];

    sortArray.push(startEntry);
    sortArray.push(endEntry);
  }
  sortArray = sortArray.sort(highlightSort); // sorting all entries by their indices
  //console.log(sortArray);
  return sortArray;
}

function scoreArticle(fileName) {
      d3.text("17120SSSArticle.txt", function(text) {
          document.getElementById("textArticle").innerHTML = text.toString();
      });

      d3.csv(fileName, function(error, data) {
        if (error) throw error;
        createHighlights(data);
      });
}

function createHighlights(json) {
  var textString = document.getElementById('textArticle').innerHTML;
  textArray = textString.split("");  // Splitting the string into an array of strings, one item per character

  var sortedEntries = sortJSONentries(json); // an array highlight arrays, sorted by their indices
  var highlightStack = new FlexArray();

  sortedEntries.forEach((entry) => {  // for each entry, open a span if open or close then reopen all spans if a close
    const index = entry[2];
    if (entry[3]) {
      textArray = openHighlight(textArray, index, entry, highlightStack, 0);
      highlightStack.push(entry);
    } else {
      textArray = closeHighlights(textArray, index, highlightStack);
      highlightStack.remove(entry);
      textArray = openHighlights(textArray, index, highlightStack);
    }
  })

  finalHTML = textArray.join('');
  document.getElementById('textArticle').innerHTML = finalHTML;
  $(".highlight").hover(highlight, normal);
}

function openHighlight(textArray, index, entry, highlightStack, i) {
  let allIDsBelow = "";
    highlightStack.getArray().forEach((entry) => {
       allIDsBelow = allIDsBelow + entry[0].toString() + " "; // all the unqiue IDs are separated by spaces
       // console.log(allIDsBelow);
  })
  allIDsBelow = " allIDsBelow='" + allIDsBelow + "'";
  let text = textArray[index-1];
  let uniqueId = entry[0].toString();
  let color = entry[1];
  let name = " name='" + uniqueId + "'";
  let style = " style= 'border-bottom:1px solid " + color + "'";
  let highlight = "<span class='highlight'" + name + allIDsBelow + style + ">";
  textArray[index-1] = text + highlight;
  return textArray;
}

function openHighlights(textArray, index, highlightStack) {
  let text = textArray[index];
  for (var i = 0; i < highlightStack.getSize(); i++) {
    textArray = openHighlight(textArray, index, highlightStack.get(i), highlightStack, i);
  }
  // highlightStack.getArray().forEach((entry) => {
  //   textArray = openHighlight(textArray, index, entry);
  // })
  return textArray;
}

function closeHighlights(textArray, index, highlightStack) {
  let text = textArray[index];
  let closeSpans = '';
  for (var i = 0; i < highlightStack.getSize(); i++) {
    closeSpans += "</span>";
  }
  textArray[index] = text + closeSpans;
  return textArray;
}

function highlight(x) {
  // console.log(x.toElement);
  //console.log(x.toElement.style);
  var topID = x.toElement.getAttribute("name");
  var color = x.toElement.style.borderBottomColor;      // grab color of border underline in rgb form
  var color = color.match(/\d+/g);                      // split rgb into r, g, b, components
  //console.log(color);
  var allIds = x.toElement.getAttribute("allIDsBelow").concat(" " + topID).split(" ");
    
  if (allIds == [""]) {
    highlightHallmark(topID);   
  } else {
      highlightManyHallmark(allIds, ROOT);
  }
  x.toElement.style.setProperty("background-color", "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + "0.4");
  x.toElement.style.setProperty("background-clip", "content-box");
  

}

// A function which returns all our background colors back to normal.
// Needs fix to optimize, currently loops through all spans.
function normal(x) {
  //console.log(x.toElement);
    //resetVis(ROOT);
    resetHallmark(ROOT);
    PSEUDOBOX.transition()
        .delay(300)
        .duration(600)
        .style("opacity", 0)
  var allSpans = document.getElementsByTagName('span');
  for (var i = 0; i < allSpans.length; i++) {
    allSpans[i].style.setProperty("background-color", "transparent");
  }
}

function resetHallmark() {
    d3.selectAll("path")
        .transition()
        .delay(300)
        .duration(800)
        .attr('stroke-width',2)
        .style("opacity", function(d) {
            if (d.height == 1) {
            } else {
                return 0;
            }
        })
    d3.selectAll("path")
        .transition()
        .delay(1000)
        .attr('stroke-width',2)
        .style("opacity", function(d) {
            if (d.height == 1) {
            } else {
                return 0;
            }
        })
    SVG.selectAll(".center-text").style('display', 'none');
    SVG.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-size", 40)
        .style("text-anchor", "middle")
        .html((totalScore));
}


function highlightManyHallmark(idArray, d) {
    console.log(idArray);
    var id;
    var pathList = [];
    var catList = [];
    var indicators = "";
    var pointsGained = 0;
    for (id of idArray) {
        if (id != "") {
            var category;
            for (category of d.children) {
                var categoryName = category.data.data['Credibility Indicator Name'];
                var catPath = nodeToPath.get(category);
                d3.select(catPath)
                .transition()
                .style("opacity", .5);
                if (id.substring(0, 1) == categoryName.substring(0, 1)) {
                    catList = catList.concat(catPath);
                    var indicator;
                    for (indicator of category.children) {
                        var indicatorID = indicator.data.data['Credibility Indicator ID'];
                        var indicatorName = indicator.data.data["Credibility Indicator Name"];
                        var path = nodeToPath.get(indicator);
                        d3.select(path)
                        .transition()
                        .style("display", "block")
                        .style("opacity", .5);
                        if (id.substring(0, 2) == indicatorID) {
                            console.log('test');
                            pathList = pathList.concat(path);
                            var score = scoreSum(indicator);
                            pointsGained += score;
                            if (!indicators.includes(indicatorName)) {
                                indicators += indicatorName + ", ";
                            }
                        }
                        
                    }
                }
            }
        }
    }
    
    indicators = indicators.substring(0, indicators.length - 2);
    console.log(indicators);
    var c;
    for (c of catList) {
        d3.select(c)
        .transition()
        .style("display", "block")
        .style("opacity", 1)
        .duration(200);
    }
    var p;
    console.log(pathList);
    for (p of pathList) {
        d3.select(p)
        .transition()
        .style("display", "block")
        .style("opacity", 1);
    }
    
    var element = document.getElementById('chart');
    var position = element.getBoundingClientRect();
    x = position.left + 35;
    y = position.top + 330;
    
    PSEUDOBOX.transition()
        .duration(200)
        .style("opacity", .9);
    PSEUDOBOX.html(indicators)
        .style("left", (x) + "px")
        .style("top", (y) + "px")
        .style("width", "min-content")
        .style("height", "min-content");
    
    
    SVG.selectAll(".center-text").style('display', 'none');
    SVG.append("text")
    .attr("class", "center-text")
    .attr("x", 0)
    .attr("y", 13)
    .style("font-size", 40)
    .style("text-anchor", "middle")
    .html((pointsGained));
        
    
}
            


function highlightHallmark(id) {
    d3.selectAll("path").transition().each(function(d) {
    if (d.height == 2) {
        var category;
        for (category of d.children) {
            var categoryName = category.data.data['Credibility Indicator Name'];
            if (id.substring(0, 1) == categoryName.substring(0, 1)) {
                var indicator;
                for (indicator of category.children) {
                    var indicatorName = indicator.data.data['Credibility Indicator ID']
                    var indices = indicator.data.data["Start"] + "-"+indicator.data.data["End"];
                    if (id.substring(0, 2) == indicatorName) {
                        var path = nodeToPath.get(indicator);
                        d3.select(path)
                        .transition()
                        .style("display", "block")
                        .style("opacity", 1)
                        .duration(200);

                        var element = document.getElementById('chart');
                        var position = element.getBoundingClientRect();
                        x = position.left + 35;
                        y = position.top + 280;
                        var pointsGained = scoreSum(indicator);
                        SVG.selectAll(".center-text").style('display', 'none');
                        SVG.append("text")
                            .attr("class", "center-text")
                            .attr("x", 0)
                            .attr("y", 13)
                            .style("font-size", 40)
                            .style("text-anchor", "middle")
                            .html((pointsGained));
                        PSEUDOBOX.transition()
                            .duration(200)
                            .style("display", "block")
                            .style("opacity", .9);
                        PSEUDOBOX.html(indicator.data.data['Credibility Indicator Name'])
                            .style("left", (x) + "px")
                            .style("top", (y) + "px")
                            .style("width", function() {
                                if (indicator.data.data['Credibility Indicator Name'].length < 18) {
                                    return "90px";
                                } else {
                                    return "180px";
                                }
                            })

                    } else {
                        var path = nodeToPath.get(indicator);
                        d3.select(path)
                        .transition()
                        .style("display", "block")
                        .style("opacity", .5)
                        .duration(200);

                    }
                }

            } else {
                //console.log(categoryName);
                var path = nodeToPath.get(category);
                d3.select(path)
                .transition()
                .style("opacity", 0.5)
                .duration(300)

            }

            //console.log(category.data.data['Credibility Indicator Name']);
        }
    }
})
}
