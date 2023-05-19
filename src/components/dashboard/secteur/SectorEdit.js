import { useEffect, useState } from "react";
import { sectorUpdateService } from "../../../service/http/sectorService";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const SectorEdit = (props) => {

    const [name, setName] = useState(props.secteur.name);
    const [locality, setLocality] = useState(props.secteur.locality);
    const [collector, setCollector] = useState(props.secteur.collector_id);
    // const [loading, set] = useState(props.secteur.locality);


    const validationForm = () => {


        if (name !== '' && locality !== '') {
            // setLoading(true);
            return false
        } else {
            return true
        }
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        props.setLoad(true);

        const sector = { name, locality, 'collector_id': collector };

        sectorUpdateService(props.secteur.id, sector).then(res => {
            console.log(res.data);
            props.setSecteurs(res.data.secteurs);
            props.setLoad(false);
            props.setCloseModal(prev => !prev)

            toast.success(res.data.message);

        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
            toast.error('Oups! Erreur de mise à jour')
        })

    }

    const closeForm = () => {
        props.setCloseModal(true);
    }


    return (
        // <div className="" tabIndex="-1" role="dialog">
        //     <div className="modal-dialog" role="document">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <h5 className="modal-title " style={{ textAlign: "center" }} id="secteurModalLabel">Créer un nouveau secteur</h5>
        //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //                     <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div className="modal-body">
        //                 <form onSubmit={handleUpdate}>
        //                     <div className="form-group row">
        //                         <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Nom du secteur</label>
        //                         <div className="col-sm-9">
        //                             <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="sectorName" placeholder="Secteur 2b" />

        //                         </div>

        //                     </div>
        //                     <div className="form-group row">
        //                         <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Localité</label>
        //                         <div className="col-sm-9">
        //                             <input type="text" className="form-control" value={locality} onChange={(e) => setLocality(e.target.value)} id="locality" placeholder="Marché Foto" />

        //                         </div>

        //                     </div>

        //                     <div className="form-group row pull-right">
        //                         <div className="col-sm-10">
        //                             <button type="reset" className="btn btn-secondary mr-2">Reset</button>
        //                             <button type="submit" disabled={validationForm()} className="btn btn-primary"  >Enregistrer</button>
        //                             {/* <span className="ml-3 text-success text-center"  ><strong></strong> </span> */}
        //                         </div>

        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                        <h6 className="m-0 font-weight-bold text-primary">Modifier les informations du secteur</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Nom du secteur</label>
                                <div className="col-sm-9">
                                    <input type="text"
                                        className="form-control" name='name' id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex Secteur 3" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="locality" className="col-sm-3 col-form-label">Lacolité </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                        name="locality" id="locality" placeholder="Ex: Marché Nfoundi"
                                        value={locality}
                                        onChange={(e) => setLocality(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="sexe" className="col-sm-3 col-form-label">Collecteur <span style={{ color: 'red' }}>*</span></label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3" required 
                                    onChange={(e)=> setCollector(e.target.value)}
                                    value={collector}>
                                        {
                                            props.collectors?.map((coll,i) => (
                                                <option key={i} value={coll.id}> {coll.name} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-10">
                                {/* <button  className="fa fa-times mr-2" style={{color: 'red'}} onClick={() => closeForm()}> Fermer</button> */}
                                    <button type="submit" disabled={validationForm()} className="btn btn-sm btn-primary">Enregistrer</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-3"></div>

        </div>
    );
}

export default SectorEdit;