
// Populate dropbox with ID Values.

d3.json("samples.json").then((data) => {
    dataNames = data.names;
    sampledata = data.samples;
    datametadata = data.metadata;
    firstID = sampledata[0].otu_ids
    firstIDlabels = sampledata[0].otu_labels;
    dataNames.forEach((name) => {
    var dropdownMenu = d3.select("#selDataset");
    var newoption = dropdownMenu.append("option");
    newoption.attr('value', name);
    newoption.text(name);   
    selectedID = dropdownMenu.node().value;
    console.log(selectedID)
})
});

// Setting default when launched.

var defaultID = "940"
optionChanged(defaultID);

// function to change demographics table and all charts based on selected ID

function optionChanged(selectedID) {
    //console.log(sampleValue);
        metadataTable(selectedID);
        barchart(selectedID);
        bubblechart(selectedID);
};

// function to populate the Demographics Table based on selected ID
function metadataTable(selectedID) {
    d3.json("samples.json").then((data) => {
        var info = datametadata.filter(person => person.id == selectedID);
        var selectedinfo = info[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        var demographics = Object.entries(selectedinfo)
        demographics.forEach((item) => {
        panel.append("h6").text(item[0]+': '+item[1]);
    });
  });
};

// ------------------------------------------------------------------------------------------------
//                                                  BAR PLOT 
// ------------------------------------------------------------------------------------------------
function barchart(selectedID){
    d3.json("samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values.slice(0,10);
    var IDs = valuearray.otu_ids.map(otu => "OTU " + otu);
    var labels = valuearray.otu_labels.slice(0,10);

    // Create the trace for plotting
    var trace = {
        x : values,
        y : IDs,
        text : labels,
        type : 'bar',
        orientation : 'h'
    };

    // Define the plot layout
    var layout = {
        title: "Top 10 OTU's for Selected Test Subject",
        xaxis: { title: "Sample Value" },
        yaxis: { title: "OTU ID" }
    };

    // Define the data
    var data = [trace]

    // Create plot using Plotly
    Plotly.newPlot('bar', data, layout)

})}; 


// ------------------------------------------------------------------------------------------------
//                                                  Bubble Chart
// ------------------------------------------------------------------------------------------------


function bubblechart(selectedID){
    d3.json("samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values;
    var IDs = valuearray.otu_ids;
    var labels = valuearray.otu_labels;
    // console.log(valuearray);

    // Create the trace for plotting
    var trace = {
        x : IDs,
        y : values,
        text : labels,
        mode: 'markers',
        marker: {
            size: values,
            color: IDs
        }
    };

    // Define the plot layout
    var layout = {
        title: "All OTU's for Selected Test Subject",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" }
    };

    // Define the data
    var plotdata = [trace];

    // Create plot using Plotly
    Plotly.newPlot('bubble', plotdata, layout);

})}; 