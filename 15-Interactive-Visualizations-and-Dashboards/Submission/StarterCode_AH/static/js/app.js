$(document).ready(function() {

    starting();

    //event listener
    $("#selDataset").change(function() {
        doingWork();
    })
});


function starting() {
    d3.json("samples.json").then(function(data) {
        // save data to global
        sampleData = data;
        // console.log(sampleData)

        createFilters(data);
        doingWork();
    });
}


function doingWork() {
    var sample = parseInt($("#selDataset").val());
    // find where id matches cample
    var demographicData = sampleData.metadata.find(x => x.id == sample);
    var sampValues = sampleData.samples.find(x => x.id == sample);

    // makecharts
    barChart(sampValues);
    bubbleChart(sampValues);
    showDemographics(demographicData);
}

function createFilters(data) {
    data.names.forEach(function(num) {
        dropdown = d3.select("select");
        dropdown.append("option").text(num);
    })

}


function barChart(sampValues) {
    // create bar labels
    var barLabels = sampValues.otu_ids.slice(0, 10).map(function(idNum) {
        return `OTU ID: ${idNum}`;
    });
    // make bar chart
    var barData = [{
        type: 'bar',
        x: sampValues.sample_values.slice(0, 10),
        y: barLabels,
        text: sampValues.otu_labels.slice(0, 10),
        orientation: 'h',
        marker: {
            color: '#6cc3d5'

        }

    }];

    // format

    var layout = {
        title: {
            text: "Top 10 OTU's in Test Subject's Belly Button",
            font: {
                family: 'Montserrat',
                size: 24
            },
        },
        xaxis: {
            title: "Amount of Bacteria Found",
            font: {
                family: 'Montserrat',
                size: 14
            }
        },
        // yaxis: {
        //     title: "Bacteria (OTU) ID",

        // },
        // spacing
        margin: {
            l: 170,
            r: 10,
            t: 70,
            b: 50
        },
    }
    Plotly.newPlot('bar', barData, layout);
}

function bubbleChart(sampValues) {
    // make bubble chart
    var trace1 = {
        x: sampValues.otu_ids,
        y: sampValues.sample_values,
        text: sampValues.otu_labels,
        mode: 'markers',
        marker: {
            color: sampValues.otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sampValues.sample_values

        }
    };

    var traces = [trace1];
    // format

    var layout = {
        title: {
            text: 'All Bacteria Sample Values',
            font: {
                family: 'Montserrat',
                size: 24
            }
        },
        xaxis: {
            title: "Bacteria (OTU) ID",
            font: {
                family: 'Montserrat',
                size: 14
            }
        },
        yaxis: {
            title: "Amount of Bacteria Found",
            font: {
                family: 'Montserrat',
                size: 14
            }
        },
        showlegend: false,

    };

    Plotly.newPlot('bubble', traces, layout);


}

function showDemographics(demographicData) {
    $("#sample-metadata").empty();
    // build the informative table
    Object.entries(demographicData).forEach(function(unpack) {
        var tableVals = `<span><b>${unpack[0]}:</b> ${unpack[1]}</span><br>`;
        $("#sample-metadata").append(tableVals);
    });

}