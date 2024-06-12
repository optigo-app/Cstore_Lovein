import React, { useEffect, useState } from 'react'
import './FestiveFinds.css'
import { useNavigate } from 'react-router-dom'
// import banner1 from '../../../assets/Lovein/L1.jpg'
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../../../../../../Recoil/atom';
// import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

export default function FestiveFinds() {

    const navigation = useNavigate();
    const islogin = useRecoilValue(loginState);
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

    console.log(storeInit);

    const handleNaviagtion = () => {
        islogin === 'true' && navigation('/productpage');
    }

    return (
        <div>
            <div className='FestiveMainImage'>
            <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/Promo/Banner/PromoBanner1.jpg`} style={{ width: '100%' }} alt={"#promoBanner1"} />
                {islogin === 'true' && <div className='festiveBox'>
                    <p className='smilingFestiMainTitle1' style={{ color: 'white' }}>LOVE IN DIAMONDS</p>
                    <p className='smilingFestiMainTitle2' style={{ color: 'white', fontSize: '30px', margin: '0px' }}>Diamonds are Forever!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'white', margin: '0px', fontSize: '13px' }}>
                    Discover the world of Jewellery & Diamonds
                    </p>
                    <div>
                        <button className='DiscoverBtn' onClick={handleNaviagtion}>View All Products</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
