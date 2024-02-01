import { Step, Stepper, Typography,StepLabel } from '@material-ui/core'
import React from 'react'
import './Shipping.css'

import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

const CheckOutStep = ({activeStep}) => {
    const steps=
    [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },
    ];

    const stepStyle={
        boxSizing:"border-box",

    }
  return (
    <>
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
     {
        steps.map((item,index)=>(
            <Step key={index} active={activeStep===index?true:false} 
            completed={activeStep>=index?true:false}>
                <StepLabel
                style={{color:activeStep>=index?"tomato":"rgba(0,0,0,0.655)"}}
                icon={item.icon} >
                    {item.label}
                </StepLabel>
            </Step>
        ))
     }
    </Stepper>
    </>
  )
}

export default CheckOutStep
