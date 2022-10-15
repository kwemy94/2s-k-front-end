import React from 'react'

const Pagination = ({dataPerPage, totalPost, paginate}) => {

    const numeroPage = [];

    for (let i = 1; i <= Math.ceil(totalPost/dataPerPage); i++) {
        numeroPage.push(i);
        
    }

  return (
    <nav>
        <ul className='pagination'>
            {
                numeroPage.map(nbre => (
                    <li className='list-item' key={nbre}>
                        <i  onClick={()=>paginate(nbre)} className='page-link'>{nbre} </i>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Pagination;
