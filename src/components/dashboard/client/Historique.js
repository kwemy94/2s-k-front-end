import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './historique.css';
import { accountHistoService } from "../../../service/http/AccountService";

const Historique = (props) => {

    const [data, setData] = useState();

    // récupération du premier jour et du dernier jour du mois en cours
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(lastDay.toLocaleDateString());

    let totalVersememnt = data?.operations?.filter(opt => parseInt(opt.type) === 1).reduce((total, operat) => {
        return total += operat.amount
    }, 0)
    let totalRetrait = data?.operations?.filter(opt => parseInt(opt.type) === -1).reduce((total, operat) => {
        return total += operat.amount
    }, 0)

    useEffect(() => {
        props.setLoad(true)
        accountHistoService(props.client.id).then(res => {
            console.log(res.data.historique);
            setData(res.data.historique);

            toast.success(res.data.message)
            props.setLoad(false);
        }).catch(err => {
            console.log(err.response);

            props.setLoad(false);
        })
    }, []);


    const closeForm = () => {
        console.log(props);
        props.setCloseModal(false);
    }


    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="table-responsive mb-4 ">
                    <div className="entete-historique card-header py-3 d-flex flex-row align-items justify-content-between">

                        <div className="col-lg-5 col-md-5 text-left ">
                            <h6 className="ml-2 font-weight-bold text-primary">Nom : {props.client.user.name} </h6>
                            <h6 className="ml-2 font-weight-bold text-primary">Sexe : {props.client.user.sexe} </h6>
                            <h6 className="ml-2 font-weight-bold text-primary">N° CNI: {props.client.user.cni} </h6>
                        </div>
                        <div className="col-lg-2 col-md-2 text-left ">
                            <img className="rounded-circle " src="template/img/man.png" style={{ maxWidth: "60px" }} alt="" />
                        </div>
                        <div className="col-lg-5 col-md-5 text-left ">
                            <h6 className="ml-2 font-weight-bold text-primary">N° comptoir : {props.client.numero_comptoir} </h6>
                            <h6 className="ml-2 font-weight-bold text-primary">N° registre de commerce : {props.client.numero_registre_de_commerce} </h6>

                        </div>
                    </div>
                    <div className="d-flex  mb-2 mt-2">
                        <div className="col-lg-3 col-md-3 form-group">
                            <label>Date de début</label>
                            <input type='date' className="form-control" 
                            value={lastDay.toLocaleDateString()}
                            //  onChange={(e) => setSearchInput(e.target.value)} 
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 form-group">
                        <label>Date de fin</label>
                            <input type='date' className="form-control" 
                            //  onChange={(e) => setSearchInput(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-sm table-striped  align-items-center table-flush">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Versement</th>
                                    <th scope="col">Retrait</th>
                                    <th scope="col">Solde</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data?.operations?.map((opt, op) => (
                                        <tr key={op}>
                                            <td >{op + 1}</td>
                                            <td>{new Date(opt.created_at).toLocaleDateString()}</td>
                                            {/* {new Date(client?.created_at).toLocaleDateString()} */}
                                            <td>RAS</td>
                                            <td>{parseInt(opt.type) === 1 ? opt.amount : ''} </td>
                                            <td>{parseInt(opt.type) === -1 ? opt.amount : ''} </td>

                                            {
                                                opt.remaining_balance === null
                                                    ? <td> /</td>
                                                    : <>
                                                        {
                                                            parseInt(opt.type) === 1
                                                                ? <td> {parseInt(opt.amount) + parseInt(opt.remaining_balance)} </td>
                                                                : <td> {opt.remaining_balance - parseInt(opt.amount)}</td>

                                                        }
                                                    </>
                                            }

                                        </tr>
                                    ))
                                }

                                <tr>
                                    <td colSpan={'3'}>TOTAL</td>

                                    <td> {totalVersememnt} XAF</td>
                                    <td> {totalRetrait} XAF </td>
                                    <td>{totalVersememnt - totalRetrait} XAF </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className="btn btn-sm btn-danger mr-2 mt-2" onClick={() => closeForm()}>Fermer</button>
                    </div>
                    {/* <button className="btn btn-danger mr-2" onClick={() => closeForm()}>Fermer</button> */}
                </div>
            </div>
        </div>
    );
}

export default Historique;