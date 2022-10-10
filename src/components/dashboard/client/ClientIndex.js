import { useEffect, useState } from "react";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { clientService } from "../../../service/http/ClientService";
import ClientEdit from "./ClientEdit";
import ClientCreate from "./ClientCreate";

const ClientIndex = () => {


    const [clients, setClients] = useState([]);
    const [load, setLoad] = useState(true);
    const [closeModal, setCloseModal] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [client, setClient] = useState({});

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

    const deleteCollector = (collecteur) => {
        //   setCloseModal(!closeModal);
        //   if (createForm) {
        //     setCreateForm(false)
        //   }

        //   setSecteur(secteur);
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
                            createForm && (<ClientCreate setCollecteurs={setClients} setLoad={setLoad} setCreateForm={setCreateForm} />)
                        }

                        {
                            closeModal || createForm
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
                                                    <th>Registre de commerce</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    clients.map((client, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{client.user.name}</td>
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
                                                            <td>{client.numero_registre_de_commerce}</td>
                                                            <td>

                                                                <Link to="#" onClick={() => edit(client)} className="btn btn-sm btn-primary"><i className="fa fa-pen"></i></Link>
                                                                <Link to="#" onClick={(e) => deleteCollector(client?.id)} className="btn btn-sm btn-danger ml-2 "><i className="fa fa-trash"></i></Link>
                                                            </td>
                                                        </tr>
                                                    ))

                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                        }




                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ClientIndex;