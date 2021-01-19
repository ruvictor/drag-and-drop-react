import React, { Component } from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Product from './product';

const BodyBlock = styled.div`
    background-color: #F4F4F4;
    margin: 0;
    paddding: 0;
    width: 100%;
    display: table;
`;
const MainTitle = styled.h3`
    text-align: center;
    padding: 20px 0;
    font-size: 25px;
    border-bottom: 1px solid #ddd;
    text-transform: uppercase;
    margin: 0 0 10px;
`;
const WeekDaysContainer = styled.div`
    display: table;
    margin: 10% auto 0;
    width: 100%;
    max-width: 1070px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -moz-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
`;
const WeekDaysBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const OrderInfo = styled.div`
    border-top: 1px solid #ddd;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
`;
const ProductsBlock = styled.div`
    display: table;
    margin: 35px auto 0;
    border: 1px solid lightgrey;
    border-radius: 2px;
    min-width: 842px;
`;
const Title = styled.h3`
    padding: 8px;
`;
const ProductList = styled.div`
    padding: 8px;
`;

export default class Main extends Component {
    state = initialData;

    onDragEnd = result => {
        
        const { destination, source, draggableId } = result;
        console.log(destination);
        if(!destination || destination.droppableId === 'products'){
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = source.droppableId === 'products' ?
                this.state.productsColumn[source.droppableId] : 
                this.state.days[source.droppableId];
        const finish = this.state.days[destination.droppableId];
        
        // moving from one list to another
        const startProductIds = Array.from(
            source.droppableId === 'products' ? 
            start.productIds : start.productIds);
        
            startProductIds.splice(source.index, 1);
        const newStart = {
            ...start,
            productIds: startProductIds,
        };        

        const finishProductIds = Array.from(finish.productIds);

        finishProductIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            productIds: finishProductIds,
        };

        // removing the item from products state
        if(source.droppableId === 'products'){
            const newpIDs = this.state.productsColumn.products.productIds;
            const prodRemove = draggableId;
            const remIndex = newpIDs.indexOf(prodRemove);
            newpIDs.splice(remIndex, 1);
        }
        
        // updating total price
        const currentItemPrice = 
        source.droppableId === 'products' ? 
        this.state.products[draggableId].price : 0;


        const newState = {
            ...this.state,
            totalPrice: parseInt(currentItemPrice) + parseInt(this.state.totalPrice),
            days: {
                ...this.state.days,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
            productsColumn: {
                ...this.state.productsColumn,
            }
        };
        this.setState(newState);
    }

    render(){
        let totalPrice = this.state.totalPrice;
        return (
            <BodyBlock>
                <DragDropContext onDragEnd={this.onDragEnd}>

                    <WeekDaysContainer>
                        <MainTitle>Personalize Your Order</MainTitle>
                        <WeekDaysBlock>
                            {this.state.daysOrder.map((dayId) => {
                                const day = this.state.days[dayId];
                                const products = day.productIds.map(productId => this.state.products[productId]);
                                
                                return <Column key={day.id} day={day} products={products} />;
                            })}
                        </WeekDaysBlock>
                        <OrderInfo>
                        <p>Total: ${totalPrice}</p>
                        </OrderInfo>
                    </WeekDaysContainer>
                    
                    <ProductsBlock>
                        <Title>{this.state.productsColumn.products.title}</Title>
                        <Droppable droppableId={this.state.productsColumn.products.id}>
                            {(provided) => (
                                <ProductList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {this.state.productsColumn.products.productIds.map((product, index) => 
                                        
                                        
                                        <Product key={product} product={this.state.products[product]} index={index} />
                                        
                                    )}
                                    {provided.placeholder}
                                </ProductList>
                            )}
                        </Droppable>
                    </ProductsBlock>


                        
                </DragDropContext>
            </BodyBlock>
        )
    }
}