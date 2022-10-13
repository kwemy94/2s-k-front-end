import { useEffect, useState } from "react";
import { sectorService, sectorShowService } from "../../../service/http/sectorService";

const SectorShow = (props) => {

    const [clients, setClients] = useState([]);
    //   const [load, setLoad] = useState(true);
    //   const [closeModal, setCloseModal] = useState(false);
    //   const [createForm, setCreateForm] = useState(false);
    // const [id, setId] = useState();
    const [secteur, setSecteur] = useState();

    useEffect(() => {
        props.setLoad(true)
        console.log(props.secteur);
        sectorShowService(props.secteur.id).then(res => {
            console.log(res.data.clients);

            if (parseInt(res.status) === 200) {
                setSecteur(res.data.secteur)
                setClients(res.data.clients)
            }

            props.setLoad(false);

        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
        })
    }, [])



    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Clients {secteur?.name} : {secteur?.locality} </h6>
                    </div>
                    <div className="table-responsive p-3">
                        <table className="table align-items-center table-flush" id="myTable">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nom complet</th>
                                    <th>N° compte</th>
                                    <th>Date d'ouverture</th>
                                    <th>Solde</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    clients?.length > 0
                                        ? clients.map((client, i) => (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{client.user.name}</td>
                                                {
                                                    client.accounts.map((count,c)=> (
                                                        <td key={c}>{count.account_number}</td>
                                                    ))
                                                }
                                                {/* <td>compte</td> */}
                                                <td>{new Date(client?.created_at).toLocaleDateString()}</td>
                                                {
                                                    client.accounts.map((count,c)=> (
                                                        <td key={c}>{count.account_balance} XAF</td>
                                                    ))
                                                }
                                            </tr>
                                        ))

                                        : <tr><td>Pas de client enregistré !</td></tr>
                                }
                                

                            </tbody>
                        </table>
                        <button className='btn btn-danger' onClick={()=>props.setShowSector(false)}> Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectorShow;