import React ,{useState}from 'react'
import './Shipping.css'
import { useDispatch, useSelector } from 'react-redux'
import PhoneIcon from '@material-ui/icons/Phone'
import PublicIcon from '@material-ui/icons/Public'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PinDropIcon from '@material-ui/icons/PinDrop'
import TransferWithinAStation from '@material-ui/icons/TransferWithinAStation'
import {State,Country} from 'country-state-city'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import CheckOutStep from './CheckOutStep'
import { saveShippingInfo } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'
const Shipping = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()
    const {shippingInfo}=useSelector(state=>state.cart)
    const [city, setCity] = useState(shippingInfo.city)
    const [address, setAddress] = useState(shippingInfo.address)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const shippingSubmit=(e)=>{
        e.preventDefault();
        if(phoneNo.length>10||phoneNo.length<10){
            alert.error("Phone No Should be 10 digits")
            return;
        }
        dispatch(saveShippingInfo({address,city,state,country,phoneNo,pinCode}));
        navigate('/order/confirm')
    }
  return (
    <>
    <MetaData title={"Shipping Details"}></MetaData>
        <CheckOutStep activeStep={0}/>
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>
                <form action=""
                className='shippingForm'
                encType='multipart/form-data'
                onSubmit={shippingSubmit}
                >
                    <div>
                        <HomeIcon/>
                        <input type="text"
                        placeholder='Address'
                        required
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div>
                        <LocationCityIcon/>
                        <input type="text"
                        placeholder='City'
                        required
                        value={city}
                        onChange={(e)=>setCity(e.target.value)} />
                    </div>
                    <div>
                        <PinDropIcon/>
                        <input type="number"
                        placeholder='PinCode'
                        required
                        value={pinCode}
                        onChange={(e)=>setPinCode(e.target.value)} />
                    </div>
                    <div>
                        <PhoneIcon/>
                        <input type="number"
                        placeholder='Phone Number'
                        required
                        value={phoneNo}
                        size={"10"}
                        onChange={(e)=>setPhoneNo(e.target.value)} />
                    </div>
                    <div>
                        <PublicIcon/>
                        <select name="" id=""
                        required
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)} >
                            <option value="">County</option>
                            {
                                Country&&
                                Country.getAllCountries().map((item)=>
                                (<option value={item.isoCode} key={item.isoCode}>
                                    {item.name}
                                </option>) )
                            }
                        </select>
                    </div>
                    {
                        country&&
                        (
                            <div>
                                <TransferWithinAStation/>
                                <select name="" id=""
                                 required
                                value={state}
                                onChange={(e)=>setState(e.target.value)} >
                                    <option value="">State</option>
                                    {
                                        State&&
                                        State.getStatesOfCountry(country).map((item)=>(
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                            </select>
                            </div>
                        )
                    }
                    <input
                    type='submit'
                    value={"Continue"}
                    className='shippingBtn'
                    disabled={state?false:true}/>
                </form>
            </div>
        </div>
    </>
  )
}

export default Shipping
