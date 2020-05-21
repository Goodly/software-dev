/** This file will create the hallmark. It uses the d3 library to create a sunburst visualization.
A rough roadmap of the contents:
    - global variables
    - create hallmark skeleton
    - fill center of hallmark
    - mouse animations
    - helper functions

**/





//var dataFileName = "VisualizationData_1712.csv";
var chartDiv = document.getElementById("chart");

var width = 310,
    height = 310,
    radius = (Math.min(width, height) / 2);

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radius]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var partition = d3.partition();



/* A map that relates a node in the data heirarchy to the
SVGPathElement in the visualization.
*/
var nodeToPath = new Map();

var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return 155 * d.y0; })
    .outerRadius(function(d) { return 155 * d.y1; });


//This variable creates the floating textbox on the hallmark
var DIV;
var PSEUDOBOX;

var ROOT;
var SVG;

function hallmark(dataFileName) {


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
SVG = svg;


var visualizationOn = false;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var pseudobox = d3.select("body").append("div")
    .attr("class", "pseudobox")
    .style("opacity", 1);
    
DIV = div;

PSEUDOBOX = pseudobox;
//This code block takes the csv and creates the visualization.
d3.csv(dataFileName, function(error, data) {
  if (error) throw error;
  delete data["columns"];
  data = addDummyData(data);
  
  var root = convertToHierarchy(data);
  condense(root);
  ROOT = root;
  totalScore = 100 + scoreSum(root);

    root.sum(function(d) {
    
    return Math.abs(parseFloat(d.data.Points));
  });

//Fill in the colors
svg.selectAll("path")
    .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        nodeToPath.set(d, this)
        return color(d.data.data["Credibility Indicator Category"]);
      })


//Setting the center circle to the score
svg.selectAll(".center-text")
        .style("display", "none")
    svg.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-size", 40)
        .style("text-anchor", "middle")
        .html((totalScore))


//Setting the outer and inside rings to be transparent.
d3.selectAll("path").transition().each(function(d) {
    if (!d.children) {
        this.style.display = "none";
    } else if (d.height == 2) {
        this.style.opacity = 0;
    }
})

//Mouse animations.
svg.selectAll('path')
    .on('mouseover', function(d) {
        if (d.height == 1) {
        }
        drawVis(d, root, this, div);
        visualizationOn = true;
    })
    .on('mousemove', function(d) {
        if (visualizationOn) {
        div
            .style("opacity", .7)
            .style("left", (d3.event.pageX)+ "px")
            .style("top", (d3.event.pageY) + "px")
        } else {
            div.transition()
                .duration(10)
                .style("opacity", 0);
        }
    })
    .on('mouseleave', function(d) {
        resetVis(d);
    }).on('click', function(d) {
      scrolltoView(d)
    })
    .on('click', function(d) {
        scrolltoView(d);
    })
    .style("fill", colorFinderSun);

}); 
d3.select(self.frameElement).style("height", height + "px");

}

/*** HELPER FUNCTIONS ***/

/* Function that provides the color based on the node.
    @param d: the node in the data heirarchy
    @return : a d3.rgb object that defines the color of the arc
*/

function colorFinderSun(d) {
    if (d.data.children) {
        if (d.data.data['Credibility Indicator Name'] == "Reasoning") {
               return d3.rgb(239, 117, 89);
            } else if (d.data.data['Credibility Indicator Name'] == "Evidence") {
               return d3.rgb(87, 193, 174);
            } else if (d.data.data['Credibility Indicator Name'] == "Probability") {
                return d3.rgb(118, 188, 226);
            } else {
               return d3.rgb(75, 95, 178);
            }
        }   else {
            if (d.data.size > 0) {
                return d3.rgb(172,172,172);
            }
            if (d.parent.data.data['Credibility Indicator Name'] == "Reasoning") {
                return d3.rgb(239, 117, 89);
            } else if (d.parent.data.data['Credibility Indicator Name'] == "Evidence") {
                return d3.rgb(87, 193, 174);
            } else if (d.parent.data.data['Credibility Indicator Name'] == "Probability") {
                return d3.rgb(118, 188, 226);
            } else {
                return d3.rgb(75, 95, 178);
            }
        }
  }


