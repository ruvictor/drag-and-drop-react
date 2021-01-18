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
        console.log(result);
        const { destination, source, draggableId } = result;

        if(!destination){
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.days[source.droppableId];
        const finish = this.state.days[destination.droppableId];

        // console.log('Start ' + this.state.days[source.droppableId]);
        console.log('Finish ' + source.droppableId);
        

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
        const startTaskIds = Array.from(start.productIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            productIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            productIds: finishTaskIds,
        };
        
        const newState = {
            ...this.state,
            days: {
                ...this.state.days,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.setState(newState);
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
                    <Title>{this.state.productsColumn.title}</Title>
                    <Droppable droppableId={this.state.productsColumn.id}>
                        {(provided) => (
                            <ProductList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {Object.keys(this.state.products).map((product, index) => 
                                    
                                    
                                    <Product key={index} product={this.state.products[product]} index={index} />
                                    
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