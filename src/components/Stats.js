import React, { Component } from 'react'
import Chart from 'chart.js'
import axios from 'axios'
class Stats extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getVietnamStat();
        this.getWorldStat();
    }

    getVietnamStat = () => {
        axios
            .get('https://td.fpt.ai/corona/corona-chart-vn.json')
            .then(res => {
                if (res.status === 200) {
                    const labels = [];
                    const infection = [];
                    const suspectedInfection = [];
                    const recovered = [];
                    Object.keys(res.data).map(function (key) {
                        labels.push(key);
                        infection.push(res.data[key][0]);
                        suspectedInfection.push(res.data[key][1]);
                        recovered.push(res.data[key][2]);

                    });

                    return { labels, infection, suspectedInfection, recovered };
                }
            })
            .then(data => {
                this.initVietnamStatChart(data.labels, data.infection, data.suspectedInfection, data.recovered);
            })
            .catch(err => { console.log('VNChart err: ' + err) });
    }


    getWorldStat = () => {
        axios
            .get('https://td.fpt.ai/corona/corona-total.json')
            .then(res => {
                if (res.status === 200) {
                    const labels = [];
                    const infection = [];
                    const suspectedInfection = [];
                    const recovered = [];
                    Object.keys(res.data).map(function (key) {
                        labels.push(key);
                        infection.push(res.data[key][0]);
                        suspectedInfection.push(res.data[key][1]);
                        recovered.push(res.data[key][2]);

                    });

                    return { labels, infection, suspectedInfection, recovered };
                }
            })
            .then(data => {
                this.initWorldStatChart(data.labels, data.infection, data.suspectedInfection, data.recovered);
            })
            .catch(err => { console.log('worldChart err: ' + err) });
    }

    initVietnamStatChart(labels, infectionArr, suspectedInfectionArr, recoveredArr) {
        const chart = document.querySelector('#VNChart');
        const VNChart = new Chart(chart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hồi phục',
                    data: recoveredArr,
                    backgroundColor: ['rgba(0, 128, 0, 0.3)'],
                    borderColor: ['rgba(0, 128, 0, 0.5)'],
                    borderWidth: 1
                },
                {
                    label: 'Nghi nhiễm',
                    data: suspectedInfectionArr,
                    backgroundColor: ['rgba(243, 156, 18, 0.3)'],
                    borderColor: ['rgba(243, 156, 18)'],
                    borderWidth: 1
                },
                {
                    label: 'Nhiễm bệnh',
                    data: infectionArr,
                    backgroundColor: ['rgba(255, 0, 0, 0.3)'],
                    borderColor: ['rgba(255, 0, 0, 0.5)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    initWorldStatChart(labels, infectionArr, suspectedInfectionArr, recoveredArr) {
        const chart = document.querySelector('#worldChart');
        const worldChart = new Chart(chart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hồi phục',
                    data: recoveredArr,
                    backgroundColor: ['rgba(0, 128, 0, 0.3)'],
                    borderColor: ['rgba(0, 128, 0, 0.5)'],
                    borderWidth: 1
                },
                {
                    label: 'Nghi nhiễm',
                    data: suspectedInfectionArr,
                    backgroundColor: ['rgba(243, 156, 18, 0.3)'],
                    borderColor: ['rgba(243, 156, 18)'],
                    borderWidth: 1
                },
                {
                    label: 'Nhiễm bệnh',
                    data: infectionArr,
                    backgroundColor: ['rgba(255, 0, 0, 0.3)'],
                    borderColor: ['rgba(255, 0, 0, 0.5)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <h3 className='chartTitle'>Covid-19 Statistics in Vietnam</h3>
                    <canvas id="VNChart" width="400" height="150"></canvas>
                </div>
                <div className='container-fluid'>
                    <h3 className='chartTitle'>Covid-19 Statistics of the World</h3>
                    <canvas id="worldChart" width="400" height="150"></canvas>
                </div>
            </div>
        )
    }
}

export default Stats;