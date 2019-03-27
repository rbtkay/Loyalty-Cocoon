import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import Layout from '../../components/Layout';



export default class SearchExampleStandard extends Component {
    // componentWillMount() {
    //     this.resetComponent()
    // }

    state = { isSearchLoading: false, searchResult: [], searchValue: '' }

    


    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, searchValue: value })

        setTimeout(() => {
            if (this.state.searchValue.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i')
            const isMatch = searchResult => re.test(searchResult.title)

            const source = _.times(5, () => ({
                title: "faker.company.companyName()",
                description: "faker.company.catchPhrase()",
                image: "faker.internet.avatar()",
                price: 'faker.finance.amount(0, 100, 2)',
            }))

            this.setState({
                isSearchLoading: false,
                searchResult: _.filter(source, isMatch),
            })
            console.log('source');
            console.log(source);
        }, 300)
    }

    render() {
        const { isSearchLoading, searchValue, searchResult } = this.state

        return (
            <div>
                <Layout />
                <Grid>
                    <Grid.Column width={6}>
                        <Search
                            loading={isSearchLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                            results={searchResult}
                            value={searchValue}
                        // {...this.props}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}