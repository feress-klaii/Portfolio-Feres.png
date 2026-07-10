import { useEffect, useState } from "react";

export default function useScrollProgress() {

    const [progress,setProgress]=useState(0);

    useEffect(()=>{

        function update(){

            const max=document.documentElement.scrollHeight-window.innerHeight;

            setProgress(window.scrollY/max);

        }

        update();

        window.addEventListener("scroll",update,{passive:true});

        window.addEventListener("resize",update);

        return()=>{

            window.removeEventListener("scroll",update);

            window.removeEventListener("resize",update);

        }

    },[]);

    return progress;

}