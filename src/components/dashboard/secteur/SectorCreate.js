import { useState } from "react";
import { toast } from "react-toastify";
import { sectorStoreService } from "../../../service/http/sectorService"


const SectorCreate = (props) => {

  const [name, setName] = useState('');
  const [locality, setLocality] = useState(''); 

    const validationForm = () => {

        if (name !== '' && locality !== '') {
          // setLoad(true);
          return false
        } else {
          return true
        }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        props.setLoad(true);
    
        const sector = { name, locality };
    
        sectorStoreService(sector).then(res => {
          console.log(res.data);
          if (res.status === 200) {
            props.setSecteurs(res.data.secteurs);
    
            toast(res.data.message); 
            props.setCreateForm(false);
          }
    
          props.setLoad(false);
        }).catch(err => {
          console.log(err.response);
          props.setLoad(false);
        })
    
        // setLoad(false);
      }

    return (
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                        <h6 className="m-0 font-weight-bold text-primary " >Créer un secteur</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Nom du secteur</label>
                                <div className="col-sm-9">
                                    <input type="text"
                                        className="form-control" name='name' id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex Secteur 3" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="locality" className="col-sm-3 col-form-label">Lacolité </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"
                                        name="locality" id="locality" placeholder="Ex: Marché Nfoundi"
                                        
                                        onChange={(e) => setLocality(e.target.value)} />
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" disabled={validationForm()} className="btn btn-sm btn-primary">Enregistrer</button>
                                    <button type="reset"  className="btn btn-sm btn-secondary ml-2">Annuler</button>
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

export default SectorCreate;