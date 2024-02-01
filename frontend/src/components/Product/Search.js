import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
import MetaData from '../layout/MetaData'
const Search = ({ history }) => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const searchSubHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
      // history.push(`/products/${keyword}`);
    }
    else {
      navigate(`/products`)
      // history.push("/products");
    }
  }
  return (
    <>
      <MetaData title={`Search --ECOMMERCE`} ></MetaData>

      <form action="" className="searchBox" onSubmit={searchSubHandler}>
        <input type="text" placeholder='Search a product' onChange={(e) => setKeyword(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
    </>
  )
}

export default Search
