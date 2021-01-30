import React, { useState, useEffect } from 'react';

import coronaImage from './images/covid-logo.jpg'
import { Cards, Chart, CountryPicker } from './components';
import { fetchCardData } from './api'

import styles from './App.module.css';

const App = () => {  
    const [ data, setData ] = useState({});
    const [ country, setCountry] = useState('')

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await fetchCardData();
            setData(res[0]);
            // console.log("App useEffect called: ", res)
        }
        fetchAPI();
    }, []);

    const countryChangeHandler = async (selectedCountry) => {
        //fetch data
        const fetchedData = await fetchCardData(selectedCountry);
        // console.log("countryChangedHandler data: ", fetchedData[0]);
        //set data
        setData(fetchedData[0]);
        setCountry(selectedCountry);
    }

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={coronaImage} alt="corona logo"/>
            <Cards data={data}/>
            <CountryPicker countryChangeHandler={countryChangeHandler}/>
            <Chart countryData={data} country={country}/>
            <footer>
                <p>API source: https://apify.com/covid-19</p>
                <p>Logo vector created by freepik - www.freepik.com</p>
            </footer>
        </div>
    )
}

export default App;