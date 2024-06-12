import React,{ useEffect, useState } from 'react'
import './SmilingRock.css'
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction'
// import CertificateImage from '../../../assets/DifferenceImage/1-certificate.png'
// import GoldCaratImage from '../../../assets/DifferenceImage/2-only-18-22-carat-gold.png'
// import FairPricingImage from '../../../assets/DifferenceImage/4-fair-pricing.png'

export default function SmilingRock() {

    const [storeInit,setStoreInit] = useState();

    useEffect(()=>{
        setTimeout(()=>{
            if(Object.keys(JSON.parse(localStorage.getItem("storeInit")))?.length){
                let storeinit = JSON.parse(localStorage.getItem("storeInit"))
                console.log("storeinit",storeinit?.UploadLogicalPath,storeinit?.ukey,storeinit?.ufcc)
                setStoreInit(storeinit)
            }
        },800)
    },[])
    return (
        <div style={{ paddingBlock: '5%', background:'#d8cbef', marginTop:'-10px' }}>
            <p className='smilingTitle'>The wonder of 4 Decades</p>
            <div className='smilingRock'>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img className="simple-card__img " src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg1.png`} srcset={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg1.png`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>CVD Growing to
                            Handcrafted jewelry
                            manufacturer</p>
                        {/* <p className='learnMore'>LEARN MORE</p> */}
                    </div>
                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg2.png`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>Recycling Gold to
                            save nature</p>
                        {/* <p className='learnMore'>LEARN MORE</p> */}
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img className="simple-card__img" style={{opacity:'1'}} src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg3.png`} srcset={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg3.png`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>Finest Precisely Polished certified Gems</p>
                        {/* <p className='learnMore'>LEARN MORE</p> */}
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg4.png`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>Socially Progressive & Sustainable practices</p>
                        {/* <p className='learnMore'>LEARN MORE</p> */}
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/ComapnyIconImg5.png`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>Unparalleled Quality & commitment</p>
                        {/* <p className='learnMore'>LEARN MORE</p> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
