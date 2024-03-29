import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sectorService } from '../../../service/http/sectorService'
import { statisticService } from '../../../service/http/statisticService'
import Loader from '../../../service/Loader'
import Footer from './../Footer'
import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import moment from 'moment'
import Printing from '../../../service/print/Printing'


const BilanSector = () => {
    /* impression ref */
    const componentRef = useRef();
    let today = new Date();
    let printHour = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ', ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
       
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
    const [currentCollector, setCurrentCollector] = useState(null);
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


        setCurrentCollector(JSON.parse(localStorage.getItem('collector')));
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
        const sector = secteurs?.filter((secteur) => parseInt(secteur.id) === parseInt(currentCollector?.sectors[0]?.id))


        const dataClients = clients?.filter((client) => parseInt(client.sector_id) === parseInt(currentCollector?.sectors[0]?.id));
        console.log(dataClients);
        setCurrentClients(dataClients)

        const operations = JSON.parse(localStorage.getItem('operations'));
        console.log(new Date(start_date).getTime());
        console.log(new Date(end_date).getTime());
        let d1 = moment(new Date(start_date)).format('YYYY-MM-DD');
        let d2 = moment(new Date(end_date)).format('YYYY-MM-DD');
        console.log(d1, d2);

        // const dataOperations = operations?.filter((operation) =>
        //     new Date(start_date).getTime() <= new Date(operation.created_at).getTime()
        //     && (new Date(operation.created_at).getTime()) <= (new Date(end_date).getTime())
        //     && parseInt(operation.collector_id) === parseInt(sector[0]?.collectors[0]?.id)
        // );
        const dataOperations = operations?.filter((operation) =>
            new Date(d1) <= new Date(operation.created_at)
            && moment(new Date(operation.created_at)) <= new Date(d2)
            && parseInt(operation.collector_id) === parseInt(currentCollector?.id)
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
                                ? <div className="row mb-3" >
                                    <div className='col-lg-5 col-md-5'></div>
                                    <div className='col-lg-2 col-md-2' >
                                    <Printing componentRef={componentRef} />
                                    </div>
                                    <div className='col-lg-5 col-md-5'></div>


                                    <div className="table-responsive">
                                        <table className="table ">
                                            <tbody>
                                                <tr>
                                                    <td>Secteur</td>
                                                    <td>
                                                        <select className="" required onChange={(e) => setCurrentSector(e.target.value)} disabled>
                                                            <option value={currentCollector?.sectors[0]?.id}>{currentCollector?.sectors[0]?.name}</option>
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
                                        <div className="card-header py-3  flex-row align-items-center " ref={componentRef}>
                                            <h6 className="ml-4 font-weight-bold text-primary" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Statistique du secteur</h6>
                                            <table className="table align-items-center table-flush">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nom </th>
                                                        <th>N° compte</th>
                                                        <th>Reconduction</th>
                                                        <th>Versement (current month)</th>
                                                        <th>Total coll</th>
                                                        <th>Retrait</th>
                                                        <th>Commission</th>
                                                        <th>Net à payer</th>
                                                        <th>S. Compte</th>
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
                                                                    {/* recherche du montant reconduit mois précédent (ce montant est un versement du mois en cours) */}
                                                                    <td>
                                                                        {
                                                                            currentOperations?.filter((operation, i) =>
                                                                            (
                                                                                parseInt(operation.type) === 0
                                                                                && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                            )
                                                                            )?.reduce((som, operation) => {
                                                                                return som += parseInt(operation?.amount);
                                                                            }, 0)

                                                                        }
                                                                    </td>
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
                                                                    <td style={{color: 'blue', fontWeight: 'bold'}}>
                                                                        {
                                                                            currentOperations?.filter((operation) => (
                                                                                (parseInt(operation.type) === 1 || parseInt(operation.type) === -1)
                                                                                && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                            ))
                                                                                ?.reduce((som, operation) => {
                                                                                    if (parseInt(operation.type) === 1) {
                                                                                        som = parseInt(operation?.amount) + parseInt(operation?.remaining_balance);
                                                                                    } else {
                                                                                       som = parseInt(operation?.remaining_balance) - parseInt(operation?.amount);
                                                                                    }
                                                                                    return som;
                                                                                }, 0)
                                                                        }
                                                                    </td>
                                                                    <td style={{color: 'red', fontWeight: 'bold'}}>
                                                                        {
                                                                            currentOperations?.filter(operation =>
                                                                                parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                                && parseInt(operation.type) === -1
                                                                            ).reduce((som, operation) => {
                                                                                return som += operation.amount;
                                                                            }, 0)
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            currentOperations?.filter((operation) => (
                                                                                parseInt(operation.type) === 1 && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                            ))
                                                                                ?.reduce((som, operation) => {
                                                                                    return som += parseInt(operation?.amount);
                                                                                }, 0) > 0

                                                                                &&

                                                                                currentOperations?.filter((operation) => (
                                                                                    parseInt(operation.type) === 1 && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                                ))
                                                                                    ?.reduce((som, operation) => {
                                                                                        return som += parseInt(operation?.amount);
                                                                                    }, 0) <= 15000

                                                                                ? 500

                                                                                :
                                                                                currentOperations?.filter((operation) => (
                                                                                    parseInt(operation.type) === 1 && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                                ))
                                                                                    ?.reduce((som, operation) => {
                                                                                        return som += parseInt(operation?.amount);
                                                                                    }, 0) > 15000

                                                                                    ?
                                                                                    currentOperations?.filter((operation) => (
                                                                                        parseInt(operation.type) === 1 && parseInt(operation.account_id) === parseInt(client.accounts[0]?.id)
                                                                                    ))
                                                                                        ?.reduce((som, operation) => {
                                                                                            return som += parseInt(operation?.amount);
                                                                                        }, 0) * 0.03 + 100

                                                                                    : ''
                                                                        }
                                                                    </td>
                                                                    <td style={{color: 'black', fontWeight: 'bold'}}>yy</td>
                                                                    <td>{client.accounts[0]?.account_balance}</td>
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
                                                            : <tr></tr>
                                                    }
                                                </tbody>
                                            </table>
                                            <div >{printHour} </div>
                                        </div>


                                    </div>

                                </div>

                                : <></>
                        }

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default BilanSector
