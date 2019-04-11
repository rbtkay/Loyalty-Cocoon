import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card, Segment, Container, Button } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import { Router } from '../../routes';
import { SemanticToastContainer, toast } from "react-semantic-toasts";

class search extends Component {

    state = {
        products: [],
        search: '',
        isSearching: true,
        successful: false
    }

    static async getInitialProps(props) {
        const { search } = props.query;

        // console.log("00000000000000000000000000000000000000000000000000");
        // console.log(props);

        // console.log("the search:" + search);

        // try {
        //     const response = await fetch(`/api/user/product/search?search=${search}`, {
        //         headers: new Headers({
        //             'authorization': localStorage.getItem('authorization')
        //         })
        //     });
        //     console.log('response.status');
        //     console.log(response.status);

        //     if (response.status === 404) {
        //         return { search, products: [] }
        //     } else if (response.status === 200) {
        //         const products = await response.json();
        //         console.log(products);
        //         isSearching = false;
        //         return { search, products: products, isSearching };
        //     }
        // } catch (e) {
        //     console.log('chou fik ta3mil');
        //     isSearching = true;
        // }

        return { search };
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <Segment>
                    <br /><br /><br />
                    <Segment>
                        <h1>Search Results for '{this.props.search}'</h1>
                    </Segment>
                    <SemanticToastContainer />
                    <Segment color='violet' inverted>
                        {this.renderProducts()}
                    </Segment>
                </Segment>
            </div>
        )
    }

    // componentWillReceiveProps() {
    //     console.log('in the will receive props');
    //     console.log(this.props.isSearching);

    //     if (this.props.isSearching === false) {
    //         console.log('in the if');
    //         this.setState(({ products: this.props.products, isSearching: false }), () => {
    //             console.log(this.props.products, this.props.isSearching);
    //         });
    //     }
    // }

    // componentdid() {
    //     this.componentDidMount();
    // }

    async componentDidMount() {

        console.log("in the component did mount");
        console.log(this.props);
        
        try {
            const response = await fetch(`/api/user/product/search?search=${this.props.search}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });
            console.log('response.status');
            console.log(response.status);

            if (response.status === 404) {
                await this.setState({ isSearching: false, products: [] });
            } else if (response.status === 200) {
                const products = await response.json();
                console.log(products);
                this.setState({ search, products, isSearching: false });
            }
        } catch (e) {
            throw e;
        }
    }

    renderProducts() {
        console.log('in the render products');
        if (this.state.isSearching === false) {
            if (this.state.products.length > 0) {
                console.log('Rendering');
                return (<CategoryCard {...this.state} handleSuccess={this.flipSuccess} />);
            } else {
                return (
                    <Container>
                        <Segment>
                            <h3>No Product Found.</h3>
                        </Segment>
                    </Container>
                )
            }
        } else {
            return (
                <Container>
                    <Segment>
                        <h3>Loading Products...</h3>
                    </Segment>
                </Container>)
        }
    }

    showSuccessToast = () => {
        setTimeout(() => {
            toast({
                type: "success",
                icon: "thumbs up",
                title: "Transaction Successful",
                description: "Congratulations! Your transaction is successful, please visit the vendor to claim your reward.",
                time: 5000
            });
        }, 5000);
    }

    flipSuccess = () => {
        if (!this.state.successful) {
            this.setState({ successful: true });
            this.showSuccessToast();
        } else {
            this.setState({ successful: false });
        }
    }
}

export default search;