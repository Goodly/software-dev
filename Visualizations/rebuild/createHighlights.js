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
  if (i == 0) {
    highlightStack.getArray().forEach((entry) => {
       allIDsBelow = allIDsBelow + entry[0].toString() + " "; // all the unqiue IDs are separated by spaces
       console.log(allIDsBelow);
    })
  }
  allIDsBelow = " allIDs='" + allIDsBelow + "'";
  let text = textArray[index];
  let uniqueId = entry[0].toString();
  let color = entry[1];
  let name = " name='" + uniqueId + "'";
  let style = " style= 'border-bottom:1px solid " + color + "'";
  let highlight = "<span class='highlight'" + name + allIDsBelow + style + ">";
  textArray[index] = highlight + text;
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
  var id = x.toElement.getAttribute("name");
  var color = x.toElement.style.borderBottomColor;      // grab color of border underline in rgb form
  var color = color.match(/\d+/g);                      // split rgb into r, g, b, components
  //console.log(color);
  highlightHallmark(id);
  x.toElement.style.setProperty("background-color", "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + "0.4");
  x.toElement.style.setProperty("background-clip", "content-box");
}

// A function which returns all our background colors back to normal.
// Needs fix to optimize, currently loops through all spans.
function normal(x) {
  //console.log(x.toElement);
    resetVis(ROOT);
    PSEUDOBOX.transition()
        .delay(300)
        .duration(600)
        .style("opacity", 0)
  var allSpans = document.getElementsByTagName('span');
  for (var i = 0; i < allSpans.length; i++) {
    allSpans[i].style.setProperty("background-color", "transparent");
  }
}


function highlightHallmark(id) {
    d3.selectAll("path").transition().each(function(d) {
    if (d.height == 2) {
        var category;
        for (category of d.children) {
            var categoryName = category.data.data['Credibility Indicator Name'];
            if (id.substring(0, 1) == categoryName.substring(0, 1)) {
                //console.log(category.data);
                var indicator;
                for (indicator of category.children) {
                    var indicatorName = indicator.data.data['Credibility Indicator ID']
                    var indices = indicator.data.data["Start"] + "-"+indicator.data.data["End"];
                    //console.log(indicator.data.data["Start"]);
                    if (id.substring(0, 2) == indicatorName && id.substring(3, id.length) == indices) {
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
