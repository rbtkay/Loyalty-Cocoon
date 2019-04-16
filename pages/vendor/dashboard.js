import React, { Component } from 'react'
import Layout from '../../components/Layout';
import NavigationBar from '../../components/VendorNavBar';
import { Segment, Button, Grid, Container } from 'semantic-ui-react';
import { Bar, Line, Pie, Radar, Bubble } from 'react-chartjs-2';
import { getCookie } from '../../cookie';

const indexToMonths = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}

class Dashboard extends Component {

    state = {
        currentChart: 1,
        chartData: {
            labels: ['Boston', 'test1', 'test2', 'test3', 'test4', 'test5'],
            datasets: [{
                label: 'Population',
                data: [
                    34,
                    24,
                    25,
                    35,
                    21,
                    36,
                    24
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1.0)',
                    'rgba(54, 162, 235, 1.0)',
                    'rgba(255, 206, 86, 1.0)',
                    'rgba(75, 192, 192, 1.0)',
                    'rgba(153, 102, 255, 1.0)',
                    'rgba(255, 159, 64, 1.0)'
                ],
            }]
        },
        barData: {},
        lineData: {},
        radarData: {}
    }




    render() {

        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <br />
                <Segment color='violet' inverted>
                    <Container>
                        <Segment>
                            {this.renderChart()}
                        </Segment>
                        <Button basic inverted onClick={this.back}>Back</Button>
                        <Button basic inverted onClick={this.next}>Next</Button>
                    </Container>
                </Segment>
            </div>
        )
    }

    next = async () => {
        const chartNumber = this.state.currentChart === 4 ? 1 : this.state.currentChart + 1;
        this.setState({ currentChart: chartNumber });
    }

    back = () => {
        const chartNumber = this.state.currentChart === 1 ? 4 : this.state.currentChart - 1;
        this.setState({ currentChart: chartNumber });
    }

    async componentDidMount() {
        //TODO: Call api to get stats.
        /**
         * Number of Products bought per month
         * Items most Viewed
         * Amount of Point Generated on the Site and its Distribution
         * Distribution of Product Bought (Pie Chart with Count and # of loco generated)
         * Categories distribution (radar chart)
         */

        //Get the Loco Distribution per Month.
        this.getLineStats();

        //Get the 

    }

    async getLineStats() {
        try {
            const username = getCookie('username');
            // console.log(username);
            const locoDistribution = await fetch(`/api/stats/locoPerMonth?username=${username}`);
            const locoDistributionResult = await locoDistribution.json();

            ///////////////////////////////////////

            const categories = {
                'Clothing': { 'count': 0, 'loco': 0 },
                'Food': { 'count': 0, 'loco': 0 },
                'Groceries': { 'count': 0, 'loco': 0 },
                'Electronics': { 'count': 0, 'loco': 0 },
                'Toys': { 'count': 0, 'loco': 0 }
            }

            const monthsLoco = {
                1: { 'name': 'Jan', 'count': 0, 'loco': 0 },
                2: { 'name': 'Feb', 'count': 0, 'loco': 0 },
                3: { 'name': 'Mar', 'count': 0, 'loco': 0 },
                4: { 'name': 'Apr', 'count': 0, 'loco': 0 },
                5: { 'name': 'May', 'count': 0, 'loco': 0 },
                6: { 'name': 'Jun', 'count': 0, 'loco': 0 },
                7: { 'name': 'Jul', 'count': 0, 'loco': 0 },
                8: { 'name': 'Aug', 'count': 0, 'loco': 0 },
                9: { 'name': 'Sep', 'count': 0, 'loco': 0 },
                10: { 'name': 'Oct', 'count': 0, 'loco': 0 },
                11: { 'name': 'Nov', 'count': 0, 'loco': 0 },
                12: { 'name': 'Dec', 'count': 0, 'loco': 0 }
            }

            const date = new Date();
            let currentMonth = parseInt(date.getMonth() + 1);
            const currentYear = date.getFullYear();

            console.log('currentMonth:', currentMonth);
            console.log(locoDistributionResult);

            locoDistributionResult.map(purchase => {
                var month = parseInt(purchase['purchase_date'].split('-')[1]);
                var year = parseInt(purchase['purchase_date'].split('-')[0]);
                var loco = parseInt(purchase['product_loco']);

                if (year === currentYear) {
                    const category = purchase['product_category'];
                    categories[category]['count']++;
                    categories[category]['loco'] += loco;

                    if (month > (currentMonth - 6)) {
                        monthsLoco[month]['count']++;
                        monthsLoco[month]['loco'] += loco;
                    }
                } else if (year === currentYear - 1) {
                    if (month > (12 - (6 - currentMonth))) {
                        monthsLoco[month]['count']++;
                        monthsLoco[month]['loco'] += loco;
                    }
                }
            })

            let labels = [];
            let lineData = [];
            let barData = [];

            for (let i = 0; i < 6; i++) {
                labels[i] = monthsLoco[currentMonth]['name'];
                lineData[i] = monthsLoco[currentMonth]['loco'];
                barData[i] = monthsLoco[currentMonth]['count'];

                currentMonth--;
                if (currentMonth <= 0) {
                    currentMonth = 12;
                }
            }

            console.log(categories);

            this.setState(
                {
                    lineData: {
                        labels: labels.reverse(),
                        datasets: [{
                            label: 'Loco Distribution',
                            data: lineData.reverse(),
                            backgroundColor: [
                                'rgba(54, 162, 235, 1.0)'
                            ],
                        }]
                    },
                    barData: {
                        labels: labels.reverse(),
                        datasets: [{
                            label: 'Product per Month',
                            data: barData.reverse(),
                            backgroundColor: [
                                'rgba(255, 99, 132, 1.0)',
                                'rgba(54, 162, 235, 1.0)',
                                'rgba(255, 206, 86, 1.0)',
                                'rgba(75, 192, 192, 1.0)',
                                'rgba(153, 102, 255, 1.0)',
                                'rgba(255, 159, 64, 1.0)'
                            ]
                        }]
                    },
                    radarData: {
                        labels: ['Clothing', 'Food', 'Groceries', 'Electronics', 'Toys'],
                        datasets: [{
                            label: 'Product by Category',
                            data: [
                                categories['Clothing']['count'],
                                categories['Electronics']['count'],
                                categories['Food']['count'],
                                categories['Groceries']['count'],
                                categories['Toys']['count'],
                            ],
                            backgroundColor: [
                                'rgba(148,0,211, 0.3)'
                            ]
                        }]
                    }

                })
        } catch (err) {
            throw err;
        }
    }

    renderChart() {
        if (this.state.currentChart === 1) {
            return (
                <Bar
                    height='100'
                    data={this.state.barData}
                />
            )
        } else if (this.state.currentChart === 2) {
            return (
                <Line
                    height='100'
                    data={this.state.lineData}
                />
            )
        } else if (this.state.currentChart === 3) {
            return (
                <Radar
                    height='100'
                    data={this.state.radarData}
                />
            )
        } else if (this.state.currentChart === 4) {
            return (
                <Pie
                    height='100'
                    data={this.state.chartData}
                />
            )
        } else {
            <h2>Loading Charts...</h2>
        }
    }
}

export default Dashboard;