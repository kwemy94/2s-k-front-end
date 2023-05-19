import { useEffect, useState } from "react";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { clientDeleteService, clientParSecteurService, clientService } from "../../../service/http/ClientService";
import ClientEdit from "./ClientEdit";
import ClientCreate from "./ClientCreate";
import { operationService } from "../../../service/http/OperationService";
import Historique from "./Historique";
import Pagination from "../../pagination/Pagination";
import ClientOperation from "./ClientOperation";
import { printToPDF } from "../../../service/print/PrintPDF";
import axios from "axios";

const ClientIndex = () => {


    const [clients, setClients] = useState([]);
    const [load, setLoad] = useState(true);
    const [closeModal, setCloseModal] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [client, setClient] = useState({});
    const [operationModal, setOperationModal] = useState(false);

    const [currentClient, setCurrentClient] = useState({});
    const [montant, setMontant] = useState(0);
    const [retrait, setRetrait] = useState(false);
    const [reconduction, setReconduction] = useState(false);
    const [histoPage, setHistoPage] = useState(false);

    // serach input
    const [searchInput, setSearchInput] = useState('');

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(4);

    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFistPost = indexOfLastPost - dataPerPage;
    const currentPost = clients.slice(indexOfFistPost, indexOfLastPost)

    const paginate = (numeroPage) => setCurrentPage(numeroPage);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user?.phone);
        clientParSecteurService(user.sector_id).then(res => {
            setClients(res.data.clients);
            console.log(res.data);
            setLoad(false);
        }).catch(err => {
            console.log(err.response);
            toast.error('Oups! Echec de récupération de données');
            setLoad(false);
        })
    }, [])

    const create = () => {

        if (closeModal) {
            setCloseModal(false)
        }
        setCreateForm(!createForm)
    }

    const edit = (client) => {
        setCloseModal(!closeModal);
        if (createForm) {
            setCreateForm(false)
        }

        setClient(client);
    }


    const deleteClient = (id) => {

        if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            clientDeleteService(id).then(res => {
                if (res.data.success) {
                    setClients(res.data.clients);
                    toast.success(res.data.message);
                } else {
                    toast.warning(res.data.message);
                }
            })
        }
    }

    const chooseCLient = (client) => {
        setCurrentClient(client);
        setOperationModal(true);
    }

    const operation = () => {
        console.log(retrait);
        let type = 1;  //type d'operation
        const { accounts, ...autre } = currentClient;
        // console.log(accounts[0]['account_balance']);

        if (retrait && reconduction) {
            toast.error('Oups!! Retrait et reconduction simultané impossible');
            return true;

        }
        if (retrait) {
            if (accounts[0]['account_balance'] - montant < 100) {
                toast.warning('Solde du compte inférieur au montant sollicité');
                return true;
            }
            type = -1;
        }

        if (reconduction) {
            if (accounts[0]['account_balance'] < montant || montant === 0) {
                toast.warning('Solde du compte inférieur au montant à réconduire ou montant null');
                return true;
            }
            type = 0;
        }

        if (montant === 0 || montant === '') {
            toast.warning("Le montant de l'opération ne peut être 0 ou vide");
            return true;
        }
        const authCollector = JSON.parse(localStorage.getItem('user'));
        console.log(authCollector);
        const opt = {
            'amount': parseFloat(montant), type,
            'account_id': accounts[0]['id'],
            'remaining_balance': parseFloat(accounts[0]['account_balance']),
            'collector_id': authCollector.id,
            'sector_id': currentClient.sector_id,
            'phone': JSON.parse(localStorage.getItem('user')).phone,
        }

        // console.log(opt);
        // return

        setLoad(true);
        operationService(opt).then(res => {
            console.log(res.data);
            console.log(res.status);
            if (res.status == 200) {
                setClients(res.data.clients);
                toast.success(res.data.message);
                console.log('St 200h');
            }
            if (res.status === 400) {
                
                toast.danger(res.data.message)
            }

            setLoad(false);
            setMontant('');
            setRetrait(false);
        }).catch(err => {
            console.log(err.response);
            toast.danger(err.response.data.errors)

            setLoad(false);
        })
        document.getElementById("exampleModalCenter").classList.remove("show", "d-block");
        // setOperationModal(false);
    }

    const historiqueClient = (client) => {
        console.log(client);
        setHistoPage(true)

        if (createForm) {
            setCreateForm(false)
        }
        if (closeModal) {
            setCloseModal(false)
        }
        document.getElementById("exampleModalCenter").classList.remove("show", "d-block");

    }

    const dataFilter = currentPost.filter(clientSearch => {

        if (clientSearch.name.toLowerCase().match(searchInput.toLowerCase())) {
            return clientSearch.name.toLowerCase().match(searchInput.toLowerCase())
        }

        if (clientSearch.numero_comptoir.toLowerCase().match(searchInput.toLowerCase())) {
            return clientSearch.numero_comptoir.toLowerCase().match(searchInput.toLowerCase())
        }


    })

    const getPDF = async () => {
        const sector = JSON.parse(localStorage.getItem('user'));
        console.log(sector.sector_id);
        printToPDF(sector.sector_id).then(res => {
            setLoad(true);
            console.log(res.data);
            if (res.status == 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${sector.name}.pdf`);
                document.body.appendChild(link);
                link.click();
            }
            setLoad(false);

        }).catch(err => {
            console.log(err.response);
            toast.danger('Oups! Echec de téléchargent');
        })


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
                            closeModal && (<ClientEdit client={client} setClients={setClients} setLoad={setLoad} setCloseModal={setCloseModal} />)
                        }
                        {
                            createForm && (<ClientCreate setClients={setClients} setLoad={setLoad} setCreateForm={setCreateForm} />)
                        }
                        {
                            histoPage && (<Historique client={currentClient} setLoad={setLoad} setHistoPage={setHistoPage} />)
                        }

                        {
                            closeModal || createForm || histoPage
                                ? <></>
                                :
                                <div className="row mb-3">

                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between mr-4">
                                        <h6 className="m-0 font-weight-bold text-primary">Liste des clients</h6>
                                        <button className="btn btn-sm btn-success" onClick={() => create()}><i className="fa fa-plus"></i> Nouveau</button>
                                    </div>
                                    <div className="d-flex flex-row-reverse mb-2">
                                        <div className="col-lg-4 col-md-4" style={{ display: 'flex', }}>
                                            <button className="btn btn-info btn-sm mb-2" title="Télécharger" onClick={getPDF} style={{ marginRight: '5px' }}><span className=" fas fa-download"></span></button>
                                            <input type='search' className="form-control" placeholder="Nom du client" onChange={(e) => setSearchInput(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="table-responsive">

                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nom  complet</th>
                                                    <th>Téléphone</th>
                                                    <th>Secteur</th>
                                                    <th>N° de compte</th>
                                                    <th>N° de comptoire</th>
                                                    {/* <th>Solde</th> */}
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataFilter.length > 0 
                                                    ?
                                                        dataFilter.map((client, i) => (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>
                                                                    <Link to={'#'}
                                                                        data-toggle="modal"
                                                                        data-target="#exampleModalCenter"
                                                                        id="#modalCenter"
                                                                        onClick={() => chooseCLient(client)}>
                                                                        {client.name}
                                                                    </Link>
                                                                </td>
                                                                <td>{client.phone}</td>
                                                                <td>{client.sector?.locality}</td>
                                                                {/* <td>{client.accounts.account_number}</td> */}
                                                                {
                                                                    client.accounts.length > 0
                                                                        ? client.accounts.map((compte, c) => (
                                                                            <td key={c}>{compte.account_number}</td>
                                                                        ))
                                                                        : <td></td>
                                                                }



                                                                <td>{client.numero_comptoir}</td>
                                                                {/* {
                                                                    client.accounts.length > 0
                                                                        ? client.accounts.map((cpt, c1) => (
                                                                            <td key={c1} style={{ color: 'green' }}>{cpt.account_balance} XAF </td>
                                                                        ))
                                                                        : <td></td>
                                                                } */}
                                                                <td>

                                                                    <Link to="#" onClick={() => edit(client)} className=""><i className="fa fa-pen"></i></Link>
                                                                    {/* <Link to='#' onClick={() => historiqueClient(currentClient)} className="fa fa-eye ml-2"></Link> */}
                                                                    <Link to="#" onClick={() => deleteClient(client.id)} style={{ color: 'red' }}><i className="ml-2 fa fa-trash"></i></Link>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    : 
                                                    <tr >
                                                        <td colSpan={7}>Aucun client enregistré</td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>
                                        <Pagination totalPost={clients.length} dataPerPage={dataPerPage} paginate={paginate} />
                                    </div>

                                </div>
                        }
                        {
                            operationModal &&
                            <ClientOperation
                                operation={operation}
                                historiqueClient={historiqueClient}
                                setRetrait={setRetrait}
                                retrait={retrait}
                                setMontant={setMontant}
                                reconduction={reconduction}
                                setReconduction={setReconduction}
                                montant={montant}
                                setCloseModal={setCloseModal}
                                currentClient={currentClient}
                            />
                        }

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ClientIndex;