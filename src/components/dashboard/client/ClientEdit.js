import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { clientUpdateService } from "../../../service/http/ClientService";
import { sectorService } from "../../../service/http/sectorService";


const ClientEdit = (props) => {


    const [name, setName] = useState(props.client.user.name);
    const [sexe, setSexe] = useState(props.client.user?.sexe);
    const [cni, setCni] = useState(props.client.user?.cni);
    const [phone, setPhone] = useState(props.client.user?.phone);
    const [email, setEmail] = useState(props.client.user?.email);
    // const [password, setPwd] = useState();
    // const [user_type, setUserType] = useState(2);
    const [sector, setSector] = useState(props.client.sector_id);
    const [num_comptoir, setNumComptoir] = useState(props.client.numero_comptoir);
    const [registre_commerce, setRegistreCom] = useState(props.client.numero_registre_de_commerce);
    const [secteurs, setSecteurs] = useState([]);

    useEffect(() => {
        console.log(props);
        props.setLoad(true);
        sectorService().then(res => {
            console.log(res.data.secteurs);
            setSecteurs(res.data.secteurs)
            props.setLoad(false);

        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
        })
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!window.confirm('Enregistrer les modifications apportées ?')) {
            return true;
        }
        
        props.setLoad(true);

        const client = {
            name,
            sexe,
            cni,
            phone,
            email,
            'sector_id': sector,
            'numero_comptoir': num_comptoir,
            'numero_registre_de_commerce': registre_commerce
        };

        clientUpdateService(props.client.id, client).then(res => {
            console.log(res.data);
            if (parseInt(res.status) === 200) {
                console.log('ici');
                props.setClients(res.data.clients);

                toast.success(res.data.message);
                props.setCloseModal(false);
            }

            if (res.status === 402) {
                toast.error(res.data.message);
            }

            props.setLoad(false);
        }).catch(err => {
            console.log(err.response);
            props.setLoad(false);
            toast.error(err.response.errors);
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
                        <h6 className="m-0 font-weight-bold text-primary " >Modifier les informations du client</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Nom complet</label>
                                <div className="col-sm-9">
                                    <input type="text" required
                                        className="form-control" name='name' id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
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
                                        name="cni" id="cni" 
                                        value={cni}

                                        onChange={(e) => setCni(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-sm-3 col-form-label">Téléphone </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" required
                                        name="phone" id="phone" 
                                        value={phone}

                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email </label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control"
                                        name="email" id="email" 
                                        value={email}

                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            {/* <div className="form-group row">
                                <label htmlFor="pwd" className="col-sm-3 col-form-label">Mot de passe </label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" required
                                        name="pwd" id="pwd" placeholder=""

                                        onChange={(e) => setPwd(e.target.value)} />
                                </div>
                            </div> */}
                            <div className="form-group row">
                                <label htmlFor="locality" className="col-sm-3 col-form-label">Secteur d'activité' </label>
                                <div className="col-sm-9">
                                    <select className="form-control mb-3" 
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}>
                                        {
                                            secteurs.map((secteur, s1) => (
                                                <option key={s1} value={secteur.id}>{secteur.name}</option>
                                            ))
                                        }
                                        {/* <option value='000' selected disabled>Définir le secteur</option> */}

                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="num_comptoir" className="col-sm-3 col-form-label">N° comptoire </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                        name="num_comptoir" id="num_comptoir" 
                                        value={num_comptoir}

                                        onChange={(e) => setNumComptoir(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="num_com" className="col-sm-3 col-form-label">N° régistre ce commerce </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                        name="num_com" id="num_com" 
                                        value={registre_commerce}

                                        onChange={(e) => setRegistreCom(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button className="btn btn-danger mr-2" onClick={() => closeForm()}>Fermer</button>
                                    <button type="submit"  className="btn btn-primary">Modifier</button>
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

export default ClientEdit;