// from data.js
$(document).ready(function() {

    console.log("page loaded");
    buildTable();

    //Event Listeners
    $("#filterForm").on("submit", function(e) {
        e.preventDefault();
        buildTable();
    });


});

var tableData = data;

function buildTable() {
    var dateFilter = $("#datetimeFilter").val(); //gets input value to filter

    if (dateFilter === "") {
        buildTableString(tableData);
    } else {
        var filteredData = tableData.filter(row => row.datetime === dateFilter);
        // if (filteredData.length === 0) {
        //     alert("Invalid Filter!");
        // }

        buildTableString(filteredData);
    }
}

function buildTableString(tableData) {
    // JQUERY creates an HTML string
    var tBody = $("#ufo-table>tbody");
    // clear table
    tBody.empty();

    //append data
    tableData.forEach(function(row) {
        var newRow = "<tr>"
            // loop through each Object (dictionary)
        Object.entries(row).forEach(function([key, value]) {
            // set the cell data
            newRow += `<td>${value}</td>`
        });

        //append to table
        newRow += "</tr>";
        tBody.append(newRow);
    });
}