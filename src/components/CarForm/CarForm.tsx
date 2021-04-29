import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
// bringin in chooseMake reducer:
import { chooseMake } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

interface CarFormProps {
    // ? means it's an optional parameter
    // if there is an id, it has to be a stringtype. 
    // If there is data, it has to be in an object
    // but won't get an error if either/both are missing 
    id?:string;
    data?:{};
}

interface CarState {
    make: string;
    model: string;
}

export const CarForm = (props:CarFormProps) => {

    const dispatch = useDispatch();
    let { carData, getData } = useGetData();
    const store = useStore()
    // Selecting current make of the car:
    const make = useSelector<CarState>(state => state.make)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        // When we call our cars by Make in this statement above (const make = useSelector<CarState>(state => state.make), we should be able to see their ids:
        console.log(props.id)

        // Similar to the ‘?’ Operator meaning “Optional”, the “!” You see here means “not null” or cannot be empty
        // If props.id is not null (if we find something in props.id), I want to update that based on the data passed into the form
        // Else/If it's not there, I'll create a new car using the chooseMake reducer
        // Car Update:
        if( props.id!){
            console.log("before update")
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            // window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseMake(data.make))
            server_calls.create(store.getState())
            // window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    {/* checking for data in Make field */}
                    {/* ...spread operator -- Could have one or many elements, and if there are several, I want to run them each through here. In this case, allowing us to register multiple items */}
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name="make" placeholder='Car Make' />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder="Model"/>
                </div>

                <div>
                    <label htmlFor="sale_price">Sale Price</label>
                    <Input {...register('sale_price')} name="sale_price" placeholder="Sale Price"/>
                </div>

                {/* <div>
                    <label htmlFor="color">Color</label>
                    <Input {...register('color')} name="color" placeholder="Color"/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder="Year"/>
                </div> */}
                
                <div>
                    <label htmlFor="mpg">MPG</label>
                    <Input {...register('mpg')} name="mpg" placeholder="MPG"/>
                </div>
                <div>
                    <label htmlFor="new_used">New or Used</label>
                    <Input {...register('new_used')} name="new_used" placeholder="New or Used"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )

}

