// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;

    console.log(`Selected Sample: ${sample}`);

    // convert sample name to interger
    sample = parseInt(sample);

    console.log(`Selected Sample after conversion: ${sample}`);

    // Filter the metadata for the object with the desired sample number
    //sample=940;
    const filteredMetadata = metadata.find(item => item.id === sample);
    console.log(`Filtered Metadata Array for Sample ${sample}:`, filteredMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");

    // Log the panel to verify the selection
    console.log("Selected Panel:", panel);


    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    if (filteredMetadata){
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
    } else {
       panel.html("No metadat found for the selected sample.");
      }
    console.log(`Metadata for Sample ${sample} added to the panel.`);

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    
    
    console.log(`Selected Sample in buildCharts: ${sample}`);

    // convert sample name to interger
    //sample = parseInt(sample);

    console.log(`Selected Sample in buildCharts after conversion: ${sample}`);

    // Get the samples field
    const samples = data.samples; // Extract the samples array

    // Filter the samples for the object with the desired sample number
    const selectedSample = samples.filter(d => d.id === sample);

    console.log('Selected Sample :',selectedSample);

    // Get the otu_ids, otu_labels, and sample_values
    const otuIds = selectedSample[0]["otu_ids"];
    const sampleValues = selectedSample[0]["sample_values"];
    const otuLabels = selectedSample[0]["otu_labels"];

    // verify the contents of otuIds, otu_labels and sampleValues

    console.log('Selected Sample otuIds:',otuIds);
    console.log('Selected Sample Values:',sampleValues);
    console.log('Selected otuLables:',otuLabels);

    // Build a Bubble Chart
     // Create trace for the bubble chart
     const trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth" // Set a color scale for better visualization
      }
    };

    const layout = {
      title: `Bacteria Cultures Per Sample`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Number of Bacteria" },
      showlegend: false,
      height: 600,
      width: 1200
    };

    // Plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout);

    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    

    // Get top 10 OTUs
    const top10Values = selectedSample[0].sample_values.slice(0, 10).reverse();
    const top10OtuIds = selectedSample[0].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const top10Labels = selectedSample[0].otu_labels.slice(0, 10).reverse();

    // Create trace for the bar chart
    const trace2 = {
      x: top10Values,
      y: top10OtuIds,
      text: top10Labels,
      type: "bar",
      orientation: "h" // Horizontal bar chart
    };

    const layout2 = {
      title: `Top 10 Bacteria Cultures Found`,
      xaxis: { title: "Number of Bacteria" },
      yaxis: { title: "OTU IDs" }
    };

    // Render the Bar Chart
     // Plot the bar chart
     Plotly.newPlot("bar", [trace2], layout2);
  

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdown
        .append("option")
        .text(name) // Set the text to display
        .attr("value", name); // Set the value attribute
    });


    // Get the first sample from the list
    const firstSample = names[0];

    
    
        // Call a function to initialize with the first sample
    initializeDashboard(firstSample);

    // Function to initialize the dashboard
    function initializeDashboard(sample) {
      console.log(`Initializing dashboard with sample: ${sample}`);
      // Add logic to load charts or metadata for the first sample
      buildMetadata(firstSample);
      buildCharts(firstSample);

    }

    // Add an event listener to handle dropdown selection change
    dropdown.on("change", function() {
      const selectedSample = d3.select(this).property("value");
      console.log(`Selected Sample: ${selectedSample}`);
      handleSelectionChange(selectedSample);
    });

    // Function to handle selection change
    function handleSelectionChange(sample) {
      console.log(`Handle selection change for sample: ${sample}`);
      // Add logic to update charts or metadata for the selected sample
      buildMetadata(sample);
      buildCharts(sample);
    }


    // // Build charts and metadata panel with the first sample
    // buildMetadata(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  
  // Add an event listener to handle dropdown selection change
  // dropdown.on("change", function() {
  //   const selectedSample = d3.select(this).property("value");
  //   console.log(`Selected Sample: ${selectedSample}`);
  //   handleSelectionChange(selectedSample);
  // });

  // // Function to handle selection change
  // function handleSelectionChange(sample) {
  //   console.log(`Handle selection change for sample: ${sample}`);
  //   // Add logic to update charts or metadata for the selected sample

  //   buildCharts(selectedSample);

  // }

  
}

// Initialize the dashboard
init();
