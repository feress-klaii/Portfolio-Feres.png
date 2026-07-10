import { useEffect, useState } from "react";

export default function useParallax(){

    const[position,setPosition]=useState({x:0,y:0});

    useEffect(()=>{

        function move(e){

            const x=(e.clientX/window.innerWidth-.5)*2;

            const y=(e.clientY/window.innerHeight-.5)*2;

            setPosition({x,y});

        }

        window.addEventListener("mousemove",move);

        return()=>window.removeEventListener("mousemove",move);

    },[]);

    return position;

}