/* Function that resets the visualization after the mouse has been moved
   away from the sunburst. It resets the text score to the original
   article score and resets the colors to their original.
   @param d : the node in the data heirarchy
   @return : none
*/
function resetVis(d) {
  // theresa start
    normalSun(d);
// theresa end
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
        .style("display", function(d) {
            if (d.children) {
            } else {
                return "none";
            }
        })
    DIV.transition()
            .delay(200)
            .duration(600)
            .style("opacity", 0);
    var total = parseFloat(scoreSum(d));
    SVG.selectAll(".center-text").style('display', 'none');
    SVG.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-size", 40)
        .style("text-anchor", "middle")
        .html((totalScore));
    visualizationOn = false;
}

/*Function that draws the visualization based on what is being hovered over.
    @param d : the node in the data heirarchy that I am hovering over
    @param root : the root of the data heirarchy
    @param me : the path that I am hovering over.
    @return : none
*/
function drawVis(d, root, me, div) {
    if (d.height == 2) {
        resetVis(d);
        return;
    }
    d3.selectAll("path")
        .transition()
        .style("opacity", function(d) {
            return .5
            }
        );
    if (d.children) {
        var node;
        for (node of d.children) {
            var path = nodeToPath.get(node);
            d3.select(path)
                .transition()
                .style("display", "block")
                .style("opacity", 0.5)
                .duration(100)
        }
    } else {
        var child;
        for (child of d.parent.children) {
            var path = nodeToPath.get(child);
            path.style.opacity = .5;
        }
    }

    d3.select(me)
        .transition()
        .duration(300)
        .attr('stroke-width', 5)
        .style("opacity", 1)

    if (d.height == 0) {
      // let textToHighlight = document.getElementById(d["Credibility Indicator Name"] + "-" + d.Start + "-" + d.End);
      // console.log(textToHighlight);
      // highlight(textToHighlight);
        d3.select(nodeToPath.get(d.parent))
            .transition()
            .duration(300)
            .attr('stroke-width', 5)
            .style("opacity", 1)
// theresa start
    } if (d.height == 0) {
        //console.log(d);
        let textToHighlight = document.getElementsByName(d.data.data["Credibility Indicator ID"] + "-" + d.data.data.Start + "-" + d.data.data.End);
        if (d.data.data.Start == -1) {
          console.log("This fallacy does not have a highlight in the article body.");   
        } else {
            highlightSun(textToHighlight[0]);
        }
    }
    //theresa end
    else if (d.height == 2) {
        d3.select(me).style('display', 'none');
    } else if (d.height == 1) {
        d3.select(nodeToPath.get(d.parent)).style('display', 'none');
    }
    //console.log(d.data.data['Credibility Indicator Name']);
    div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html(d.data.data['Credibility Indicator Name'])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
            .style("width", function() {
                if (d.data.data['Credibility Indicator Name'].length < 18) {
                    return "90px";
                } else {
                    return "180px";
                }
            })

    var pointsGained = scoreSum(d);
    SVG.selectAll(".center-text").style('display', 'none');
    SVG.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-size", 40)
        .style("text-anchor", "middle")
        .html((pointsGained));
}




/*
Recursive function that returns a number that represents the total score of the given arc.
For the center, we simply return the score of the article (100 plus the collected points).
    @param d = the node of the hierarchy.
    @return : the cumulative score of a certain path.
              These are the points lost. The
              scoreSum(root) of an article with no
              points lost would be 0.
*/
function scoreSum(d) {
    if (d.data.data.Points) {
        return Math.round(d.data.data.Points);
    } else {
        var sum = 0;
        for (var i = 0; i < d.children.length; i++) {
            sum += parseFloat(scoreSum(d.children[i]));
        }
        if (d.height == 2) {
            articleScore = parseFloat(sum);
            return Math.round(articleScore);
        }
        return Math.round(sum);
    }
}
// theresa start
function scrolltoView(x) {
    if (x.height == 0) {
        let textToView = document.getElementsByName(x.data.data["Credibility Indicator ID"] + '-' + x.data.data.Start + '-' + x.data.data.End);
        textToView[0].scrollIntoView({behavior: "smooth", block:"center"});
    }
}
function highlightSun(x) {
  // console.log(x.toElement);
  //console.log(x.toElement.style);
  var color = x.style.borderBottomColor;      // grab color of border underline in rgb form
  var color = color.match(/\d+/g);                      // split rgb into r, g, b, components
  //console.log(color);

  x.style.setProperty("background-color", "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + "0.25");
  x.style.setProperty("background-clip", "content-box");
}

function normalSun() {
    //console.log(x.toElement);
    var allSpans = document.getElementsByTagName('span');
    for (var i = 0; i < allSpans.length; i++) {
      allSpans[i].style.setProperty("background-color", "transparent");
    }
}
//theresa end
