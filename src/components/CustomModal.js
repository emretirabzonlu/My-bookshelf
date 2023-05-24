import React from "react";

const CustomModal = ({title="Hata",message="",onCancel=()=>{},onConfirm=()=>{}})=>{

    return(
        <div style={{position:"absolute",top:"0",left:"0",width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.3)",zIndex:"1000",display:"flex",justifyContent:"center", alignItems:"center", zIndex:"1000"}}>
            <div style={{width:"70%",padding:"20px",backgroundColor:"#fff",borderRadius:"5px"}}>
                <h1 className="text-center">{title}</h1>
                <p className="text-center">{message}</p>
                <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
                    <button onClick={onCancel} className="btn btn-secondary">Vazgeç</button>
                    <button onClick={onConfirm} className="btn btn-danger">Onayla</button>
                </div>
            </div>
        </div>
    )
}

export default CustomModal