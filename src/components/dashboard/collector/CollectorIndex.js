import { useEffect, useRef, useState } from "react";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import CollectorEdit from "./CollectorEdit";
import CollectorCreate from "./CollectorCreate";
import { CollectorService } from "../../../service/http/CollectorService";
import Printing from "../../../service/print/Printing";

const CollectorIndex = () => {

  /* impression*/
  const componentRef = useRef();

  const [collecteurs, setCollecteurs] = useState([]);
  const [load, setLoad] = useState(true);
  const [closeModal, setCloseModal] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [collecteur, setCollecteur] = useState({});

  useEffect(() => {
    CollectorService().then(res => {
      setCollecteurs(res.data.collectors);
      console.log(res.data.collectors);
      console.log(res.data.collectors);
      setLoad(false);
    }).catch(err => {
      console.log(err.response);
      toast.error('Oups! Echec de récupération de données');
      setLoad(false);
    })
  }, [])

  const create = () => {

      if(closeModal){
        setCloseModal(false)
      } 
      setCreateForm(!createForm)
  }

  const edit = (collecteur) => {
      setCloseModal(!closeModal);
      if (createForm) {
        setCreateForm(false)
      }

      setCollecteur(collecteur);
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

          <div className="container-fluid" id="container-wrapper"  >
            

            {
              closeModal && (<CollectorEdit collecteur={collecteur} setCollecteurs={setCollecteurs} setLoad={setLoad} setCloseModal={setCloseModal} />)
            }
            {
              createForm && (<CollectorCreate setCollecteurs={setCollecteurs} setLoad={setLoad} setCreateForm={setCreateForm} />)
            }

            {
              closeModal || createForm
              ? <></>
              : 
              <div className="row mb-3">

              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between mr-4">
                <h6 className="m-0 font-weight-bold text-primary">Liste des collecteurs</h6>
                <Printing componentRef={componentRef} />
                <button className="btn btn-sm btn-success" onClick={() => create()}><i className="fa fa-plus"></i> Nouveau</button>
              </div>
              <div className="table-responsive" ref={componentRef}>
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Nom  complet</th>
                      <th>Matricule</th>
                      <th>zone de collecte</th>
                      <th>Téléphone</th>
                      <th>N° CNI</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      collecteurs.map((collecteur, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{collecteur.user.name}</td>
                          <td>{collecteur.registration_number}</td>
                          <td>{
                            (collecteur.sectors)? collecteur.sectors.map((sector, s1) => (
                                <span key={s1}>{sector.name}</span>
                              )) : ''}
                          </td>                        
                          {/* {
                            collecteur.sectors 
                              ?
                              collecteur.sectors.map((sector, s1) => (
                                <td key={s1}>{sector.name}</td>
                              ))
                              : <td></td>
                          } */}

                          <td>{collecteur.user.phone}</td>
                          <td>{collecteur.user.cni}</td>
                          <td>

                            <Link to="#" /* onClick={() => show(collecteur)} */ ><i className="fa fa-eye"></i></Link>
                            <Link to="#" onClick={() => edit(collecteur)} ><i className="fa fa-pen"></i></Link>
                            <Link to="#" onClick={(e) => deleteCollector(collecteur?.id)} className="ml-2" style={{color: 'red'}}><i className="fa fa-trash"></i></Link>
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

export default CollectorIndex;