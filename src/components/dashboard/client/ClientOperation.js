import React from 'react'

export default function ClientOperation(props) {
  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ color: '#4c60da' }}>
                                        <img className="rounded-circle " src="template/img/man.png" style={{ maxWidth: "60px" }} alt="" />
                                        <h5 className="modal-title ml-3" id="exampleModalCenterTitle" >{props.currentClient.user?.name} </h5>
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
                                                        props.currentClient.accounts?.map((count, ct) => (
                                                            <td key={ct}>{count.account_number}</td>
                                                        ))
                                                    }

                                                </tr>
                                                <tr>
                                                    <td>Solde</td>
                                                    {
                                                        props.currentClient.accounts?.map((count, ct) => (
                                                            <td key={ct} style={{ color: 'green' }} >{count.account_balance} XAF</td>
                                                        ))
                                                    }
                                                </tr>
                                                <tr>
                                                    <td>Montant Opération</td>
                                                    <td><input type='number' className="form-control" onChange={(e) => props.setMontant(e.target.value)} min={'100'} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Retrait</td>
                                                    <td>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" onChange={(e) => props.setRetrait(e.target.checked)} id="customCheck1" />
                                                            <label className="custom-control-label" htmlFor="customCheck1">Cocher</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" onClick={() => props.historiqueClient(props.currentClient)} className="btn btn-info pull-left">Historique</button>
                                        <button type="button" onClick={() => props.operation()} className="btn btn-success">Opération</button>
                                    </div>
                                </div>
                            </div>
                        </div>
  )
}
