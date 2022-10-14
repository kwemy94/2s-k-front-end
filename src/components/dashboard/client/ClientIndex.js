import { useEffect, useState } from "react";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { clientDeleteService, clientService } from "../../../service/http/ClientService";
import ClientEdit from "./ClientEdit";
import ClientCreate from "./ClientCreate";
import { operationService } from "../../../service/http/OperationService";
import Historique from "./Historique";

const ClientIndex = () => {


    const [clients, setClients] = useState([]);
    const [load, setLoad] = useState(true);
    const [closeModal, setCloseModal] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [client, setClient] = useState({});

    const [currentClient, setCurrentClient] = useState({});
    const [montant, setMontant] = useState(0);
    const [retrait, setRetrait] = useState(false);
    const [histoPage, setHistoPage] = useState(false);

    useEffect(() => {
        clientService().then(res => {
            setClients(res.data.clients);
            console.log(res.data.clients);
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


    const operation = () => {
        console.log(retrait);
        let type = 1;  //type d'operation
        const { accounts, ...autre } = currentClient;
        // console.log(accounts[0]['account_balance']);

        if (retrait) {

            if (accounts[0]['account_balance'] - montant < 100) {
                toast.warning('Solde du compte inférieur au montant sollicité');
                return true;
            }

            type = -1;
        }

        if (montant === 0) {
            toast.warning("Le montant de l'opération ne peut être 0 ou vide");
            return true;
        }
        const authCollector = JSON.parse(localStorage.getItem('user'));
        console.log(authCollector); 
        const opt = { 'amount': parseFloat(montant), type, 'account_id': accounts[0]['id'], 'collector_id': authCollector.id}

        setLoad(true);
        operationService(opt).then(res=> {
            console.log(res.data);
            if (res.status === 200) {
                setClients(res.data.clients)
                // setMontant(0);
                // setRetrait(false);
                toast.success(res.data.message)
            }

            setLoad(false);
        }).catch(err => {
            console.log(err.response);
            toast.danger(err.response.data.errors)

            setLoad(false);
        })
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
                                                    clients.map((client, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>
                                                                <Link to={'#'}
                                                                    data-toggle="modal"
                                                                    data-target="#exampleModalCenter"
                                                                    id="#modalCenter"
                                                                    onClick={() => setCurrentClient(client)}>
                                                                    {client.user.name}
                                                                </Link>
                                                            </td>
                                                            <td>{client.user.phone}</td>
                                                            <td>{client.sector.locality}</td>
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
                                                                <Link to="#" onClick={() => deleteClient(client.id)} style={{ color: 'red' }}><i className="ml-2 fa fa-trash"></i></Link>

                                                            </td>
                                                        </tr>
                                                    ))

                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                        }


                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ color: '#4c60da' }}>
                                        <img className="rounded-circle " src="template/img/man.png" style={{ maxWidth: "60px" }} alt="" />
                                        <h5 className="modal-title ml-3" id="exampleModalCenterTitle" >{currentClient.user?.name} </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-dark">

                                            <tbody>
                                                <tr>
                                                    <td>N° compte</td>
                                                    {
                                                        currentClient.accounts?.map((count, ct) => (
                                                            <td key={ct}>{count.account_number}</td>
                                                        ))
                                                    }

                                                </tr>
                                                <tr>
                                                    <td>Solde</td>
                                                    {
                                                        currentClient.accounts?.map((count, ct) => (
                                                            <td key={ct}>{count.account_balance}</td>
                                                        ))
                                                    }
                                                </tr>
                                                <tr>
                                                    <td>Montant Opération</td>
                                                    <td><input type='number' className="form-control" onChange={(e) => setMontant(e.target.value)} min={'100'} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Retrait</td>
                                                    <td>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" onChange={(e) => setRetrait(e.target.checked)} id="customCheck1" />
                                                            <label className="custom-control-label" htmlFor="customCheck1">Cocher</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" onClick={() => historiqueClient(currentClient)} className="btn btn-info pull-left">Historique</button>
                                        <button type="button" onClick={() => operation()} className="btn btn-success">Opération</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ClientIndex;