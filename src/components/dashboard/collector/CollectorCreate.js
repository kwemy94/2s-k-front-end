import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CollectorStoreService } from "../../../service/http/CollectorService";
import { sectorService } from "../../../service/http/sectorService";


const CollectorCreate = (props) => {


    const [name, setName] = useState();
    const [sexe, setSexe] = useState();
    const [cni, setCni] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    // const [password, setPwd] = useState();
    const [user_type, setUserType] = useState(1);
    const [sector, setSector] = useState();
    const [roles, setRoles] = useState([]);

    const [secteurs, setSecteurs] = useState([]);

    useEffect(() => {
        sectorService().then(res => {
            console.log(res.data.secteurs);
            setSecteurs(res.data.secteurs)
            setRoles(res.data.roles)
            props.setLoad(false);

        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
        })
    },[])


    const validationForm = () => {

        // if (name !== '' && locality !== '') {
        //   // setLoad(true);
        //   return false
        // } else {
        //   return true
        // }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setLoad(true);

        const role = roles.filter(role => role.name === 'collector').map(role => (role.id));
        console.log(role[0]);

        const collector = { name, sexe,  cni,   phone,  email, user_type,  sector, 'role_id': role[0]};

        CollectorStoreService(collector).then(res => {
          console.log(res.data);
          if (res.status === 200) {
            props.setCollecteurs(res.data.collectors);

            toast.success(res.data.message); 
            props.setCreateForm(false);
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
        // props.setCloseModal(false);
    }

    return (
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                        <h6 className="m-0 font-weight-bold text-primary " >Créer un Collecteur</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Nom complet</label>
                                <div className="col-sm-9">
                                    <input type="text" required
                                        className="form-control" name='name' id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="sexe" className="col-sm-3 col-form-label">Sexe </label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3" required onChange={(e) => setSexe(e.target.value)}>
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

                                        onChange={(e) => setCni(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-sm-3 col-form-label">Téléphone </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" required
                                        name="phone" id="phone" placeholder=""

                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email </label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control"
                                        name="email" id="email" placeholder=""

                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="locality" className="col-sm-3 col-form-label">Secteur de collecte </label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3" onChange={(e) => setSector(e.target.value)}>
                                        {
                                            secteurs.map((secteur, s1) => ( 
                                                <option key={s1} value={secteur.id}>{secteur.name}</option>
                                            ))
                                        }
                                        <option value='000' selected disabled>Définir le secteur</option>
                                       
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button  className="btn btn-danger mr-2" onClick={()=>closeForm()}>Fermer</button>
                                    <button type="submit" disabled={validationForm()} className="btn btn-primary">Enregistrer</button>
                                    <button type="reset" className="btn btn-secondary ml-2">Annuler</button>
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

export default CollectorCreate;