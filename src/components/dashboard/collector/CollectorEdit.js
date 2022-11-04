import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CollectorStoreService, CollectorUpdateService } from "../../../service/http/CollectorService";
import { sectorService } from "../../../service/http/sectorService";


const CollectorEdit = (props) => {


    const [name, setName] = useState(props.collecteur.user.name);
    const [sexe, setSexe] = useState(props.collecteur.user.sexe);
    const [cni, setCni] = useState(props.collecteur.user.cni);
    const [phone, setPhone] = useState(props.collecteur.user.phone);
    const [email, setEmail] = useState(props.collecteur.user.email);
    // const [password, setPwd] = useState(props.collecteur.password);
    // const [user_type, setUserType] = useState(1);
    const [sector, setSector] = useState();
    // const [num_comptoir, setNumComptoir] = useState(props.collecteur.num_comptoir);
    // const [registre_commerce, setRegistreCom] = useState(props.collecteur.registre_commerce);
    const [secteurs, setSecteurs] = useState([]);

    useEffect(() => {
        console.log(props.collecteur.sectors);
        props.collecteur.sectors.map((sec, i) => (setSector(sec.id)));
        sectorService().then(res => {
            console.log(res.data.secteurs);
            setSecteurs(res.data.secteurs)
            props.setLoad(false);

        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
        })
        
    }, [])


    const validationForm = () => {

        // if (name !== '' && locality !== '') {
        //   // setLoad(true);
        //   return false
        // } else {
        //   return true
        // }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!window.confirm('Enregistrer les modifications apportées ?')) {
            return true;
        }

        props.setLoad(true);

        const collector = { name, sexe, cni, phone, email, sector};

        CollectorUpdateService(props.collecteur.id, collector).then(res => {
            console.log(res.data);
            if (parseInt(res.status) === 200) {
                props.setCollecteurs(res.data.collectors);
                
                toast.success(res.data.message);
                props.setCloseModal(false);
            }

            props.setLoad(false);
        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
            toast.error('Oups! Erreur survenue');
        })

        // setLoad(false);
    }

    const closeForm = () => {
        props.setCloseModal(false);
    }

    return (
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                        <h6 className="m-0 font-weight-bold text-primary " >Modification des informations</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Nom complet</label>
                                <div className="col-sm-9">
                                    <input type="text" required
                                        value={name}
                                        className="form-control" name='name' id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="sexe" className="col-sm-3 col-form-label">Sexe </label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3" required
                                        value={sexe}
                                        onChange={(e) => setSexe(e.target.value)}>
                                        <option value='0' selected disabled>Choix du sexe</option>
                                        <option value='1'>Feminin</option>
                                        <option value='2'>Masculin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="cni" className="col-sm-3 col-form-label">N° CNI </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                        name="cni" id="cni" placeholder=""
                                        value={cni}
                                        onChange={(e) => setCni(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-sm-3 col-form-label">Téléphone </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" required
                                        name="phone" id="phone" placeholder=""
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email </label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control"
                                        name="email" id="email" placeholder=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <label htmlFor="locality" className="col-sm-3 col-form-label">Secteur de collecte </label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3"
                                        value={sector}
                                        onChange={(e) => setSector(e.target.value)}>
                                        {
                                            secteurs.map((secteur, s1) => (
                                                <option key={s1} value={secteur.id}>{secteur.name}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button className="btn btn-sm btn-danger mr-2" onClick={() => closeForm()}>Fermer</button>
                                    <button type="submit" disabled={validationForm()} className="btn btn-sm btn-primary">Modifier</button>
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

export default CollectorEdit;