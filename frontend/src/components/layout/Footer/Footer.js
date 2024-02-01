import React from 'react'
import playStore from '../../../images/playstore.png'
import AppStore from '../../../images/Appstore.png'
import './Footer.css'
const Footer = () => {
  return (
    
      <footer id="footer" >
        <div 
        className="leftFooter ">
            <h4>Download App</h4>
            <p>Download app for android and iOS </p>
            <img src={playStore} alt="" />
            <img src={AppStore} alt="" />
        </div>
        <div className="midFooter">
            <h4>Vir sales</h4>
            <p>Customer is god</p>
            <p>Copyright 2021 &copy; Vir sales</p>
        </div>
        <div className="rightfoot">
            <h4>Follow Us</h4>
            <a href="*">Instagram</a>
            <a href="*">Facebook</a>

        </div>
      </footer>

  )
}

export default Footer
