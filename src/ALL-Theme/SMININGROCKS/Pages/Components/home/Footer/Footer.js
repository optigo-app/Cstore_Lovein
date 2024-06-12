import React,{ useEffect, useState } from 'react'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';
import { FaPinterestP } from "react-icons/fa";
import fb from '../../../assets/fb.png'
export default function Footer() {

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

    const navigation = useNavigate();

    return (
        <div>
            {/* <div className='footerTopMain'>
                <p className='foTopTitle'>Let's Smile Together</p>
                <div className='inputMain'>
                    <input type='text' placeholder='Email Address' className='foInputBox' />
                    <div>
                        <button className='footerSignupBtn'>SIGN UP</button>
                    </div>
                </div>
                <p className='foTopDescription'>Get early access to new products and special offers!</p>
            </div> */}
            <div className='footerBottomMain'>
                <div className='footerIconMain'>
                    <div className='footerFace'>
                        <a href='https://www.facebook.com/people/Love-in-Diamonds/100077999103991/?mibextid=LQQJ4d&rdid=pMV3Z0FSyICWnuhV&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FUyob7trhQBjGvXnA%2F%3Fmibextid%3DLQQJ4d'>
                            {/* <FaFacebookF style={{ color: '#7d7f85' }} /> */}
                            <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/SocialMediaIcon/faceBook.png`} className='iconeImges'/>
                        </a>
                    </div>
                    <div className='footerTwi'>
                        <a href='https://in.linkedin.com/company/love-in-diamonds'>
                            {/* <FaTwitter style={{ color: '#7d7f85' }} /> */}
                            <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/SocialMediaIcon/linkedin.png`} className='iconeImges'/>
                        </a>
                    </div>
                    <div className='footerInsta'>
                        <a href='https://www.instagram.com/loveindiamonds/?igsh=MTVic2NuM2o2NW01Yw%3D%3D&utm_source=qr'>
                            {/* <AiFillInstagram style={{ color: '#7d7f85' }} /> */}
                            <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/SocialMediaIcon/instagram.png`} className='iconeImges'/>
                        </a>
                    </div>
                    <div className='footerYou'>
                        <a href='https://in.pinterest.com/LoveinDiamonds/?invite_code=9eeee2e007154baabac791e34e75bdb2'>
                            {/* <FaPinterestP style={{ color: '#7d7f85' }} /> */}
                            <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/SocialMediaIcon/pin.png`} className='iconeImges'/>
                        </a>
                    </div>
                </div>
                <div className='footerMoreOption'>
                    <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
                    <p className='footerMoreOptionData' onClick={() => { navigation('/faq'); window.scrollTo(0, 0); }}>FAQ</p>
                    <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
                    {/* <p className='footerMoreOptionData' onClick={() => navigation('/press')}>PRESS</p> */}
                </div>
                <div className='footerMoreText'>
                    <p style={{
                        color: 'rgb(95,73,122)',
                        fontSize: '12px',
                        fontWeight: 500,
                        marginInline: '15px'
                    }}>© 2024, loveindiamonds</p>

                    <p style={{
                        color: 'rgb(95,73,122)',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}>Terms & Privacy</p>
                </div>
            </div>
            {/* <div className='text-end me-3'>
                    <span style={{fontSize:'6px',color:'#7D7f85'}}>R66B1-V66.23-04-2024.06:20PM</span>
                </div> */}
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgb(95,73,122)', fontSize: '30px', fontWeight: 400, textAlign: 'center' }}>we are associated with</p>
                <div className='footerIconeImageMain' style={{ display: 'flex', justifyContent: 'center', gap: '40px', paddingBottom: '12px' }}>
                    <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/AssociatedCompanyImg1.png`} className='footerIconeImages' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
                    <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/AssociatedCompanyImg2.png`} className='footerIconeImages' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
                    <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/AssociatedCompanyImg3.png`} className='footerIconeImages' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
                    <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/AssociatedCompanyImg4.png`} className='footerIconeImages' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
                    <img src={`${storeInit?.UploadLogicalPath}/${storeInit?.ukey}/${storeInit?.ufcc}/images/HomePage/CompanyData/AssociatedCompanyImg5.png`} className='footerIconeImages' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
                </div>
            </div>

        </div>
    )
}
