import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { accountHistoService } from "../../../service/http/AccountService";

const Historique = (props) => {

    const [data, setData] = useState();

    let totalVersememnt = data?.operations?.filter(opt => parseInt(opt.type) === 1).reduce((total,operat)=>{
        return total += operat.amount
    },0)
    let totalRetrait = data?.operations?.filter(opt => parseInt(opt.type) === -1).reduce((total,operat)=>{
        return total += operat.amount
    },0)

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
    }, [])


    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items justify-content-between">
                        
                        <div className="col-lg-6 col-md-6">
                        <h6 className="ml-0 font-weight-bold text-primary">{props.client.user.name} </h6>
                        <h6 className="ml-0 font-weight-bold text-primary">{props.client.user.name} </h6>
                        <h6 className="ml-0 font-weight-bold text-primary">{props.client.user.name} </h6>
                        </div>
                        <div className="col-lg-6 col-md-6">

                        </div>
                    </div>

                    <div className="">
                        <table className="table table-sm table-striped table-dark table-responsive">
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
                                            <td>{parseInt(opt.type) === 1? opt.amount : ''} </td>
                                            <td>{parseInt(opt.type) === -1? opt.amount : ''} </td>

                                            <td> solde </td>
                                        </tr>
                                    ))
                                }

                                <tr>
                                    <td colSpan={'3'}>TOTAL</td>
                                    
                                    <td> {totalVersememnt} XAF</td>
                                    <td> {totalRetrait} XAF </td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Historique;