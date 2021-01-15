import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Product from './product';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 50%;
`;
const Title = styled.h3`
    padding: 8px;
`;
const ProductList = styled.div`
    padding: 8px;
`;

export default class Column extends Component {
    render(){
        return (
            <Container>
                <Title>{this.props.day.title}</Title>
                <Droppable droppableId={this.props.day.id}>
                    {(provided) => (
                        <ProductList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.products.map((product, index) => (
                                <Product key={product.id} product={product} index={index} />
                            ))}
                            {provided.placeholder}
                        </ProductList>
                    )}
                </Droppable>
            </Container>
        );
    }
}