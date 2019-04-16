import React, { Component } from 'react'
import Layout from '../../components/Layout';
import NavigationBar from '../../components/VendorNavBar';
import { Segment, Button, Grid, Container } from 'semantic-ui-react';
import { Bar, Line, Pie, Radar, Bubble } from 'react-chartjs-2';
import { getCookie } from '../../cookie';

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
        }
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
        try {
            const username = getCookie('username');
            // console.log(username);
            const locoDistribution = await fetch(`/api/stats/locoPerMonth?username=${username}`);
            const locoDistributionResult = await locoDistribution.json();

            const monthsLoco = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
            }

            const date = new Date();
            const currentMonth = date.getMonth() + 1;

            const pastMonth = currentMonth - 6;

            console.log('currentMonth:', currentMonth);

            locoDistributionResult.map(purchase => {
                var month = purchase['purchase_date'].split('-')[1];
                var loco = purchase['product_loco'];
                console.log(month);
                console.log(loco);
                monthsLoco[month]++;
            })

            console.log(monthsLoco);
            console.log(locoDistributionResult);
        } catch (err) {
            throw err;
        }
    }

    renderChart() {
        if (this.state.currentChart === 1) {
            return (
                <Bar
                    height='100'
                    data={this.state.chartData}
                />
            )
        } else if (this.state.currentChart === 2) {
            return (
                <Line
                    height='100'
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Customers'
                        }
                    }
                    }
                />
            )
        } else if (this.state.currentChart === 3) {
            return (
                <Radar
                    height='100'
                    data={this.state.chartData}
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