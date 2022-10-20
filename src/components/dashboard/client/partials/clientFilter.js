import React from 'react'

function clientFilter(props) {
    const dataFilter = props.currentPost?.filter(clientSearch => {

        if (clientSearch.user.name.toLowerCase().match(props.searchInput.toLowerCase())) {
            return clientSearch.user.name.toLowerCase().match(props.searchInput.toLowerCase())
        }

        if (clientSearch.numero_comptoir.toLowerCase().match(props.searchInput.toLowerCase())) {
            return clientSearch.numero_comptoir.toLowerCase().match(props.searchInput.toLowerCase())   
        }
       

    })
}

export default clientFilter
