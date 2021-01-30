import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import Spinner from '../Spinner/Spinner';

import styles from './Chart.module.css';

const Chart = ({ countryData, country }) => {
    const [ dailyData, setDailyData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchAPI = async () => {
            const res = await fetchDailyData();
            setDailyData(res);
            //console.log("Chartjs useEffect is called: res is ", res);
            setLoading(false);
        }
        fetchAPI();
    }, []); 

    let lineChart = (
        (dailyData.length !== 0 && !loading)
        ? ( <React.Fragment>
            <h2>Historical Data - Philippines</h2>
            <Line
                data={{
                    labels: dailyData.map(({ lastUpdatedAtApify }) => new Date(lastUpdatedAtApify).toLocaleDateString ("fr-CA")),
                    datasets: [{
                        data: dailyData.map(({ infected }) => infected),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deceased }) => deceased),
                        label: 'Deceased',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }]
                }}
            />
            </React.Fragment>
        ) : <Spinner />
    );

    // console.log(`Barchart country is xxx${country}xxx`);
    // console.log("Barchart countryData is ", countryData);
    
    const barChart = (
        (!countryData || countryData.country === "Philippines") ? null : (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deceased'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [countryData.infected, countryData.recovered, countryData.deceased]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`},
                }}
            />
        )
    )

    return (
        <div className={styles.container}>
            {barChart ? barChart : lineChart}
        </div>
    )
}

export default Chart;