// This function fetches the definition of a word from the Merriam-Webster Dictionary API
async function grabJsonDefinition(word, ref, key) {
    // Construct the API endpoint URL with the provided word, reference, and API key
    const uri = `https://dictionaryapi.com/api/v3/references/${encodeURIComponent(ref)}/json/${encodeURIComponent(word)}?key=${encodeURIComponent(key)}`;

    try {
        // Fetch data from the API endpoint
        const response = await fetch(uri);
        // Check if the response is okay, if not, throw an error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response and return it
        return await response.json();
    } catch (error) {
        // Handle errors that occur during the fetch operation
        console.error('Error fetching JSON definition:', error);
        return null;
    }
}

// Function for when the user clicks the search button
async function getData() {
    // Get the the word entered by the user
    const searchTerm = document.getElementById('searchInput').value;
    // Check if the input field is empty
    if (!searchTerm) {
        // Display an alert if the input field is empty
        alert('Type a word to display its definition.');
        return;
    }

    try {
        // Fetch the definition of the entered word from the API
        const data = await grabJsonDefinition(searchTerm, 'sd4', 'a98a7d0c-aa98-4c0d-b4b4-814ac6dc5cc5');

        // Display the definition of the entered word
        const definition = data[0].shortdef[0];
        document.getElementById('info').innerHTML = `
            <p>Definition of <strong>${searchTerm}</strong>:</p>
            <p>${definition}</p>
        `;
    } catch (error) {
        // Handle errors that occur during the data retrieval process
        console.error('Error fetching data:', error);
        document.getElementById('info').innerHTML = '<p>Failed to fetch definition. The word may not exist or could not be found.</p>';
    }
}

// Add an event listener to the search button
// When the button is clicked, call the getData() function to fetch and display the definition
document.getElementById('searchButton').addEventListener('click', getData);
