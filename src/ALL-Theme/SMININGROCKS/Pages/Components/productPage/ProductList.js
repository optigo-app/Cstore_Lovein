import React, { useCallback, useEffect, useState } from "react";
import Footer from "../home/Footer/Footer";
import SmilingRock from "../home/smiling_Rock/SmilingRock";
import "./product.css";
import { json, useFetcher, useLocation, useNavigate } from "react-router-dom";
import prodListData from "../../jsonFile/Productlist_4_95oztttesi0o50vr.json";
// import prodListData from "../../jsonFile/testingFile/Productlist_4_95oztttesi0o50vr_Original.json";
import filterData from "../../jsonFile/M_4_95oztttesi0o50vr.json";
import PriceData from "../../jsonFile/Productlist_4_95oztttesi0o50vr_8.json";
// import PriceData from "../../jsonFile/testingFile/Productlist_4_95oztttesi0o50vr_8_Original.json";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, CircularProgress, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { CommonAPI } from "../../../Utils/API/CommonAPI";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListCounts, HeaderData, HeaderData2, WishListCounts, colorstoneQualityColorG, diamondQualityColorG, metalTypeG, newMenuData, newTestProdData, priceData, productDataNew, searchData } from "../../../../../Recoil/atom";
import { GetCount } from "../../../Utils/API/GetCount";
import notFound from "../../assets/image-not-found.png";
import { Category } from "@mui/icons-material";
import { toast } from "react-toastify";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { productListApiCall } from "../../../Utils/API/ProductListAPI";

function valuetext(value) {
  return `${value}°C`;
}

