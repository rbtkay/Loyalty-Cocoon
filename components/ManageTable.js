import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class ManageTable extends Component {

    render() {
        return (
            <Table selectable>
                {this.renderHeader()}

                <Table.Body>
                    {this.checkProducts()}
                </Table.Body>
            </Table>
        );
    }

    renderHeader = () => {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Image (link?)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    }

    checkProducts = () => {
        if (!this.props.offered) {
            return this.renderRow(this.props.products);
        } else {
            return this.renderOfferedRow(this.props.products);
        }
    }

    renderRow = (products) => {
        if (this.props.products) {
            return this.props.products.map((product, index) => {
                if (product.product_offered.data[0] == 0) {
                    if (!this.props.active.includes(index.toString())) {
                        return (
                            <Table.Row key={product['product_id']} data-item={index} onClick={this.props.handleActive}>
                                <Table.Cell>{product['product_id']}</Table.Cell>
                                <Table.Cell>{product['product_name']}</Table.Cell>
                                <Table.Cell>{product['product_category']}</Table.Cell>
                                <Table.Cell>{product['product_price']}</Table.Cell>
                            </Table.Row>
                        );
                    } else {
                        return (
                            <Table.Row key={product['product_id']} data-item={index} onClick={this.props.handleActive} active>
                                <Table.Cell>{product['product_id']}</Table.Cell>
                                <Table.Cell>{product['product_name']}</Table.Cell>
                                <Table.Cell>{product['product_category']}</Table.Cell>
                                <Table.Cell>{product['product_price']}</Table.Cell>
                            </Table.Row>
                        );
                    }
                } else {
                    return (
                        <Table.Row key={product['product_id']} data-item={index} disabled>
                            <Table.Cell>{product['product_id']}</Table.Cell>
                            <Table.Cell>{product['product_name']}</Table.Cell>
                            <Table.Cell>{product['product_category']}</Table.Cell>
                            <Table.Cell>{product['product_price']}</Table.Cell>
                        </Table.Row>
                    );
                }
            });
        }
    }

    renderOfferedRow = (products) => {
        if (this.props.products) {
            return this.props.products.map((product, index) => {
                if (product.product_offered.data[0] == 1){
                    if (!this.props.active.includes(index.toString())) {
                        return (
                            <Table.Row key={product['product_id']} data-item={index} onClick={this.props.handleActive}>
                                <Table.Cell>{product['product_id']}</Table.Cell>
                                <Table.Cell>{product['product_name']}</Table.Cell>
                                <Table.Cell>{product['product_category']}</Table.Cell>
                                <Table.Cell>{product['product_price']}</Table.Cell>
                            </Table.Row>
                        );
                    } else {
                        return (
                            <Table.Row key={product['product_id']} data-item={index} onClick={this.props.handleActive} active>
                                <Table.Cell>{product['product_id']}</Table.Cell>
                                <Table.Cell>{product['product_name']}</Table.Cell>
                                <Table.Cell>{product['product_category']}</Table.Cell>
                                <Table.Cell>{product['product_price']}</Table.Cell>
                            </Table.Row>
                        );
                    }
                }
            });
        }
    }
}

export default ManageTable;
