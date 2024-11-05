document.getElementById('countryForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        const data = await response.json();
        const countryData = data[0];

        const countryResults = document.getElementById('countryResults');
        countryResults.innerHTML = `
            <h2>${countryData.name.common}</h2>
            <p><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${countryData.region}</p>
            <p><strong>Subregion:</strong> ${countryData.subregion}</p>
            <p><strong>Languages:</strong> ${Object.values(countryData.languages).join(', ')}</p>
            <p><strong>Currency:</strong> ${Object.values(countryData.currencies)[0].name} (${Object.values(countryData.currencies)[0].symbol})</p>
            <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}" style="width: 100px; height: auto;">
        `;
    } catch (error) {
        const countryResults = document.getElementById('countryResults');
        countryResults.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
