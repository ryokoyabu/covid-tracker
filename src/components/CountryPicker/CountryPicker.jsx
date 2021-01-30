import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ countryChangeHandler }) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await fetchCountries();
            setFetchedCountries(res);
            //console.log("CountryPicker useEffect is called:", res);
        }
        fetchAPI();
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => countryChangeHandler(event.target.value)}> {/*event target is the selected country*/}
                <option value="">Philippines</option>
                {fetchedCountries.map((country, index) => <option key={index} value={country.country}>{country.country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;