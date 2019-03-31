import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import ProductRow from '../../components/ProductRow';
import NavigationBar from '../../components/NavigationBar';
import { Router } from '../../routes';
import session from 'express-session';
import { SemanticToastContainer, toast } from "react-semantic-toasts";

class Loyalty extends Component {
    state = {
        products: [],
        filter: "all",
        successful: false
    };


    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br /><br /><br /><br /><br />
                <SemanticToastContainer />
                <ProductRow handleSuccess={this.flipSuccess}/>
                <br />
            </div>
        );
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

export default Loyalty;