import React from 'react'
import './SmilingBrides.css'
import bridesImage from '../../../assets/ar.jpg'
import { Colors } from '../../../../lib/consts/Colors'
import { useNavigate } from 'react-router-dom'
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction'


export default function SmilingBrides() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/productpage')
    }

    return (
        <div className='paddingTopMobileSet smilingBridesCstorMain' style={{ marginTop: '60px' }}>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p style={{
                        color: Colors.fontColor,
                        fontSize: '25px',
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }} className='smilingBridesMainTitle'>SIGNATURE COLLECTION</p>
                    <p style={{ textAlign: 'center', color: '#7d7595', padding: '0px 10px 0px 10px' }}>Our goal is to preserve the luxury and joy of
                        fine jewelry without harming the
                        environment in any way. Basically, create a
                        sustainable diamond practice. To make the
                        ultimate diamond jewelry, creativity and
                        science must work simultaneously. The
                        process begins with the idea and ends with a
                        magnificent, dazzling design.</p>
                    {/* <button className='enagementBtn' onClick={handleNavigate} >SHOP NOW</button> */}
                </div>
                <div className='smlingBridesImages'>
                    {/* <img src={bridesImage} className='smilingMainImages' alt={''} /> */}
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner2.jpg`} className='smilingMainImages' alt={''} />
                </div>
            </div>
        </div>
    )
}
