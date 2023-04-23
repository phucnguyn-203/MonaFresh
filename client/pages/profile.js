import { useEffect, useState } from "react";
import Styles from "@/styles/Profile.module.css";
import MyProfile from "@/components/Profile/MyProfile/myProfile";
import MyOders from "@/components/Profile/MyOders/myOders";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";
export default function Profile() {
    const [sidebar, setSidebar] = useState(0);
   
    return (
        <div className="z-0 container">
            <div className="flex my-[120px]">
                <div className=" flex rounded-[8px] max-w-[25%] basis-[25%] w-full bg-white h-[250px] px-[30px] justify-center items-center text-right ">
                    <ul>
                        <li className="mb-[20px] py-[20px] border-b-[1px] border-[#ececec]">
                            <div className="flex w-full h-[60px] justify-center items-center">
                                <div className="max-w-[30%] basis-[30%]">
                                    <Image src={Avatar} className="w-auto min-w-[30px] h-[80%] min-h-[30px] drop-shadow-xl" alt="userprofile" />
                                </div>
                                <div className="max-w-[70%] basis-[70%] py-[10px] pr-[10px]">
                                    <div className="w-full max-h-[50%] basis-[50%] h-full text-[17px] font-[550]">Nguyễn Hoàng Phúc</div>
                                    <div className="w-full max-h-[50%] basis-[50%] h-full text-[13px] text-gray-400">chỉnh sữa thông tin</div>
                                </div>
                            </div>
                            
                        </li>
                        <li className={`${sidebar===0?`${Styles.active}`:""} flex justify-center items-center text-center mb-[10px] mt-[15px]  font-[450] text-[18px] `}>
                            <div onClick={()=>setSidebar(0)}> 
                                Tài khoản của tôi
                            </div>
                        </li>
                        <li className={`${sidebar===1?`${Styles.active}`:""} flex justify-center items-center text-center mb-[10px] mt-[15px]  font-[450] text-[18px] `}>
                            <div onClick={()=>{setSidebar(1) }}>
                                Đơn hàng của tôi
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="max-w-[75%] basis-[75%] w-full ">
                    {sidebar===0?<MyProfile/>:<MyOders/>}
                </div>
            </div>
            
        </div>
    );
}
