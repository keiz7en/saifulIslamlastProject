function connect() {
    const searchTerm = document.getElementById("searchBox").value.trim();
    document.getElementById("searchBox").value = ""; // Clear input box
    if (!searchTerm) {
        alert("Please enter a country name.");
        return;
    }
    
    const url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    fetch(url)
        .then(res => res.json())
        .then(data => display(data))
        .catch(error => console.error('Error:', error));
}

function display(data) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear previous content

    data.forEach(country => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("innerDivStyle");

        newDiv.innerHTML = `
            <h5>${country.name.common}</h5>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p>Region: ${country.region}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <button class="btn btn-info btn-sm" onclick="showMore('${country.name.common}')">More Details</button>
        `;

        displayArea.appendChild(newDiv);
    });
}

function showMore(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const country = data[0];
            alert(`
                Name: ${country.name.common}
                Capital: ${country.capital}
                Population: ${country.population.toLocaleString()}
                Area: ${country.area} km²
                Region: ${country.region}
            `);
        })
        .catch(error => console.error('Error:', error));
}
