import React, { Component } from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Product from './product';

const WeekDaysContainer = styled.div`
    display: table;
    margin: 10% auto 0;
    width: 100%;
    max-width: 1100px;
    border: 5px solid #ddd;
    border-radius: 5px;
`;

const WeekDaysBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const ProductsBlock = styled.div`
    display: table;
    margin: 35px auto 0;
    border: 1px solid lightgrey;
    border-radius: 2px;
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

        
        // console.log('start -> ' + start);
        // console.log('Finish -> ' + finish);
        

        // if(start === finish){
        //     const newTaskIds = Array.from(start.taskIds);
        //     newTaskIds.splice(source.index, 1);
        //     newTaskIds.splice(destination.index, 0, draggableId);
    
        //     const newColumn = {
        //         ...start,
        //         taskIds: newTaskIds,
        //     }
    
        //     const newState = {
        //         ...this.state,
        //         columns: {
        //             ...this.state.columns,
        //             [newColumn.id]: newColumn,
        //         }
        //     }
    
        //     this.setState(newState);
        //     return;
        // }
        
        // moving from one list to another
        // console.log('start.products -> ' + start.products);
        const startProductIds = Array.from(
            source.droppableId === 'products' ? 
            start.productIds : start.productIds);

            // console.log(startProductIds);
        
            startProductIds.splice(source.index, 1);
        const newStart = {
            ...start,
            productIds: startProductIds,
        };

        // console.log(newStart);
        

        const finishProductIds = Array.from(finish.productIds);

        // console.log(draggableId);

        finishProductIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            productIds: finishProductIds,
        };

        // console.log(newFinish);
        // removing the item from products state
        if(source.droppableId === 'products'){
            const newpIDs = this.state.productsColumn.products.productIds;
            const prodRemove = draggableId;
            const remIndex = newpIDs.indexOf(prodRemove);
            console.log(newpIDs);
            newpIDs.splice(remIndex, 1);
            console.log(newpIDs);
            console.log(JSON.stringify(draggableId));
        }


        const newState = {
            ...this.state,
            days: {
                ...this.state.days,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
            productsColumn: {
                ...this.state.productsColumn,
                // [this.state.productsColumn.products.]: splice(removeProdIndex, 1)
            }
        };
        this.setState(newState);
        console.log(newState);
        // console.log(newProductsColumn);
        // if(source.droppableId === 'products'){
        //     this.setState({
        //         productsColumn['products']: ''
        //     })
        // }
        // const removeProdIndex =  this.state.productsColumn.products.productIds.indexOf(draggableId);
        
    }

    render(){
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>

                <WeekDaysContainer>
                    <WeekDaysBlock>
                        {this.state.daysOrder.map((dayId) => {
                            const day = this.state.days[dayId];
                            const products = day.productIds.map(productId => this.state.products[productId]);
                            
                            return <Column key={day.id} day={day} products={products} />;
                        })}
                    </WeekDaysBlock>
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
        )
    }
}