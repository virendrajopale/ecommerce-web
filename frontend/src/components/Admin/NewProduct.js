import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, createNewProduct } from '../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { NEW_RPRODUCT_RESET } from '../../constants/productConstant';
import axios from 'axios';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProduct);
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        name: "",
        stock: 0,
        description: "",
        price: 0,
        category: "",
        images: [],
    });

    const [imagePreview, setImagesPreview] = useState(null);
    // const [avatarPreview, setAvatarPreview] = useState('https://i.stack.imgur.com/l60Hf.png')
    const [img, setImg] = useState(null)

    const categories = [
        "Laptop",
        "Food",
        "Cloths",
        "Electronics",
        "Attire",
        "Toys",
        "Books",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_RPRODUCT_RESET });
        }
    }, [alert, error, dispatch, navigate, success]);

    const createFormSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", inputData.name);
        formData.append("price", inputData.price);
        formData.append("description", inputData.description);
        formData.append("category", inputData.category);
        formData.append("stock", inputData.stock);
            formData.append("images", img);

        // for (let image of inputData.images) {
        // }
         console.log(formData.getAll('images'));
         dispatch(createNewProduct(formData));
        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.name === 'img') {

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(reader.result)
                    setImg(reader.result)
                }

            }
            reader.readAsDataURL(e.target.files[0]);
        }
        setInputData({ ...inputData, [name]: value });
    };

    const createPrdImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setInputData({ ...inputData, images: [] });

        for (let file of files) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setInputData((old) => ({ ...old, images: [...old.images, file] }));
                }
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <MetaData title={"Create Products - Vee shop"} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form className='createProductForm' onSubmit={createFormSubmitHandler}>
                        <h1>Create Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder="Product Name" required
                                name="name" value={inputData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number" placeholder="Price" required
                                name="price" value={inputData.price} onChange={handleInputChange} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea placeholder="Product Description" required
                                name="description" value={inputData.description} onChange={handleInputChange}
                                cols="30" rows="1" />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select name="category" value={inputData.category} onChange={handleInputChange}>
                                <option value="">Choose Category</option>
                                {categories.map((cat) => (
                                    <option value={cat} key={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type="number" placeholder="Stock" required
                                name="stock" value={inputData.stock} onChange={handleInputChange} />
                        </div>
                        <div id="createProductFormFile">
                            <input type="file" name='img'  accept="image/*"
                                onChange={handleInputChange}  />
                        </div>
                        <div id="createProductFormImage">
                            {/* {imagePreview?.map((image, i) => ( */}
                               {imagePreview && <img src={imagePreview}  alt="Product Preview" />}
                            {/* ))} */}
                        </div>
                        <Button id='createProductBtn' type='submit'
                            disabled={loading ? true : false}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
