import { useEffect } from "react";


const ClientEdit = (props) => {

    useEffect(()=> {
        console.log('ddd' +props);
    });

    return (
        <p>texte Edited</p>
    );
}

export default ClientEdit