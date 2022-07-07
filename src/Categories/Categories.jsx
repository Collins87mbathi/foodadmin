import React, {useState} from 'react'
import axios from 'axios'
import {BASE_URL} from '../utils/Constant'
import CategoriesAPI from '../Api/CategoriesAPI'
import './Categories.css';


function Categories() {
   
    const [categories] = CategoriesAPI().categories
    const [category, setCategory] = useState('')
    const [callback, setCallback] = CategoriesAPI().callback
   
    const createCategory = async e =>{
        e.preventDefault()
        try {
                const res = await axios.post(BASE_URL + '/category', {name: category})
                alert(res.data.msg)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button type="submit">Create</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories