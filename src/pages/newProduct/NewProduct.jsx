import React, {useState,  useEffect} from 'react'
import "./newProduct.css";
import axios from 'axios'
import {BASE_URL} from '../../utils/Constant';
import CategoriesAPI from "../../Api/CategoriesAPI";
import ProductsAPI from "../../Api/ProductsAPI";
import {useHistory, useParams} from 'react-router-dom'


const initialState = {
  title: '',
  price: 0,
  description: 'some chilli will do ..',
  category: '',
  _id: ''
}

export default function NewProduct() {
  const [product, setProduct] = useState(initialState)
  const [categories] = CategoriesAPI().categories
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const param = useParams()

  const [products] = ProductsAPI().products
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = ProductsAPI().callback

  useEffect(() => {
      if(param.id){
          setOnEdit(true)
          products.forEach(product => {
              if(product._id === param.id) {
                  setProduct(product)
                  setImage(product.image)
              }
          })
      }else{
          setOnEdit(false)
          setProduct(initialState)
          setImage(false)
      }
  }, [param.id, products])

  const handleUpload = async e =>{
      e.preventDefault()
      try {
         
          const file = e.target.files[0]
          
          if(!file) return alert("File not exist.")

          if(file.size > 1024 * 1024) // 1mb
              return alert("Size too large!")

          if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return alert("File format is incorrect.")

          let formData = new FormData()
          formData.append('file', file)

          setLoading(true)
          const res = await axios.post(BASE_URL +'/image/post_product', formData, {
              headers: {'content-type': 'multipart/form-data'}
          })
          setLoading(false)
          setImage(res.data)

      } catch (err) {
          alert(err.response.data.msg)
      }
  }

  const handleDestroy = async () => {
      try {
    
          setLoading(true)
          await axios.post('/api/destroy', {public_id: image.public_id})
          setLoading(false)
          setImage(false)
      } catch (err) {
          alert(err.response.data.msg)
      }
  }

  const handleChangeInput = e =>{
      const {name, value} = e.target
      setProduct({...product, [name]:value})
  }

  const handleSubmit = async e =>{
      e.preventDefault()
      try {
         
          if(!image) return alert("No Image Upload")

          if(onEdit){
              await axios.put(BASE_URL + `/products/${product._id}`, {...product, image})
          }else{
              await axios.post(BASE_URL + '/products', {...product, image})
          }
          setCallback(!callback)
          history.push("/")
      } catch (err) {
          alert(err.response.data.msg)
      }
  }

  const styleUpload = {
      display: image ? "block" : "none"
  }
  return (
      <div className="create_product">
          <div className="upload">
              <input type="file" name="file" id="file_up" onChange={handleUpload}/>
              {
                  loading ? <div id="file_img"></div>

                  :<div id="file_img" style={styleUpload}>
                      <img src={image ? image.url : ''} alt=""/>
                      <span onClick={handleDestroy}>X</span>
                  </div>
              }
              
          </div>

          <form onSubmit={handleSubmit}>
              
              <div className="row">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" required
                  value={product.title} onChange={handleChangeInput} />
              </div>

              <div className="row">
                  <label htmlFor="price">Price</label>
                  <input type="number" name="price" id="price" required
                  value={product.price} onChange={handleChangeInput} />
              </div>

              <div className="row">
                  <label htmlFor="description">Description</label>
                  <textarea type="text" name="description" id="description" required
                  value={product.description} rows="5" onChange={handleChangeInput} />
              </div>


              <div className="row">
                  <label htmlFor="categories">Categories: </label>
                  <select name="category" value={product.category} onChange={handleChangeInput} >
                      <option value="">Please select a category</option>
                      {
                          categories.map(category => (
                              <option value={category.name} key={category._id}>
                                  {category.name}
                              </option>
                          ))
                      }
                  </select>
              </div>

              <button type="submit">{onEdit? "Update" : "Create"}</button>
          </form>
      </div>
  )
}
