import "./Scene.css";

export default function Scene({

id,

children,

className=""

}){

return(

<section

id={id}

className={`scene ${className}`}

>

{children}

</section>

);

}