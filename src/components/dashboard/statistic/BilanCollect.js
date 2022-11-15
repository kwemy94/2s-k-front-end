import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sectorService } from '../../../service/http/sectorService'
import { statisticService } from '../../../service/http/statisticService'
import Loader from '../../../service/Loader'
import Footer from './../Footer'
import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import moment from  'moment'

const Test = (props) => {
    return (<>
        <h3>test de retour</h3>
        <div className='card'>
            <div className='card-header'>Mon header</div>
            {props.children}
        </div>
    </>)
}

const BilanCollect = () => {
    const [secteur, setSecteur] = useState();
    const [showBilan, setShowBilan] = useState(false);
    const [secteurs, setSecteurs] = useState([]);
    const [load, setLoad] = useState(true);

    // récupération du premier jour et du dernier jour du mois en cours
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
    // console.log(firstDay.format('YYYY-MM-DD'));

    const [start_date, setStartDate] = useState(firstDay);
    const [end_date, setEndDate] = useState(lastDay);
    const [currentSector, setCurrentSector] = useState(null);
    const [validateFilter, setValidatefilter] = useState(false);
    const [currentClients, setCurrentClients] = useState();
    const [currentOperations, setCurrentOperations] = useState();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5);

    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFistPost = indexOfLastPost - dataPerPage;
    const currentPost = secteurs.slice(indexOfFistPost, indexOfLastPost)

    const paginate = (numeroPage) => setCurrentPage(numeroPage);

    useEffect(() => {
        statisticService().then(res => {
            console.log(res.data);
            localStorage.setItem('clients', JSON.stringify(res.data.clients))
            localStorage.setItem('secteurs', JSON.stringify(res.data.secteurs))
            localStorage.setItem('operations', JSON.stringify(res.data.operations))
            setSecteurs(res.data.secteurs)
            setLoad(false);

        }).catch(err => {
            console.log(err.response);
            setLoad(false);
        })
    }, []);

    useEffect(() => {
        displayData();
    }, [currentSector, start_date, end_date])

    const validateDataFilter = () => {
        if (start_date && end_date && currentSector) {
            setValidatefilter(true);
        }

    }

    const displayData = () => {
        const clients = JSON.parse(localStorage.getItem('clients'));
        const sector = secteurs?.filter((secteur) => parseInt(secteur.id) === parseInt(currentSector))


        const dataClients = clients.filter((client) => parseInt(client.sector_id) === parseInt(currentSector));
        console.log(dataClients);
        setCurrentClients(dataClients)

        const operations = JSON.parse(localStorage.getItem('operations'));
        console.log(new Date(start_date).getTime());
        console.log(new Date(end_date).getTime());
        let d1 = moment(new Date(start_date)).format('YYYY-MM-DD');
        let d2 = moment(new Date(end_date)).format('YYYY-MM-DD');

        // const dataOperations = operations?.filter((operation) =>
        //     new Date(start_date).getTime() <= new Date(operation.created_at).getTime()
        //     && (new Date(operation.created_at).getTime()) <= (new Date(end_date).getTime())
        //     && parseInt(operation.collector_id) === parseInt(sector[0]?.collectors[0]?.id)
        // );
        const dataOperations = operations?.filter((operation) =>
            new Date(d1) <= new Date(operation.created_at)
            && moment(new Date(operation.created_at)) <= new Date(d2)
            && parseInt(operation.collector_id) === parseInt(sector[0]?.collectors[0]?.id)
        );
        console.log(dataOperations);
        setCurrentOperations(dataOperations);


        console.log(sector);
    }



    const handleStartDateChange = (e) => {
        console.log(e.target.value);
        console.log(new Date(e.target.value).getTime());
        console.log(firstDay);
    }



    return (
        <div id="wrapper">


            <Sidebar />
            <Loader loading={load} />


            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">


                    <Navbar />

                    <div className="container-fluid" id="container-wrapper">

                        {
                            !showBilan
                                ? <div className="row mb-3">

                                    <div className="card-header py-3  flex-row align-items-center ">
                                        <h6 className="ml-4 font-weight-bold text-primary" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Selectionner le secteur</h6>
                                        {/* <button className="btn btn-sm btn-success" onClick={() => create()}><i className="fa fa-plus"></i> Nouveau</button> */}
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table ">
                                            <tbody>
                                                <tr>
                                                    <td>Secteur</td>
                                                    <td>
                                                        <select className="" required onChange={(e) => setCurrentSector(e.target.value)} >
                                                            {
                                                                secteurs.map((secteur, i) => (
                                                                    <option value={secteur.id}>{secteur.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td>Date de début</td>
                                                    <td>
                                                        <input type="date" name="start_date" onChange={(e) => setStartDate(e.target.value)} />
                                                        {/* <input type="date" name="start_date" onChange={(e) => handleStartDateChange(e)} /> */}
                                                    </td>
                                                    <td>Date de fin</td>
                                                    <td>
                                                        <input type="date" name="end_date" onChange={(e) => setEndDate(e.target.value)} />
                                                    </td>

                                                </tr>
                                            </tbody>

                                        </table>
                                        <button className='btn btn-sm btn-success' onClick={() => validateDataFilter()}>Search</button>
                                        {/* <Pagination totalPost={secteurs.length} dataPerPage={dataPerPage} paginate={paginate} /> */}
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nom </th>
                                                    <th>N° compte</th>
                                                    <th>Reconduction</th>
                                                    <th>Versement (current month)</th>
                                                    <th>Solde</th>
                                                    <th>Retrait</th>
                                                    <th>Commission</th>
                                                    <th>Net à payer</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                     currentClients?.length > 0 ?
                                                    currentClients?.map((client, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1} </td>
                                                            <td>{client.user.name} </td>
                                                            <td>{client.accounts[0]?.account_number} </td>
                                                            <td>12000</td>
                                                            <td>
                                                                {
                                                                    currentOperations?.filter((operation) => (
                                                                        parseInt(operation.type) === 1 && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                    ))
                                                                        ?.reduce((som, operation) => {
                                                                            return som += parseInt(operation?.amount);
                                                                        }, 0)
                                                                }
                                                            </td>
                                                            <td>{client.accounts[0]?.account_balance}</td>
                                                            <td>
                                                                {
                                                                    currentOperations?.filter(operation =>
                                                                        parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                        && parseInt(operation.type) === -1
                                                                    ).reduce((som, operation) => {
                                                                        return som += operation.amount;
                                                                    }, 0)
                                                                }
                                                            </td>
                                                            <td>xx</td>
                                                            <td>yy</td>
                                                            <td>
                                                                <Link to='#'>
                                                                    <i className='fas fa-pen'></i>
                                                                </Link>
                                                                <Link to='#' className='ml-2' style={{ color: 'green' }}>
                                                                    <i className='fa fa-check' title='valider'></i>
                                                                </Link>


                                                            </td>
                                                        </tr>
                                                    ))
                                                    : ''
                                                }
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                : <>
                                    <Test>
                                        <div className='card-title'>Mon titre</div>
                                        <div className='card-title'>Body card</div>
                                    </Test>
                                </>
                        }




                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default BilanCollect
