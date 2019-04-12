import React, { Component } from 'react'
import Layout from '../../components/Layout';
import NavigationBar from '../../components/VendorNavBar';
import { Segment, Button } from 'semantic-ui-react';
import { Bar, Line, Pie, Radar, Bubble } from 'react-chartjs-2';

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
                {/* <Segment>
                    <h3>Dashboard</h3>
                </Segment> */}
                <Segment color='violet' inverted>
                    {/* <divs className='chart'> */}
                    <Segment>
                        {this.renderChart()}
                    </Segment>

                    <Button onClick={this.back}>Back</Button>
                    <Button onClick={this.next}>Next</Button>
                    {/* <Pie data={this.state.chartData} /> */}
                    {/* </divs> */}
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