const ProductList = () => {

  const ProductData2 = [];

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [ProductApiData, setProductApiData] = useState([])
  const [ProductApiData2, setProductApiData2] = useState([])
  const [drawerShowOverlay, setDrawerShowOverlay] = useState(false)
  const [filterChecked, setFilterChecked] = useState({})
  const [wishFlag, setWishFlag] = useState({})
  const [cartFlag, setCartFlag] = useState(false)
  const [cartData, setCartData] = useState([])
  const [WishData, setWishData] = useState([])
  const [cartRemoveData, setCartRemoveData] = useState("")
  const [wishListRemoveData, setWishListRemoveData] = useState("")
  const [newProData, setNewProData] = useState([])
  // const [priceDataApi, setpriceDataApi] = useRecoilState(priceData)
  const [priceDataApi, setpriceDataApi] = useState([])
  const [currencySym, setCurrencySym] = useState()

  const [metalRdPrice, setMetalRdPrice] = useState([])
  const [diaRd1Price, setDiaRd1Price] = useState([])
  const [csRd2Price, setCsRd2Price] = useState([])

  const setCartCount = useSetRecoilState(CartListCounts)
  const setWishCount = useSetRecoilState(WishListCounts)
  const getHeaderData = useRecoilValue(HeaderData)
  const getHeaderData2 = useRecoilValue(HeaderData2)
  const getnewMenuData = useRecoilValue(newMenuData)
  const getAllProdData = useRecoilValue(newTestProdData);

  // console.log("getnewMenuData",getnewMenuData)  
  // console.log("getHeaderData2",getHeaderData2)

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minNetwt, setMinNetwt] = useState(null);
  const [maxNetwt, setMaxNetwt] = useState(null);
  const [minGrosswt, setMinGrossWt] = useState(null);
  const [maxGrosswt, setMaxGrossWtt] = useState(null);
  const [minDiamondWt, setMinDiamondWt] = useState(null);
  const [maxDiamondWt, setMaxDiamondWt] = useState(null);

  const [hoverProductImageShow, setHoverProductImageShow] = useState(false);
  const [isColorWiseImageShow, setIsColorWiseImage] = useState('');
  const [updatedColorImage, setUpdateColorImage] = useState({});

  const navigate = useNavigate();

  const getPdData = useRecoilValue(productDataNew)
  const getSearchData = useRecoilValue(searchData)
  const mtName = useRecoilValue(metalTypeG)
  const dqcName = useRecoilValue(diamondQualityColorG)
  const csqcName = useRecoilValue(colorstoneQualityColorG)
  const [pdData, setPdData] = useRecoilState(productDataNew)

  // console.log(mtName, dqcName, csqcName);
  //RANGE FILTERS

  const [value1, setValue1] = useState([minPrice, maxPrice]);
  const [value2, setValue2] = useState([minNetwt, maxNetwt]);
  const [value3, setValue3] = useState([minGrosswt, maxGrosswt]);
  const [value4, setValue4] = useState([minDiamondWt, maxDiamondWt]);

  const [ismetalWShow, setIsMeatlWShow] = useState('');
  const [isGrossWShow, setIsGrossShow] = useState('');
  const [isDaaimongWShow, setIsDaaimongWShow] = useState('');
  const [isDaaimonPShow, setIsDaaimonPShow] = useState('');
  const [isStoneWShow, setIsStoneWShow] = useState('');
  const [isStonePShow, setIsStonePShow] = useState('');
  const [isMetalTCShow, setIsMetalTCShow] = useState('');
  const [isPriceShow, setIsPriceShow] = useState('');
  const [globImagePath, setGlobImagepath] = useState();
  const [IsProdLoading, setIsProdLoading] = useState(false);
  const [currData, setCurrData] = useState()
  const [isFilterData, setIsFilterData] = useState(false)
  const [rangeProData,setRangeProData]=useState([])

  console.log("alternativeData",newProData?.length?newProData:ProductApiData2);

  // useEffect(()=>{
  //   // setTimeout(()=>{
  //     if(newProData?.length > 0){
  //       localStorage.setItem("newProData",JSON.stringify(newProData))
  //     }else{
  //       localStorage.setItem("newProData",JSON.stringify([]))
  //     }
  //   // },500)
  // },[getSearchData])

  // console.log("filterCount", newProData?.length, ProductApiData2?.length, filterChecked);


  //   const handelCurrencyData = () =>{
  //     let currencyData = JSON.parse(localStorage.getItem('CURRENCYCOMBO'));
  //     let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
  //     console.log("param",loginData);

  //     if(currencyData && loginData){
  //       const filterData = currencyData?.filter((cd)=>cd?.Currencyid === loginData?.CurrencyCodeid)[0]
  //       console.log("currencyData",filterData);
  //       if(filterData){
  //         setCurrData(filterData)
  //       }
  //       else{
  //         let DefaultObj = {
  //           "Currencyid": 42,
  //           "Currencycode": "INR",
  //           "Currencyname": "Rupees",
  //           "Currencysymbol": "₹",
  //           "CurrencyRate": 1.00000,
  //           "IsDefault": 1
  //       }
  //       const DefaultObjData = currencyData?.filter((cd)=>cd?.IsDefault == 1)
  //       if(DefaultObjData.length > 0){
  //         setCurrData(DefaultObjData[0])
  //       }else{
  //         setCurrData(DefaultObj);
  //       }
  //       }
  //     }
  // }  

  useEffect(() => {
    // handelCurrencyData();
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
    }
   
  }, [])

  let location = useLocation();

  // useEffect(()=>{
  //   if(location?.pathname === "/productpage"){
  //     setNewProData([])
  //   }
  // },[location])

  // useEffect(()=>{
  //   let currencyData = JSON.parse(localStorage.getItem("currencyData"))
  //   setCurrData(currencyData)
  // },[])

  useEffect(() => {
    if (Object.keys(WishData)?.length === 0) {
      let obj = {};
      WishData.map(item => {
        obj[item?.DesignNo] = true;
      })

      if (Object.keys(obj).length > 0) {
        setWishFlag(obj)
      }
    }
  }, [WishData])

  useEffect(() => {
    if (Object.keys(cartData)?.length === 0) {
      let obj = {};
      cartData.map(item => {
        obj[item?.DesignNo] = true;
      })

      if (Object.keys(obj).length > 0) {
        setCartFlag(obj)
      }
    }
  }, [cartData])

  console.log("cartFlag",cartData,cartFlag)
  console.log("wishFlag",WishData,wishFlag)

  const WishListToCart = () =>{
    let findData = Object.keys(wishFlag).filter((wd) => Object.keys(cartFlag).find((cd) => wd === cd))
    console.log("findData",findData)
    if (findData) {
      wishFlag[findData] = false
      setWishFlag(wishFlag)
    }
  }

  useEffect(() => {
    WishListToCart()
  }, [WishData, cartData])


  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    setGlobImagepath(storeInit?.DesignImageFol)
  }, [])

  useEffect(() => {
    let pdDataCalling = async () => {
      await productListApiCall().then((res) => {
        setPdData(res)
      })
    }
    pdDataCalling()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (getSearchData) {
        setNewProData(getSearchData);
      }
    }, 100);
  }, [getSearchData]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allproductlist"));
    setProductApiData2(data)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("getPriceData"));
    setpriceDataApi(data)
  }, [])

  //   const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
  // console.log("loginUserDetail?.cmboDiaQualityColor",loginUserDetail?.cmboDiaQualityColor);

  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("allproductlist"));
      const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));

      const updatedData = await Promise?.all(data?.map(async (product) => {
        const newPriceData = priceDataApi?.rd?.find(
          (pda) =>
            storeInit?.IsMetalCustomization === 1
              ?
              pda.A === product.autocode &&
              pda.B === product.designno &&
              pda.D === loginUserDetail?.cmboMetalType
              :
              pda.A === product.autocode &&
              pda.B === product.designno
        );

        const newPriceData1 = priceDataApi?.rd1?.filter(
          (pda) =>

            storeInit?.IsDiamondCustomization === 1
              ?
              pda.A === product.autocode &&
              pda.B === product.designno &&
              pda.H === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[0] &&
              pda.J === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[1]
              :
              pda.A === product.autocode &&
              pda.B === product.designno

        ).reduce((acc, obj) => acc + obj.S, 0)

        const newPriceData2 = priceDataApi?.rd2?.filter(
          (pda) =>

            storeInit?.IsCsCustomization === 1
              ?
              pda.A === product.autocode &&
              pda.B === product.designno &&
              pda.H === loginUserDetail?.cmboCSQualityColor?.split('#@#')[0].toUpperCase() &&
              pda.J === loginUserDetail?.cmboCSQualityColor?.split('#@#')[1].toUpperCase()
              :
              pda.A === product.autocode &&
              pda.B === product.designno

        ).reduce((acc, obj) => acc + obj.S, 0)

        let price = 0;
        let markup = 0;
        let metalrd = 0;
        let diard1 = 0;
        let csrd2 = 0;
        let updNWT = 0;
        let updGWT = 0;
        let updDWT = 0;
        let updDPCS = 0;
        let updCWT = 0;
        let updCPCS = 0;
        let updMT = "";
        let updMC = "";

        if (newPriceData || newPriceData1 || newPriceData2) {
          price = (((newPriceData?.V ?? 0) / currData?.CurrencyRate ?? 0) + (newPriceData?.W ?? 0) + (newPriceData?.X ?? 0)) + (newPriceData1 ?? 0) + (newPriceData2 ?? 0);
          metalrd = (((newPriceData?.V ?? 0) / currData?.CurrencyRate ?? 0) + (newPriceData?.W ?? 0) + (newPriceData?.X ?? 0))
          diard1 = newPriceData1 ?? 0
          csrd2 = newPriceData2 ?? 0
          markup = newPriceData?.AB
          updNWT = newPriceData?.I ?? 0
          updGWT = newPriceData?.N ?? 0
          updDWT = newPriceData?.K ?? 0
          updDPCS = newPriceData?.J ?? 0
          updCWT = newPriceData?.M ?? 0
          updCPCS = newPriceData?.L ?? 0
          updMT = newPriceData?.D ?? ""
          updMC = newPriceData?.F ?? ""
        }
        console.log("priceprod", product?.designno, price);
        return { ...product, price, markup, metalrd, diard1, csrd2, updNWT, updGWT, updDWT, updDPCS, updCWT, updCPCS, updMT, updMC }
      }));


      localStorage.setItem("allproductlist", JSON.stringify(updatedData));
      setProductApiData2(updatedData);
    };

    fetchData();
  }, [priceDataApi]);

  const toggleDeatilList = () => {
    setIsOpenDetail(!isOpenDetail)
  };

  const getCountFunc = async () => {
    await GetCount().then((res) => {
      if (res) {
        setCartCount(res.CountCart)
        setWishCount(res.WishCount)
      }
    })

  }

  function paramnameSetting(paramVal) {
    if (paramVal === 'param0') {
      return getnewMenuData?.data?.param0name
    }
    if (paramVal === 'param1') {
      return getnewMenuData?.data?.param1name
    }
    if (paramVal === 'param2') {
      return getnewMenuData?.data?.param2name
    }
  }

  function paramdataSetting(paramVal) {
    if (paramVal === 'param0') {
      return getnewMenuData?.data?.param0dataname
    }
    if (paramVal === 'param1') {
      return getnewMenuData?.data?.param1dataname
    }
    if (paramVal === 'param2') {
      return getnewMenuData?.data?.param2dataname
    }
  }

  useEffect(() => {
    let searchData ;
    if (paramnameSetting(getnewMenuData.label) === "brand") {
      const data = ProductApiData2.filter((pd) => pd && pd.BrandName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
        searchData = data
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "collection") {
      const data = ProductApiData2.filter((pd) => pd && pd.CollectionName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
        searchData = data
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "category") {

      const data = ProductApiData2.filter((pd) => pd && pd.CategoryName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
        searchData = data
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "gender") {
      const data = ProductApiData2.filter((pd) => pd && pd.GenderName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
        searchData = data
      }
    }

    if(searchData){
      console.log("search",searchData);
      setTimeout(()=>{
        localStorage.setItem("searchdata",JSON.stringify(searchData))
      },100)
    }
  }, [getnewMenuData, ProductApiData2])

  //productList File Fatching (old mathod)


  const fetchFile = async () => {

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    setIsColorWiseImage(storeinit.IsColorWiseImages);
    setIsMeatlWShow(storeinit.IsMetalWeight);
    setIsGrossShow(storeinit.IsGrossWeight);
    setIsDaaimongWShow(storeinit.IsDiamondWeight);
    setIsDaaimonPShow(storeinit.IsDiamondPcs);
    setIsStoneWShow(storeinit.IsStoneWeight);
    setIsStonePShow(storeinit.IsStonePcs);
    setIsMetalTCShow(storeinit.IsMetalTypeWithColor);
    setIsPriceShow(storeinit.IsPriceShow);

    // await axios.get(
    //   `https://${storeinit?.domain}/assets/${storeinit?.FrontEnd_RegNo}/Store_Data/Productlist/Productlist_${loginInfo?.PackageId}_${storeinit?.FrontEnd_RegNo}.txt`
    // ).then(
    //   (res) => {
    //     setProductApiData(res?.data)
    //   })
    //   .catch((err) => console.log("err", err))
  };

  useEffect(() => {

    let Symbol = JSON.parse(localStorage.getItem('CURRENCYCOMBO'))
    setCurrencySym(Symbol)

    fetchFile()
  }, [])

  const toggleDrawerOverlay = () => {
    setDrawerShowOverlay(!drawerShowOverlay);
  };

  let productData = [];

  if (ProductApiData?.data?.[0]) {
    ProductApiData.data[0]?.map((ele) => {
      let obj = {};
      Object.entries(prodListData?.ProductsList)?.map((objele) => {
        obj[objele[0]] = ele[objele[1]];
      });
      productData.push(obj);
    });
  }

  useEffect(() => {
    const element = document.getElementById("top")
    element.scrollIntoView()
  }, []);

  // function updateProductsWithMetalColorName() {
  //   productData?.forEach((product) => {
  //     const metalColor = filterData?.MetalColorList?.find(
  //       (color) => color.MetalColorid === product.MetalColorid
  //     );
  //     const categoryName = filterData?.CategoryList?.find(
  //       (cate) => cate.Categoryid === product.Categoryid
  //     );
  //     const collectionName = filterData?.CollectionList?.find(
  //       (coll) => coll.Collectionid === product.Collectionid
  //     );
  //     const mtpurity = filterData?.MetalPurityList?.find(
  //       (mtp) => mtp.MetalPurityid === product.MetalPurityid
  //     );
  //     const prodtype = filterData?.ProductTypeList?.find(
  //       (pt) => pt.Producttypeid === product.Producttypeid
  //     );
  //     const gendertype = filterData?.GenderList?.find(
  //       (gen) => gen.Genderid === product.Genderid
  //     );
  //     const Berandtype = filterData?.BrandList?.find(
  //       (brand) => brand.Brandid === product.Brandid
  //     )
  //     const MetalType = filterData?.MetalTypeList?.find(
  //       (mt) => mt.MetalTypeid === product.MetalTypeid
  //     )
  //     const OcassionType = filterData?.OcassionList?.find(
  //       (ocs) => ocs.Ocassionid === product.Ocassionid
  //     )
  //     const SubCategoryType = filterData?.SubCategoryList?.find(
  //       (sct) => sct.SubCategoryid === product.SubCategoryid
  //     )
  //     const ThemeType = filterData?.ThemeList?.find(
  //       (tl) => tl.Themeid === product.Themeid
  //     )

  //     if (metalColor) {
  //       product.MetalColorName = metalColor.MetalColorName;
  //     }
  //     if (categoryName) {
  //       product.CategoryName = categoryName.CategoryName;
  //     }
  //     if (collectionName) {
  //       product.CollectionName = collectionName.CollectionName;
  //     }
  //     if (mtpurity) {
  //       product.MetalPurity = mtpurity.MetalPurity;
  //     }
  //     if (prodtype) {
  //       product.ProducttypeName = prodtype.ProducttypeName;
  //     }
  //     if (gendertype) {
  //       product.GenderName = gendertype.GenderName;
  //     }
  //     if (Berandtype) {
  //       product.BrandName = Berandtype.BrandName
  //     }
  //     if (MetalType) {
  //       product.MetalTypeName = MetalType.MetalTypeName
  //     }
  //     if (OcassionType) {
  //       product.OcassionName = OcassionType.OcassionName
  //     }
  //     if (SubCategoryType) {
  //       product.SubCategoryName = SubCategoryType.SubCategoryName
  //     }
  //     if (ThemeType) {
  //       product.ThemeName = ThemeType.ThemeName
  //     }
  //   });

  //   return productData;
  // }


  // const diffCartData = useCallback(() => {

  //   // let pdata;

  //   ProductApiData2.forEach((pd) => {
  //     const pdata = cartData?.find((cd) => pd.designno === cd.DesignNo)



  //     if (pdata && !pd?.checkFlag) {
  //       pd.checkFlag = true
  //     }
  //     else {
  //       pd.checkFlag = false
  //     }
  //   })


  //   return ProductApiData2

  // }, [ProductApiData2, cartData])

  // diffCartData()

  // const diffWishData = useCallback(() => {

  //   ProductApiData2.forEach((pd) => {
  //     const pdata = WishData.find((cd) => pd.designno === cd.DesignNo)


  //     if (pdata && !pd?.wishCheck) {
  //       pd.wishCheck = true
  //     }
  //     else {
  //       pd.wishCheck = false
  //     }
  //   })

  //   return ProductApiData2

  // }, [ProductApiData2, WishData])


  // diffWishData()

  // const removefromCart = () => {
  //   ProductApiData2.map((pd) => {


  //     if (cartRemoveData && pd.designno === cartRemoveData) {
  //       pd.checkFlag = false
  //     }

  //     if (wishListRemoveData && pd.designno === wishListRemoveData) {
  //       pd.wishCheck = false
  //     }

  //   })


  //   return ProductApiData2
  //   // // console.log("prodddd",product);
  //   // let prodD;
  //   // productData.forEach((pd)=>{

  //   //   // let prodD = productData.find((p)=>p?.designno === product?.designno && p?.checkFlag === true)

  //   //   // if(prodD){
  //   //   //   pd.checkFlag = false
  //   //   // }

  //   // if(pd?.designno===product?.designno){
  //   //    prodD = pd
  //   // }
  //   // if(prodD){
  //   //   pd.checkFlag = false
  //   // }

  //   // })

  //   // console.log("prodD",prodD);
  //   // return productData
  // }

  // removefromCart()

  // ProductApiData2?.map((product) => {
  //     console.log("product",product);

  //    let loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail')) 

  //   const newPriceData = priceDataApi.rd?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno &&
  //       pda.D === loginUserDetail?.cmboMetalType 
  //   )

  //   const newPriceData1 = priceDataApi.rd1?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno && 
  //       pda.H === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[0] &&
  //       pda.J === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[1]
  //   )

  //   const newPriceData2 = priceDataApi.rd2?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno && 
  //       pda.H === loginUserDetail?.cmboCSQualityColor?.split('#@#')[0] &&
  //       pda.J === loginUserDetail?.cmboCSQualityColor?.split('#@#')[1]

  //   )



  //   if (newPriceData || newPriceData1 || newPriceData2) {
  //     product['price'] = (newPriceData?.Z ?? 0) + (newPriceData1?.S ?? 0) + (newPriceData2?.S ?? 0)
  //   } else {
  //     product['price'] = "Not Availabel";
  //   }



  // });

  //     localStorage.setItem("allproductlist",JSON?.stringify(product))
  //     setProductApiData2(product)

  useEffect(() => {
    // let newWishCheckData = (ProductApiData2)?.map((pd) => {

    //   let newWish = WishData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode)


    //   let wishCheck = false
    //   if (newWish?.length && newWish) {
    //     wishCheck = true
    //   } else {
    //     wishCheck = false
    //   }
    //   return { ...pd, wishCheck }
    // })
    // setProductApiData2(newWishCheckData)
    // if(newWishCheckData?.length && newWishCheckData){
    //   console.log("updateWish",newWishCheckData);
    //   // debugger
    //   localStorage.setItem("allproductlist",JSON.stringify(newWishCheckData))
    // }

    let newWishCheckData = (ProductApiData2 || []).map((pd) => {
      const newWish = WishData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode);
      let wishCheck = !!newWish;
      return { ...pd, wishCheck };
    });

    try {
      localStorage.setItem("allproductlist", JSON.stringify(newWishCheckData));
      if (JSON.stringify(newWishCheckData) !== JSON.stringify(ProductApiData2)) {
        setProductApiData2(newWishCheckData);
      }
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  }, [WishData, ProductApiData2])

  let cartlistUpdate = async () => {
    let newCartCheckData = (ProductApiData2)?.map((pd) => {

      let newWish = cartData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode)


      let checkFlag = false
      if (newWish) {
        checkFlag = true
      } else {
        checkFlag = false
      }
      return { ...pd, checkFlag }
    })
    if (newCartCheckData) {
      setProductApiData2(newCartCheckData)
      localStorage.setItem("allproductlist", JSON.stringify(newCartCheckData))
    }
  }

  useEffect(() => {
    // let newCartCheckData = (ProductApiData2 || []).map((pd) => {
    //   const newWish = cartData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode);
    //   let checkFlag = !!newWish;
    //   return { ...pd, checkFlag };
    // });

    // try {
    //   localStorage.setItem("allproductlist", JSON.stringify(newCartCheckData));
    //   if (JSON.stringify(newCartCheckData) !== JSON.stringify(ProductApiData2)) {
    //     setProductApiData2(newCartCheckData);
    //   }
    // } catch (error) {
    //   console.error("Error storing data in localStorage:", error);
    // }
    cartlistUpdate()
  }, [cartData])


  const handelProductSubmit = (product) => {
    localStorage.setItem("srProductsData", JSON.stringify(product));
    navigate("/productdetail");
  };

  // const NewFilterData = () => {
  //   const newFilter = [];
  //   filterData?.SideMenuList?.forEach((ele) => {
  //     if (ele.Fno === '1') {
  //       newFilter.push({ label: "CATEGORY", filterList: filterData.CategoryList?.map((ele) => { return ele.CategoryName }), listType: 'CategoryName' });
  //     } else if (ele.Fno === '2') {
  //       newFilter.push({ label: "PRODUCT TYPE", filterList: filterData.ProductTypeList?.map((ele) => { return ele.ProducttypeName }), listType: 'ProducttypeName' });
  //     } else if (ele.Fno === '8') {
  //       newFilter.push({ label: "GENDER", filterList: filterData.GenderList?.map((ele) => { return ele.GenderName }), listType: 'GenderName' });
  //     } else if (ele.Fno === '12') {
  //       // newFilter.push({ label: "PRICE", filterList: [] });
  //     } else if (ele.Fno === '15') {
  //       newFilter.push({ label: "COLLECTION", filterList: filterData.CollectionList?.map((ele) => { return ele.CollectionName }), listType: 'CollectionName' });
  //     } else if (ele.Fno === '18') {

  //       newFilter.push({ label: "PRICE", filterList: [] });
  //       newFilter.push({ label: "NETWT", filterList: [] });
  //       newFilter.push({ label: "GROSSWT", filterList: [] });
  //       newFilter.push({ label: "DIAMONDWT", filterList: [] });
  //     }
  //   });

  //   return newFilter;
  // }

  let NewFilterData = () => {

    const newFilter = [];

    let categoryFilter = JSON.parse(localStorage.getItem("CategoryFilter"))
    let ProductTypeFilter = JSON.parse(localStorage.getItem("ProductTypeFilter"))
    let GenderFilter = JSON.parse(localStorage.getItem("GenderFilter"))
    let CollectionFilter = JSON.parse(localStorage.getItem("CollectionFilter"))

    if (categoryFilter) {
      newFilter.push({ label: "CATEGORY", filterList: categoryFilter.map((res) => { return res?.CategoryName }), listType: 'CategoryName' })
    }
    if (ProductTypeFilter) {
      newFilter.push({ label: "PRODUCT TYPE", filterList: ProductTypeFilter.map((res) => { return res?.ProducttypeName }), listType: 'ProducttypeName' })
    }
    if (GenderFilter) {
      newFilter.push({ label: "GENDER", filterList: GenderFilter.map((res) => { return res?.GenderName }), listType: 'GenderName' })
    }
    if (CollectionFilter) {
      newFilter.push({ label: "COLLECTION", filterList: CollectionFilter.map((res) => { return res?.CollectionName }), listType: 'CollectionName' })
    }

    newFilter.push({ label: "PRICE", filterList: [] });
    newFilter.push({ label: "NETWT", filterList: [] });
    newFilter.push({ label: "GROSSWT", filterList: [] });
    newFilter.push({ label: "DIAMONDWT", filterList: [] });

    return newFilter

  }

  // console.log("NewFilterData()",NewFilterData())

  const handleCheckboxChange = (e, ele, flist) => {
    const { name, checked, value } = e.target;

    setFilterChecked((prev) => ({
      ...prev,
      [name]: { checked, value: flist, type: ele.listType }
    }));
  }


  useEffect(() => {

    let FilterCheckedLength = (Object.values(filterChecked)).filter(fc => fc.checked !== false).filter(fc => fc.checked !== undefined)

    console.log("isFilterData", FilterCheckedLength?.length, newProData?.length)
    setTimeout(() => {
      if (FilterCheckedLength?.length > 0 && newProData?.length === 0) {
        setIsFilterData(true)
      } else {
        setIsFilterData(false)
      }
    }, 0)

  }, [filterChecked, newProData])


  // useEffect(() => {
  //   let FilterDataVar = [];
  //   let NewFilterArr = Object?.values(filterChecked).filter((ele) => ele?.checked === true)
  //   NewFilterArr.map((ele) => {
  //     let fd = ProductApiData2.filter((pd) => pd[ele?.type] === ele?.value)
  //     if (fd) {
  //       FilterDataVar.push(fd)
  //     }
  //   })

  //   console.log("filterDataVar",NewFilterArr)

  //   if (FilterDataVar.length && FilterDataVar) {
  //     let reverseData = FilterDataVar.reverse()
  //     const mergedArray = [].concat(...reverseData);
  //     setNewProData(mergedArray)
  //     // console.log("FilterDataVar", mergedArray)
  //   } else {
  //     setNewProData(ProductApiData2)
  //   }

  // }, [filterChecked])

  useEffect(() => {
    let filteredData = ProductApiData2;

    const activeFilters = Object.values(filterChecked).filter(ele => ele.checked);

    if (activeFilters.length > 0) {
      filteredData = filteredData.filter(product => {
        // Group filters by type
        const filtersByType = activeFilters.reduce((acc, filter) => {
          acc[filter.type] = acc[filter.type] || [];
          acc[filter.type].push(filter);
          return acc;
        }, {});

        // console.log("filtersByType",Object.values(filtersByType).every)


        // return Object.values(filtersByType).every(filters => {
        //     return filters.some(filter => product[filter.type] === filter.value);
        // });

        return Object.values(filtersByType).every(filters => {
          const filterResults = filters.map(filter => product[filter.type] === filter.value);
          return filterResults.some(result => result);
        });
      });
    }

    // let FilterCheckedLength = (Object.values(filterChecked)).filter(fc=> fc.checked !== false).filter(fc=> fc.checked !== undefined)
    let FilterCheckedLength = (Object.values(filterChecked)).filter(fc => fc.checked === true)

    if (FilterCheckedLength.length === 0) {
      setNewProData([])
      setRangeProData([])
      setSelectedSortOption('Recommended')
    } else {
      setNewProData(filteredData);
    }

  }, [filterChecked]);


  const getCartAndWishListData = async () => {

    const UserEmail = localStorage.getItem("registerEmail")
    const storeInit = JSON.parse(localStorage.getItem("storeInit"))
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

    let EncodeData = { FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`, Customerid: `${Customer_id?.id}` }

    const encodedCombinedValue = btoa(JSON.stringify(EncodeData));

    const body = {
      "con": `{\"id\":\"Store\",\"mode\":\"getdesignnolist\",\"appuserid\":\"${UserEmail}\"}`,
      "f": " useEffect_login ( getdataofcartandwishlist )",
      "p": encodedCombinedValue
    }

    await CommonAPI(body).then((res) => {
      if (res?.Message === "Success") {

        setCartData(res?.Data?.rd)
        setWishData(res?.Data?.rd1)

      }
    })

  }

  // useEffect(() => {
  //   let newData = Object.keys(cartFlag).filter((cf) => Object.keys(wishFlag).find((wf) => wf === cf))

  //   // const cartFlagKeys = Object.keys(cartFlag);
  //   // const updatedWishFlag = { ...wishFlag };

  //   // cartFlagKeys.forEach((cf) => {
  //   //   if (updatedWishFlag.hasOwnProperty(cf)) {
  //   //     delete updatedWishFlag[cf];
  //   //   }
  //   // });
  //   // console.log({ cartFlag, wishFlag }, newData)
  //   console.log(wishFlag)

  // }, [cartFlag, wishFlag])

  useEffect(() => {

    getCartAndWishListData()
    // getCountApi()
    getCountFunc()

  }, [])

  const handelWishList = async (event, prod) => {

    try {
      setWishFlag(prev => ({ ...prev, [prod?.designno]: event.target.checked }))
      // setWishFlag(event.target.checked)

      if (event.target.checked === true) {

        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        const product = prod

        console.log("prod",prod)

        const finalJSON = {
          "stockweb_event": "",
          "Mastermanagement_CategorySize": "",
          "sizeamountpersentage": "",
          "stockno": "",
          "is_show_stock_website": "0",
          "cmboDiaQualityColor": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor ?? ""}`,
          "cmboMetalType": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboMetalType ?? ""}`,
          "AdditionalValWt": Number(`${product?.AdditionalValWt}`),
          "BrandName": `${product?.BrandName ?? ""}`,
          "Brandid": 5,
          "CategoryName": `${product?.CategoryName}`,
          "Categoryid": Number(`${product?.Categoryid}`),
          "CenterStoneId": Number(`${product?.CenterStoneId}`),
          "CenterStonePieces": Number(`${product?.updCPCS}`),
          "CollectionName": `${product?.CollectionName}`,
          "Collectionid": Number(`${product?.Collectionid}`),
          "ColorWiseRollOverImageName": `${product?.ColorWiseRollOverImageName}`,
          "DefaultImageName": `${product?.DefaultImageName}`,
          "DisplayOrder": Number(`${product?.DisplayOrder}`),
          "FrontEnd_OrderCnt": Number(`${product?.FrontEnd_OrderCnt}`),
          "GenderName": `${product?.GenderName}`,
          "Genderid": Number(`${product?.Genderid}`),
          "Grossweight": Number(`${product?.updGWT}`),
          "InReadyStockCnt": Number(`${product?.InReadyStockCnt}`),
          "IsBestSeller": Number(`${product?.IsBestSeller}`),
          "IsColorWiseImageExists": `${product?.ColorWiseRollOverImageName?.length > 0 ? 1 : 0}`,
          "IsInReadyStock": Number(`${product?.IsInReadyStock}`),
          "IsNewArrival": `${product?.IsNewArrival}`,
          "IsRollOverColorWiseImageExists": `${product?.IsRollOverColorWiseImageExists?.length > 0 ? 1 : 0}`,
          "IsTrending": Number(`${product?.IsTrending}`),
          "MasterManagement_labid": Number(`${product?.MasterManagement_labid}`),
          "MasterManagement_labname": "",
          "MetalColorName": `${product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${product?.updMT?.split(" ")[1] ?? '18K'}`,
          "MetalPurityid": Number(`${product?.MetalTypeid}`),
          "MetalTypeName": `${product?.MetalTypeName ?? ""}`,
          "MetalTypeid": Number(`${product?.IsInReadyStock}`),
          "MetalWeight": Number(`${product?.updNWT}`),
          "OcassionName": `${product?.OcassionName ?? ""}`,
          "Ocassionid": Number(`${product?.Ocassionid}`),
          "ProducttypeName": `${product?.ProducttypeName}`,
          "Producttypeid": Number(`${product?.Producttypeid}`),
          "RollOverImageName": `${product?.RollOverImageName}`,
          "SubCategoryName": `${product?.SubCategoryName ?? ""}`,
          "SubCategoryid": Number(`${product?.SubCategoryid ?? ""}`),
          "ThemeName": `${product?.ThemeName ?? ""}`,
          "Themeid": Number(`${product?.Themeid}`),
          "TitleLine": `${product?.TitleLine}`,
          // "UnitCost": `${product?.price === "Not Available" ? 0 : product?.price}`,
          "UnitCost": `${product?.price ?? 0}`,
          // "UnitCostWithmarkup": (`${(product?.price === "Not Available" ? 0 : product?.price) + (product?.markup ?? 0)}`),
          "UnitCostWithmarkup": (`${PriceWithMarkupFunction(product?.markup,product?.price,currData?.CurrencyRate)}`),
          "autocode": `${product?.autocode}`,
          "colorstonecolorname": `${product?.colorstonecolorname}`,
          "colorstonequality": `${product?.colorstonequality}`,
          "designno": `${product?.designno}`,
          "diamondcolorname": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[1]}`,
          "diamondpcs": Number(`${product?.updDPCS}`),
          "diamondquality": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[0]}`,
          "diamondsetting": `${product?.diamondsetting}`,
          "diamondshape": `${product?.diamondshape}`,
          "diamondweight": Number(`${product?.updDWT}`),
          "encrypted_designno": `${product?.encrypted_designno ?? ""}`,
          "hashtagid": `${product?.Hashtagid ?? ""}`,
          "hashtagname": `${product?.Hashtagname ?? ""}`,
          "imagepath": `${globImagePath}`,
          "imgrandomno": `${product?.imgrandomno}`,
          "mediumimage": `${product?.MediumImagePath ?? ""}`,
          "originalimage": `${product?.OriginalImagePath}`,
          "storyline_html": `${product?.storyline_html ?? ""}`,
          "storyline_video": `${product?.storyline_video ?? ""}`,
          "thumbimage": `${product?.ThumbImagePath}`,
          "totaladditionalvalueweight": 0,
          "totalcolorstoneweight": Number(`${product?.updCWT}`),
          "totaldiamondweight": Number(`${product?.updDWT}`),
          "updatedate": `${product?.UpdateDate}`,
          "videoname": `${product?.videoname ?? ""}`,
          "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
          "Customerid": `${Customer_id?.id}`,
          "PriceMastersetid": `${product?.PriceMastersetid ?? ""}`,
          "DQuality": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[0]}`,
          "DColor": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[1]}`,
          "UploadLogicalPath": `${product?.UploadLogicalPath ?? ""}`,
          "ukey": `${storeInit?.ukey}`
        }

        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"addwishlist\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToWishListIconClick (addwishlist)",
          p: encodedCombinedValue,
        };

        await CommonAPI(body).then(async (res) => {
          if (res?.Data?.rd[0]?.msg === "success") {
            await getCartAndWishListData()
            getCountFunc()
          }
        })
      }
      else {
        // {"designlist":"'MCJ10'","isselectall":"0","FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}

        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        setWishListRemoveData(prod.designno)

        let Data = { "designlist": `'${prod?.designno}'`, "isselectall": "0", "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }

        let encodedCombinedValue = btoa(JSON.stringify(Data))
        const body = {
          con: `{\"id\":\"\",\"mode\":\"removeFromWishList\",\"appuserid\":\"${UserEmail}\"}`,
          f: "RemoveFromWishlistIconClick (removeFromWishList)",
          p: encodedCombinedValue,
        }

        await CommonAPI(body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (res?.Data?.rd[0]?.stat_msg === "success") {
            // removefromCart()
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // removefromCart(prod)
          }
        })

      }
    }
    catch (error) {
      console.log("error", error);
    }
    // console.log("productsWish",prod)
    // prod["checkFlag"] = event.target.checked
  }
  const [disablecartBtn, setDisablecartBtn] = useState(false);

  const handelCartList = async (event, prod) => {
    try {
      setCartFlag(prev => ({ ...prev, [prod?.designno]: event.target.checked }))

      setDisablecartBtn(true);
      if (event.target.checked === true) {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        const product = prod

        let isWishHasCartData = WishData?.filter((pd) => product.autocode === pd.autocode)
        // console.log("isWishHasCartData", isWishHasCartData)

        let wishToCartEncData = { "autocodelist": `${isWishHasCartData[0]?.autocode}`, "ischeckall": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }

        const finalJSON = {
          "stockweb_event": "",
          "designno": `${product?.designno}`,
          "autocode": `${product?.autocode}`,
          "imgrandomno": `${product?.imgrandomno}`,
          "producttypeid": `${product?.Producttypeid}`,
          "metaltypeid": `${product?.MetalTypeid}`,
          "metalcolorid": `${product?.MetalColorid}`,
          "stockno": "",
          // "DQuality": `${product?.diamondquality?.split(",")[0]}`,
          "DQuality": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[0]}`,
          "DColor": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[1]}`,
          "cmboMetalType": `${product?.MetalTypeName} ${product?.MetalPurity}`,
          "AdditionalValWt": Number(`${product?.AdditionalValWt}`),
          "BrandName": `${product?.BrandName ?? ""}`,
          "Brandid": Number(`${product?.Brandid}`),
          "CategoryName": `${product?.CategoryName}`,
          "Categoryid": Number(`${product?.Categoryid}`),
          "CenterStoneId": Number(`${product?.CenterStoneId}`),
          "CenterStonePieces": Number(`${product?.updCPCS}`),
          "CollectionName": `${product?.CollectionName}`,
          "Collectionid": Number(`${product?.Collectionid}`),
          "ColorWiseRollOverImageName": `${product?.ColorWiseRollOverImageName}`,
          "DefaultImageName": `${product?.DefaultImageName}`,
          "DisplayOrder": Number(`${product?.DisplayOrder}`),
          "FrontEnd_OrderCnt": Number(`${product?.FrontEnd_OrderCnt}`),
          "GenderName": `${product?.GenderName}`,
          "Genderid": Number(`${product?.Genderid}`),
          "Grossweight": Number(`${product?.updGWT}`),
          "InReadyStockCnt": Number(`${product?.InReadyStockCnt}`),
          "IsBestSeller": Number(`${product?.IsBestSeller}`),
          "IsColorWiseImageExists": `${product?.IsColorWiseImageExists ?? 0}`,
          "IsInReadyStock": Number(`${product?.IsInReadyStock}`),
          "IsNewArrival": `${product?.IsNewArrival}`,
          "IsRollOverColorWiseImageExists": `${product?.IsRollOverColorWiseImageExists ?? ""}`,
          "IsTrending": Number(`${product?.IsTrending}`),
          "MasterManagement_labid": Number(`${product?.MasterManagement_labid}`),
          "MasterManagement_labname": "",
          "MetalColorName": `${product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${product?.updMT.split(" ")[1]}`,
          "MetalPurityid": Number(`${product?.MetalTypeid}`),
          "MetalTypeName": `${product?.MetalTypeName}`,
          "MetalTypeid": Number(`${product?.IsInReadyStock}`),
          "MetalWeight": Number(`${product?.updNWT}`),
          "OcassionName": `${product?.OcassionName ?? ""}`,
          "Ocassionid": Number(`${product?.Ocassionid}`),
          "ProducttypeName": `${product?.ProducttypeName}`,
          "Producttypeid": Number(`${product?.Producttypeid}`),
          "RollOverImageName": `${product?.RollOverImageName}`,
          "SubCategoryName": `${product?.SubCategoryName ?? ""}`,
          "SubCategoryid": Number(`${product?.SubCategoryid}`),
          "ThemeName": `${product?.ThemeName ?? ""}`,
          "Themeid": Number(`${product?.Themeid}`),
          "TitleLine": `${product?.TitleLine}`,
          "UnitCost": `${product?.price === "Not Available" ? 0 : product?.price}`,
          "UnitCostWithmarkup": (`${(product?.price === "Not Available" ? 0 : product?.price) + (product?.markup ?? 0)}`),
          "colorstonecolorname": `${product?.colorstonecolorname}`,
          "colorstonequality": `${product?.colorstonequality}`,
          "diamondcolorname": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[1]}`,
          "diamondpcs": Number(`${product?.updDPCS}`),
          "diamondquality": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[0]}`,
          "diamondsetting": `${product?.diamondsetting}`,
          "diamondshape": `${product?.diamondshape}`,
          "diamondweight": Number(`${product?.updDWT}`),
          "encrypted_designno": `${product?.encrypted_designno ?? ""}`,
          "hashtagid": `${product?.Hashtagid ?? ""}`,
          "hashtagname": `${product?.Hashtagname ?? ""}`,
          "imagepath": `${globImagePath}`,
          "mediumimage": `${product?.MediumImagePath ?? ""}`,
          "originalimage": `${product?.OriginalImagePath}`,
          "storyline_html": `${product?.storyline_html ?? ""}`,
          "storyline_video": `${product?.storyline_video ?? ""}`,
          "thumbimage": `${product?.ThumbImagePath}`,
          "totaladditionalvalueweight": Number(`${product?.totaladditionalvalueweight}`),
          "totalcolorstoneweight": Number(`${product?.updCWT}`),
          "totaldiamondweight": Number(`${product?.updDWT}`),
          "updatedate": `${product?.UpdateDate}`,
          "videoname": `${product?.videoname ?? ""}`,
          "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
          "Customerid": `${Customer_id?.id}`,
          "PriceMastersetid": `${product?.PriceMastersetid ?? ""}`,
          "quantity": `${product?.quantity ?? "1"}`,
          "CurrencyRate": `${product?.CurrencyRate ?? ""}`,
          "remarks_design": `${product?.remarks_design ?? ""}`,
          "diamondcolorid": `${product?.diamondcolorid ?? ""}`,
          "diamondqualityid": `${product?.diamondqualityid ?? ""}`,
          "detail_ringsize": `${product?.detail_ringsize ?? ""}`,
          "ProjMode": `${product?.ProjMode ?? ""}`,
          "AlbumMasterid": `${product?.AlbumMasterid ?? ""}`,
          "AlbumMastername": `${product?.AlbumMastername ?? ""}`,
          "Albumcode": `${product?.Albumcode ?? ""}`,
          "Designid": `${product?.Designid ?? ""}`
        }

        console.log("product", finalJSON)


        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));
        const wishToCartEncData1 = btoa(JSON.stringify(wishToCartEncData));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToCartIconClick (addcartlist)",
          p: encodedCombinedValue,
        };

        let body1 = {
          con: `{\"id\":\"Store\",\"mode\":\"addwishlisttocart\",\"appuserid\":\"${UserEmail}\"}`,
          f: "iconclick (addwishlisttocart)",
          p: wishToCartEncData1
        }

        await CommonAPI(isWishHasCartData.length ? body1 : body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (!isWishHasCartData.length && res?.Data?.rd[0]?.msg === "success") { //ADDTOCART
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // prod.checkFlag=false
            setDisablecartBtn(false);
          }

          if (isWishHasCartData.length && res?.Data?.rd[0]?.stat_msg === "success") { //ADDWISHLISTTOCART
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            WishListToCart()

          } else {
            await getCartAndWishListData()
            getCountFunc()
          }
        })



      }
      else {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));
        const UserEmail = localStorage.getItem("registerEmail")

        setCartRemoveData(prod.designno)

        let Data = { "designno": `${prod?.designno}`, "autocode": `${prod?.autocode}`, "metalcolorid": 0, "isSolStockNo": 0, "is_show_stock_website": "0", "isdelete_all": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}`, "cartidlist": "" }

        let encodedCombinedValue = btoa(JSON.stringify(Data))
        const body = {
          con: `{\"id\":\"\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
          f: "RemoveFromCartIconClick (removeFromCartList)",
          p: encodedCombinedValue,
        }

        await CommonAPI(body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (res?.Data?.rd[0]?.stat_msg === "success") {
            // removefromCart()
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // removefromCart(prod)
          } else {
            await getCartAndWishListData()
            getCountFunc()
          }
        })

      }

    }
    catch (error) {
      console.log("error", error);
      setDisablecartBtn(false);
    }

  }

  // useEffect(() => {
  //   let flag = localStorage.getItem('productDataShow') ?? 'true';
  //   if (newProData.length === 0 && flag === 'true') {
  //     let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
  //     setNewProData(data);
  //     setTimeout(() => {
  //       localStorage.setItem('productDataShow', 'false')
  //     }, 100)
  //   }
  // }, [getHeaderData, newProData])


  useEffect(() => {
    //level1 filter
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "collection") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.CollectionName === getHeaderData2?.value2)
      setNewProData(data)
    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "category") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.CategoryName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "gender") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.GenderName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "brand") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.BrandName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "brand") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.BrandName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "collection") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.CollectionName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "category") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.CategoryName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "gender") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.GenderName === getHeaderData2?.value2)
      setNewProData(data);

    }

    // level2 filter
    if (getHeaderData?.label1 === "collection") {
      let data = productData?.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "brand") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "category") {
      let data = productData?.filter((pd) => pd && pd.CategoryName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "gender") {
      let data = productData?.filter((pd) => pd && pd.GenderName === getHeaderData?.value1)
      setNewProData(data)

    }

  }, [getHeaderData2, getHeaderData])

  const newMenuProdData = () => {
    let data = productData?.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
    setNewProData(data)
  }
  useEffect(() => {
    if (getHeaderData && getHeaderData.value1 && productData) {
      newMenuProdData()
    }
  }, [getHeaderData])

  // const getDesignPriceList = async () => {

  //   const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  //   const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  //   const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"));
  //   const UserEmail = localStorage.getItem("registerEmail")

  //   const GetPriceReq = {
  //     "CurrencyRate": `${currencyCombo?.CurrencyRate}`,
  //     "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
  //     "Customerid": `${loginUserDetail?.id}`,
  //     "Laboursetid": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._pricemanagement_laboursetid : loginUserDetail?.pricemanagement_laboursetid}`,
  //     "diamondpricelistname": `${loginUserDetail?._diamondpricelistname}`,
  //     "colorstonepricelistname": `${loginUserDetail?._colorstonepricelistname}`,
  //     "SettingPriceUniqueNo": `${loginUserDetail?.SettingPriceUniqueNo}`,
  //     "DesignNo": ""
  //   }

  //   const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  //   let body = {
  //     "con": `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
  //     "f": "onloadFirstTime (getdesignpricelist)",
  //     "p": encodedCombinedValue
  //   }

  //   await CommonAPI(body).then((res) => {
  //     localStorage.setItem("getPriceData",JSON.stringify(res?.Data))
  //     setpriceDataApi(res?.Data)
  //   })

  // }

  const handleChange1 = () => {

  }

  // useEffect(() => {
  //   getDesignPriceList()
  // }, [])

  useEffect(() => {
    const priceOnly = (newProData.length ? newProData :ProductApiData2)?.filter(item => item?.price !== 'Not Available')
    ?.map(item => item.price != 0 && item.price)?.sort((a, b) => a - b);
      
      // ?.map(item => item.price != 0 && item.price != '' ? item.price + item?.UnitCost : item.UnitCost)
      
    setMinPrice(priceOnly[0]);
    setMaxPrice(priceOnly[priceOnly?.length - 1]);
    setValue1([priceOnly[0], priceOnly[priceOnly?.length - 1]])
    // const netWtOnly = ProductApiData2?.map((item) => item?.netwt).sort((a, b) => a - b);
    const netWtOnly = (newProData.length ? newProData :ProductApiData2)?.map((item) => item?.updNWT).sort((a, b) => a - b);
    setMinNetwt(netWtOnly[0]);
    setMaxNetwt(netWtOnly[netWtOnly?.length - 1]);
    setValue2([netWtOnly[0], netWtOnly[netWtOnly?.length - 1]])

    // const grossWtOnly = ProductApiData2?.map((item) => item?.Grossweight).sort((a, b) => a - b);
    const grossWtOnly = (newProData.length ? newProData :ProductApiData2)?.map((item) => item?.updGWT).sort((a, b) => a - b);
    setMinGrossWt(grossWtOnly[0]);
    setMaxGrossWtt(grossWtOnly[grossWtOnly?.length - 1]);
    setValue3([grossWtOnly[0], grossWtOnly[grossWtOnly?.length - 1]])
    
    // const diamondWtOnly = ProductApiData2?.map((item) => item?.diamondweight).sort((a, b) => a - b);
    const diamondWtOnly = (newProData.length ? newProData :ProductApiData2)?.map((item) => item?.updDWT).sort((a, b) => a - b);
    setMinDiamondWt(diamondWtOnly[0]);
    setMaxDiamondWt(diamondWtOnly[diamondWtOnly?.length - 1]);
    setValue4([diamondWtOnly[0], diamondWtOnly[diamondWtOnly?.length - 1]])

  }, [ProductApiData2,newProData]);

  const handlePriceChange = (event, newValue, activeThumb) => {
    setValue1(newValue);
    filterDatasfunc(newValue, value2, value3, value4);
  };

  const handleNetWtChange = (event, newValue, activeThumb) => {
    setValue2(newValue);
    filterDatasfunc(value1, newValue, value3, value4);
  };

  const handlegrossWtChange = (event, newValue, activeThumb) => {
    setValue3(newValue);
    filterDatasfunc(value1, value2, newValue, value4);
  };

  const handleDiamondChange = (event, newValue, activeThumb) => {
    setValue4(newValue);
    filterDatasfunc(value1, value2, value3, newValue);
  };

  const filterDatasfunc = (priceRange, netWtRange, grossWtRange, diamondWtRange) => {

    const filteredData = (newProData.length ? newProData : ProductApiData2)?.filter((item) => {
      const priceInRange = item?.price >= (priceRange[0]) && item?.price <= (priceRange[1]);
      const netWtInRange = item.netwt >= netWtRange[0] && item.netwt <= netWtRange[1];
      const grossWtInRange = item.Grossweight >= grossWtRange[0] && item.Grossweight <= grossWtRange[1];
      const diamondWtInRange = item.diamondweight >= diamondWtRange[0] && item.diamondweight <= diamondWtRange[1];
      return priceInRange && netWtInRange && grossWtInRange && diamondWtInRange;

    });
    // setNewProData(filteredData);
    setRangeProData(filteredData)
  };

  const handlePageReload = () => {
    // setRangeProData([])
    setFilterChecked({})
    setNewProData(ProductApiData2);
    setMinPrice(0)
    setMaxPrice(maxPrice)
    setValue1([minPrice, maxPrice])
    setMinNetwt(0)
    setMaxNetwt(maxNetwt)
    setValue2([0, maxNetwt])
    setMinGrossWt(0)
    setMaxGrossWtt(maxGrosswt)
    setValue3([0, maxGrosswt])
    setMinDiamondWt(0)
    setMaxDiamondWt(maxDiamondWt)
    setValue4([0, maxDiamondWt])
  }

  const [hoveredImageUrls, setHoveredImageUrls] = useState({});

  const handleHoverImageShow = (url, index, rollPath, imagepath) => {
    // isColorWiseImageShow

    let updatedFilename = rollPath.replace(/\s/g, '_');
    let newPath = url.replace(/\/([^/]+)$/, '/' + updatedFilename);
    let path = imagepath + newPath;

    if (rollPath.length !== 0) {
      setHoveredImageUrls(prevHoveredImageUrls => {
        return { ...prevHoveredImageUrls, [index]: path };
      });
    }

  };

  const handleMouseLeave = (index) => {
    setHoveredImageUrls(prevState => {
      const newState = { ...prevState };
      delete newState[index];
      return newState;
    });
  };


  function convertPath(path) {
    return path.replace(/\\/g, '/');
  }

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleColorSelection = async (product, index, color) => {
    const uploadPath = localStorage.getItem('UploadLogicalPath');
    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    const colorWiseImageData = JSON.parse(localStorage.getItem('colorDataImages'));
    const productAutoCode = product?.autocode;
    const productColorName = color;
    // console.log("color--", productColorName);
    
    // console.log("colorWiseImageData--", colorWiseImageData);

    if (!colorWiseImageData) {
      return [];
    }

    if (data.IsColorWiseImages == 1) {
      const matchingData = colorWiseImageData.filter(imageDataItem => (
        productAutoCode === imageDataItem.autocode && 
        productColorName.toLowerCase() === imageDataItem.colorname.toLowerCase()
      ));
      
      // console.log('isAvailable---', matchingData);

      const checkAvailabilityPromises = matchingData.map(async (imageDataItem) => {
        const imagePath = uploadPath + '/' + data.ukey + convertPath(imageDataItem.imagepath);
        const isAvailable = await checkImageAvailability(imagePath);
        return { imagePath: imagePath.replace(/ /g, "%20"), isAvailable };
      });

      const imageData = await Promise.all(checkAvailabilityPromises);
      const availableImage = imageData.find(image => image.isAvailable);

      // console.log('formedImgData',imagePath);
      if (availableImage) {
        const formedImgData = { [index]: availableImage.imagePath };
        setUpdateColorImage(formedImgData);
        return availableImage;
      } else {
        console.log('No available image found');
        return [];
      }
    } else {
      setUpdateColorImage({});
      return [];
    }
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDetailDrawer = () => {
    setIsOpenDetail(!isOpenDetail);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

      {isOpenDetail &&
        <div>
          {NewFilterData().map((ele, index) => (
            <>
              <Accordion
                elevation={0}
                sx={{
                  borderBottom: "1px solid #c7c8c9",
                  borderRadius: 0,
                  marginLeft: "28px",
                  "&.Mui-expanded": {
                    marginLeft: "28px",
                  },
                  "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  },
                  "&.MuiPaper-root.MuiAccordion-root:before": {
                    background: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    color: "#7f7d85",
                    borderRadius: 0,

                    "&.MuiAccordionSummary-root": {
                      padding: 0,
                    },
                  }}
                >
                  <span
                    style={{
                      fontFamily: "TT Commons, sans-serif",
                      fontSize: "12px",
                      opacity: "0.7",
                    }}
                  >
                    {ele.label}
                  </span>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {ele.label === "PRICE" &&
                    <div>
                      <Slider
                        className='netWtSecSlider'
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                    </div>}

                  {ele.label === "CENTERSTONE" &&
                    <div>
                      <Slider
                        className='netWtSecSlider'
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                    </div>
                  }

                  {ele?.filterList?.map((flist, i) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                      key={i}
                    >
                      <Checkbox
                        name={`checkbox${index + 1}${i + 1}`}
                        checked={
                          filterChecked[`checkbox${index + 1}${i + 1}`]
                            ?.checked
                        }
                        style={{
                          color: "#7f7d85",
                          padding: 0,
                          width: "10px",
                        }}
                        onClick={(e) =>
                          handleCheckboxChange(e, ele, flist)
                        }
                        size="small"
                      />
                      <small
                        style={{
                          fontFamily: "TT Commons, sans-serif",
                          color: "#7f7d85",
                          textTransform: "lowercase",
                        }}
                      >
                        {flist}
                      </small>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </div>}
    </Box>
  );

  const [selectedSortOption, setSelectedSortOption] = useState('None');

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("allproductlist"));
  //   setProductApiData2(data);
  // }, []);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSortOption(selectedOption);
    let sortedData = [...ProductApiData2];

    if (selectedOption === 'PRICE HIGH TO LOW') {
      sortedData.sort((a, b) => ((b?.price ?? 0) + (b?.markup ?? 0)) - ((a?.price ?? 0) + (a?.markup ?? 0)));
    } else if (selectedOption === 'PRICE LOW TO HIGH') {
      sortedData.sort((a, b) => ((a?.price ?? 0) + (a?.markup ?? 0)) - ((b?.price ?? 0) + (b?.markup ?? 0)));
    } else {
      setNewProData(ProductApiData2)
    }
    setNewProData(sortedData);
  };

  useEffect(() => {
    if ((newProData?.length || ProductApiData2?.length)) {
      setIsProdLoading(true)
    } else {
      setIsProdLoading(false)
    }
  }, [newProData, ProductApiData2])


  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    if (pPrice <= 0) {
      return 0
    }
    else if(pmu <=0){
      return pPrice
    }
    else{
      let percentPMU = ((pmu/100) / curr)
      return (Number(pPrice*(percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }



  return (
    <div id="top">

      <div
        style={{
          backgroundColor: "#c0bbb1",
          height: "100%",
          width: "100%",
          // paddingBottom: "100px",
        }}
      >
        {(!IsProdLoading && <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>)}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: '110px'
          }}
          className='paddingTopMobileSet'
        >
          <div className="smilingProductMain" id="smilingProductMain">
            <div
              className="smilingProductSubMain"
              style={{ width: "100%", display: "flex" }}
            >
              <div
                style={{
                  width: "20%",
                  margin: "0px 100px 0px 0px",
                  padding: "100px 0px 40px 50px",
                }}
                className="smilingWebProductListSideBar"
              >
                <ul className="d-flex" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <li className="finejwelery me-4" id="finejwelery" style={{ fontSize: '14px' }}>Filters{newProData.length > 0 ? ` (${newProData.length}/${ProductApiData2?.length}) ` : null}</li>
                  <li className="finejwelery" id="finejwelery" 
                  onClick={() =>handlePageReload()} 
                  style={{ cursor: 'pointer', fontSize: '14px' }}>
                    {
                      (Object.values(filterChecked)).filter(fc => fc.checked !== false).filter(fc => fc.checked !== undefined).length || newProData?.length > 0 ?
                        "Clear All"
                        :
                        `Product: ${ProductApiData2?.length}`
                    }
                  </li>
                </ul>
                <div>
                  {NewFilterData().map((ele, index) => (
                    <>
                      <Accordion
                        elevation={0}
                        sx={{
                          borderBottom: "1px solid #c7c8c9",
                          borderRadius: 0,
                          marginLeft: "28px",
                          "&.Mui-expanded": {
                            marginLeft: "28px",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:before": {
                            background: "none",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          sx={{
                            color: "#7f7d85",
                            borderRadius: 0,

                            "&.MuiAccordionSummary-root": {
                              padding: 0,
                            },
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "TT Commons, sans-serif",
                              fontSize: "12px",
                              opacity: "0.7",
                            }}
                          >
                            {ele.label}
                          </span>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          {ele.label === "PRICE" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value1}
                                min={minPrice}
                                max={maxPrice}
                                size="small"
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value1[0]} className="minmaxvalpl" disabled />
                                <input value={value1[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>}

                          {ele.label === "NETWT" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value2}
                                min={minNetwt}
                                max={maxNetwt}
                                size="small"
                                onChange={handleNetWtChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value2[0]} className="minmaxvalpl" disabled />
                                <input value={value2[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>
                          }

                          {ele.label === "GROSSWT" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value3}
                                min={minGrosswt}
                                max={maxGrosswt}
                                size="small"
                                onChange={handlegrossWtChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value3[0]} className="minmaxvalpl" disabled />
                                <input value={value3[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>
                          }

                          {ele.label === "DIAMONDWT" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value4}
                                min={minDiamondWt}
                                max={maxDiamondWt}
                                size="small"
                                onChange={handleDiamondChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value4[0]} className="minmaxvalpl" disabled />
                                <input value={value4[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>
                          }

                          {ele.filterList.map((flist, i) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                              key={i}
                            >
                              <Checkbox
                                name={`checkbox${index + 1}${i + 1}`}
                                checked={
                                  filterChecked[`checkbox${index + 1}${i + 1}`]
                                    ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                    : false
                                }
                                style={{
                                  color: "#7f7d85",
                                  padding: 0,
                                  width: "10px",
                                }}
                                onClick={(e) =>
                                  handleCheckboxChange(e, ele, flist)
                                }
                                size="small"
                              />
                              <small
                                style={{
                                  fontFamily: "TT Commons, sans-serif",
                                  color: "#7f7d85",
                                  textTransform: "lowercase",
                                }}
                              >
                                {flist}
                              </small>
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ))}
                </div>
              </div>
              {/* for mobile */}
              <div className="smilingMobileProductListSideBar">

                <hr style={{ marginTop: "0px" }} />
                <div style={{ display: "flex", marginInline: "15px" }}>
                  <div style={{ width: "49%" }} onClick={toggleDrawerOverlay}>

                    <Drawer
                      anchor="bottom"
                      open={isOpenDetail}
                      onClose={toggleDetailDrawer}
                    >
                      {list("bottom")}
                    </Drawer>

                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#7d7f85",
                        fontSize: "13px",
                        fontWeight: 500,
                        margin: "0px",
                      }}
                      // onClick={toggleDeatilList}
                      onClick={toggleDetailDrawer}
                    >
                      FILTER<span>{isOpenDetail ? "-" : "+"}</span>
                    </p>

                  </div>
                  <hr
                    style={{
                      border: "none",
                      marginBottom: "0px",
                      marginInline: "5px",
                      borderLeft: "1px solid black",
                      height: "50px",
                      marginTop: "-16px",
                    }}
                  />
                  <div
                    style={{
                      width: "49%",
                      display: "flex",
                      marginTop: "-15px",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "13px ",
                      }}
                      onChange={handleSortChange}
                      value={selectedSortOption}
                    >
                      <option value="None">Recommended</option>
                      <option value="None">New</option>
                      <option value="None">In stock</option>
                      <option value="PRICE HIGH TO LOW">PRICE HIGH TO LOW</option>
                      <option value="PRICE LOW TO HIGH">PRICE LOW TO HIGH</option>
                    </select>
                  </div>
                </div>
              </div>
              {!isFilterData ? <div
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: 'column',
                  // justifyContent: "center",
                  alignItems: "center",
                  margin: "40px 50px 0px 0px",
                }}
                className="smilingProductImageMain"
                id="smilingProductImageMain"
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: '10px'
                  }}
                  className="smilingFilterweb"
                >
                  <select
                    style={{
                      width: "20%",
                      height: '40px',
                      border: '1px solid lightgray',
                      borderRadius: '5px',
                      paddingBottom: '10px',
                      outline: "none",
                      fontSize: "13px ",
                    }}
                    onChange={handleSortChange}
                    value={selectedSortOption}
                  >
                    <option value="None">Recommended</option>
                    <option value="None">New</option>
                    <option value="None">In stock</option>
                    <option value="PRICE HIGH TO LOW">PRICE HIGH TO LOW</option>
                    <option value="PRICE LOW TO HIGH">PRICE LOW TO HIGH</option>
                  </select>
                </div>
                <div
                  style={{
                    width: "100%",
                    // border: "1px solid #e1e1e1",
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                  className="smilingAllProductDataMainMobile"
                >
                  {/* RollOverImageName */}
                  {/* {(newProData.length ? newProData : finalDataOfDisplaying())?.map((products, i) => ( */}
                  {(rangeProData.length ? rangeProData : (newProData?.length ? newProData : ProductApiData2))?.map((products, i) => (
                    <div
                      style={{
                        width: "33.33%",
                        border: "1px solid #e1e1e1",
                        textAlign: "center",
                        color: "#7d7f85",
                        position: "relative",
                        zIndex: 0,
                      }}
                      className="smilingProductImageBox"
                    >
                      {products?.designno === "S24705E" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}
                      {products?.designno === "S24705" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}
                      {products?.designno === "MCJ2" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}

                      <div onClick={() => handelProductSubmit(products)}>
                        <img
                          className="prod_img"
                          src={
                            hoveredImageUrls[i] ? hoveredImageUrls[i] : updatedColorImage[i] ? updatedColorImage[i] :
                              (products?.MediumImagePath ?
                                (globImagePath + products?.MediumImagePath?.split(",")[0])
                                :
                                notFound)
                          }
                          onMouseEnter={() => handleHoverImageShow(products?.MediumImagePath?.split(",")[0], i, products?.RollOverImageName, globImagePath)}
                          // onMouseEnter={() => handleHoverImageShow(products?.MediumImagePath?.split(",")[0], i, isColorWiseImageShow === 1 ? products?.ColorWiseRollOverImageName : products?.RollOverImageName, products?.imagepath)}
                          onMouseLeave={() => handleMouseLeave(i)}
                          style={{ objectFit: 'contain' }}
                          alt="#"
                        />
                      </div>
                      <div className="productTitleLine" onClick={() => handelProductSubmit(products)}>
                        <p
                          className={products?.TitleLine?.length > 30 ? "smilingProductDeatilTitleMobile" : "smilingProductDeatilTitleMobilenotWidth"}
                        >
                          {products?.TitleLine}
                        </p>
                        <span style={{ fontWeight: 600, fontSize: "13px" }}>{`-${products?.designno}`} </span>
                      </div>
                      <div style={{}}>
                        <div className="mobileDeatilDiv1" style={{ display: 'flex', justifyContent: 'center', height: '20px' }}>
                          {ismetalWShow === 1 &&
                            <div>
                              <p style={{ margin: '0px', fontSize: '13px' }}>NWT : <span style={{ fontWeight: 600, marginRight: '15px' }}>{products?.updNWT}</span></p>
                            </div>}
                          {isGrossWShow === 1 && <div>
                            <p style={{ margin: '0px', fontSize: '13px' }}>GWT : <span style={{ fontWeight: 600, marginRight: '10px' }}>{products?.updGWT}</span></p>
                          </div>}
                        </div>
                        <div className="mobileDeatilDiv2" style={{ display: 'flex', justifyContent: 'center', height: '20px' }}>
                          {((isDaaimongWShow || isDaaimongWShow) === 1 && (products?.diamondweight !== 0 || products?.diamondpcs !== 0)) && <div>
                            <p style={{ margin: '0px', fontSize: '13px' }}>DWT : <span style={{ fontWeight: 600, marginRight: '10px' }}>{(isDaaimongWShow === 1 && products?.diamondweight !== 0) && products?.updDWT + '/'}  {(isDaaimonPShow === 1 && products?.diamondpcs !== 0) && products?.updDPCS}</span></p>
                          </div>}

                          {((isStoneWShow || isStonePShow) === 1 && (products?.totalcolorstoneweight !== 0 || products?.totalcolorstonepcs !== 0)) && <div>
                            <p style={{ margin: '0px', fontSize: '13px' }}>CWT : <span style={{ fontWeight: 600, marginRight: '10px' }}>{(isStoneWShow === 1 && products?.totalcolorstoneweight !== 0) && products?.updCWT + '/'}  {(isStonePShow === 1 && products?.totalcolorstonepcs !== 0) && products?.updCPCS}</span></p>
                          </div>}
                        </div>

                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                            {isMetalTCShow === 1 && <span>
                              {/* {products?.MetalTypeName} - */}
                              {products?.updMC} -
                              {products?.updMT} /
                            </span>}
                            {isPriceShow === 1 &&
                              <span style={{ display: 'flex' }}>
                                {/* {currencySym?.Currencysymbol} */}
                                {/* {currData[0]?.Currencysymbol.split(";").filter((cs)=>cs !== ' ').map((sym,index)=>{(
                                  <div
                                  key={index}    
                                  dangerouslySetInnerHTML={{ __html: sym }}
                                />
                                )})} */}
                                <div dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />
                                {PriceWithMarkupFunction(products?.markup, products?.price, currData?.CurrencyRate)?.toFixed(2)}
                              </span>
                            }
                          </p>
                        </div>
                      </div>

                      <div style={{ position: "absolute", zIndex: 999999, top: 0, right: 0, display: 'flex' }}>
                        <div>
                          <Checkbox
                            icon={
                              <StarBorderIcon
                                sx={{ fontSize: "22px", color: "#ffd200" }}
                              />
                            }
                            checkedIcon={
                              <StarIcon
                                sx={{ fontSize: "22px", color: "#ffd200" }}
                              />
                            }
                            disableRipple={true}
                            sx={{ padding: "5px" }}

                            // checked={wishFlag[products?.designno] ?? products?.wishCheck}
                            checked={wishFlag[products?.designno] ?? products?.wishCheck}
                            onChange={(e) => handelWishList(e, products)}
                          />
                        </div>
                        <div>
                          <Checkbox
                            icon={
                              <LocalMallOutlinedIcon
                                sx={{ fontSize: "22px", color: "#ffd200" }}
                              />
                            }
                            checkedIcon={
                              <LocalMallIcon
                                sx={{ fontSize: "22px", color: "#ffd200" }}
                              />
                            }
                            disableRipple={true}
                            sx={{ padding: "5px" }}

                            // checked={cartFlag[products?.designno] ?? products?.checkFlag}
                            checked={cartFlag[products?.designno] ?? products?.checkFlag}
                            onChange={(e) => handelCartList(e, products)}
                          // disabled={disablecartBtn}
                          />
                        </div>
                      </div>
                      {isColorWiseImageShow == 1 && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "9px",
                              height: "9px",
                              backgroundColor: "#c8c8c8",
                              borderRadius: "50%",
                              cursor: 'pointer'
                            }}
                            onClick={() => handleColorSelection(products, i, 'White Gold')}
                          ></div>
                          <div
                            style={{
                              width: "9px",
                              height: "9px",
                              backgroundColor: "#ffcfbc",
                              borderRadius: "50%",
                              cursor: 'pointer'
                            }}
                            onClick={(e) => handleColorSelection(products, i, 'Rose Gold')}
                          ></div>
                          <div
                            style={{
                              width: "9px",
                              height: "9px",
                              backgroundColor: "#e0be77",
                              borderRadius: "50%",
                              cursor: 'pointer'
                            }}
                            onClick={(e) => handleColorSelection(products, i, 'Yellow Gold')}
                          >
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
                :
                <div style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "40px 50px 0px 0px"
                }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '30px', marginTop: '-130px' }}>Data Not Available!!!</span>
                </div>
              }
            </div>
            <SmilingRock />
            <Footer />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
          <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
        </div>
      </div>

    </div >
  );
};

export default ProductList;