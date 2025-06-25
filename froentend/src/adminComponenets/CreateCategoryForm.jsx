import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {createCategoryAction} from '../state/restaurant/Action'

const CreateCategoryForm = () => {
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({categoryName:"", restaurantId:""})
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name : formData.categoryName,
            restaurantId : 1
        }

        dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data);

    }

    const handleInputChange = () => {
        const {name,value} =  e.target;
        setFormData({
            ...formData,[name]:value
        })
    }

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>

                <form onSubmit={handleSubmit()} className='space-y-4'>
                    <TextField
                        fullWidth
                        id="category"
                        name="category"
                        label="category"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.categoryName}
                    />

                    <Button variant='contained' type='submit'>
                        Create Category
                    </Button>
                </form>

            </div>

        </div>
    )
}

export default CreateCategoryForm
