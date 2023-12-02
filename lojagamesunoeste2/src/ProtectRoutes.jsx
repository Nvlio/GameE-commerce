import { Navigate, Outlet } from "react-router-dom";
import { CheckAuteticacao } from "./funcoes/Autenticar.jsx";
import { useEffect, useState } from "react";

export default  function ProtectRoute() {
    const autenticacao = CheckAuteticacao()
    console.log('a autenticação é ',autenticacao)
    return autenticacao? (<Outlet />) : (<Navigate to={"/UserLogCad"} />)
}