import axios from 'axios';

const url = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true';
const urlDaily = 'https://api.apify.com/v2/datasets/sFSef5gfYg3soj8mb/items?format=json&clean=1';

export const fetchCardData = async (country) => {
    try {
        const response = await axios.get(url);
        
        let modifiedData = response.data.map(data => ({
            country: `${data.country}`,
            infected: `${data.infected}`,
            recovered: `${data.recovered}`,
            deceased: `${data.deceased}`,
            lastUpdatedApify: `${data.lastUpdatedApify}`
        }))

        if (!country) {
            country = "Philippines";
        }

        modifiedData = modifiedData.filter(modData => modData.country === country);

        // console.log("fetched API Card Data: ", modifiedData);
        return modifiedData;

    } catch (error) {
        console.log('error occurred fetchData()', error)
    }
    
}

export const fetchDailyData = async () => {
    try {
        const response = await axios.get(urlDaily);
        const modifiedData = response.data.map(data => ({
            country: `${data.country}`,
            infected: `${data.infected}`,
            recovered: `${data.recovered}`,
            deceased: `${data.deceased}`,
            lastUpdatedAtApify: `${data.lastUpdatedAtApify}`
        }))
        // console.log("fetched API Daily Data: ", modifiedData);
        return modifiedData;
    } catch (error) {
        console.log('error occurred fetchDailyData()', error)
    }
}

export const fetchCountries = async () => {
    try {
        const response = await axios.get(url);
        
        const modifiedData = response.data.map(data => ({
            country: `${data.country}`,
        }))
        // console.log("fetched API countries Data: ", modifiedData);
        return modifiedData;
    } catch (error) {
        console.log('error occurred countries()', error)
    }
}