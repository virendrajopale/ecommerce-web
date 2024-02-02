import React,{useEffect,useState} from 'react'
import './NewProduct.css'
import {Button} from '@material-ui/core'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description'
import StorageIcon from '@material-ui/icons/Storage'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError, createNewProduct, getProductDetails, updateProduct } from '../../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom'
import { NEW_RPRODUCT_RESET, UPDATE_RPRODUCT_RESET } from '../../constants/productConstant'
const UpdateProduct = () => {


    const dispatch=useDispatch();
    const alert=useAlert()
    const {loading,error:updateError,success,isUpdated}=useSelector(state=>state.product);
    const {error,products}=useSelector(state=>state.productDetails)
    const navigate=useNavigate()
    const {id}=useParams()
    const [name,setName]=useState("");
    const [stock,setStock]=useState();
    const [description,setDesscription]=useState("");
    const [price,setPrice]=useState();
    const [category,setCategory]=useState();
    const [images,setImages]=useState([]);
    const [oldImages,setOldImages]=useState([]);
    const [imagePreview,setImagesPreview]=useState([]);
    const categories=[
        "Laptop",
        "Product",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",];

        const productId=id;
    useEffect(() => {
       if(products && products._id!==productId) {
        dispatch(getProductDetails(productId))

       }
       else{
         setName(products.name);
         setDesscription(products.description);
         setCategory(products.category);
         setPrice(products.price);
         setStock(products.stock);
         setOldImages(products.images);
       }
      if(error){
        alert.error(error)
        dispatch(clearError)
      }
      if(updateError){
        alert.error(updateError)
        dispatch(clearError)
      }
      if(isUpdated){
        alert.success("Product Updated Successfully")
        navigate("/admin/products");
        dispatch({type:UPDATE_RPRODUCT_RESET})
      }
    }, [alert,error,dispatch,navigate,success,isUpdated,products,productId,updateError])


    const createFormSubmitHandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();
        myform.set("name",name);
        myform.set("price",price);
        myform.set("category",category);
        myform.set("description",description);
        myform.set("Stock",stock);
        images.forEach((image)=>{
            myform.append("images",image)
        })
        dispatch(updateProduct(productId,myform))
    }
    const createPrdImageChange=(e)=>{
        const files = Array.from(e.target.files);

        // setImages([]);
        // setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
    }
  return (
   <>
   <MetaData title={"Create Products -Vee shop"}></MetaData>
    <div className="dashboard">
        <Sidebar/>
    <div className="newProductContainer">
    <form  className='createProductForm' encType='multipart/form-data'
    onSubmit={createFormSubmitHandler}>
        <h1>Create Product</h1>
        <div>
            <SpellcheckIcon/>
            <input type="text" placeholder="Product Name" required
            value={name} onChange={(e)=>setName(e.target.value)}/>

        </div>
        <div>
            <AttachMoneyIcon/>
            <input type="text" placeholder="Price" required
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </div>
        <div>
            <DescriptionIcon/>
            <textarea placeholder="Product Description" required
            value={description} onChange={(e)=>setDesscription(e.target.value)}
            cols={'30'} rows={"1"}/>
        </div>
        <div>
            <AccountTreeIcon/>
            <select name="" id="" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {
                    categories.map((cat)=>(
                        <option value={cat} key={cat}>
                            {cat}
                        </option>
                    ))
                }
            </select>
        </div>
        <div>
            <StorageIcon/>
            <input type="number" value={stock} placeholder='Stock' 
            required onChange={(e)=>setStock(e.target.value)}/>
        </div>
        <div id="createProductFormFile">
            <input type="file" name='avatar' accept="image/*"
            onChange={createPrdImageChange}
            multiple
            />
        </div>
        <div id="createProductFormImage">
            {
                imagePreview.map((image,i)=>(
                    <img src={image} key={i} alt="Product Preview" />
                ))
            }
        </div>
        <Button id='createProductBtn' type='submit' 
        disabled={loading?true:false}>
            Create
        </Button>
    </form>
    </div>
    </div>
   
   </>
  )
}

export default UpdateProduct;
