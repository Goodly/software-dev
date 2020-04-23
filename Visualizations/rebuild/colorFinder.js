function colorFinder(jsonLine) {
  //The children node colors are based on the colors of their parents.
  if (jsonLine["Credibility Indicator Category"] === "Reasoning") {
    return d3.rgb(239, 92, 84);
  } else if (jsonLine["Credibility Indicator Category"] === "Evidence") {
    return d3.rgb(0, 165, 150);
  } else if (jsonLine["Credibility Indicator Category"] === "Probability") {
      return d3.rgb(0, 191, 255);
  } else if (jsonLine["Credibility Indicator Category"] == "Language") {
      return d3.rgb(43, 82, 230);
  } else {
      return d3.rgb(255, 180, 0);
  }
}
