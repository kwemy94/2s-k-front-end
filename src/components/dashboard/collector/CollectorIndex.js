import { useEffect, useState } from "react";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CollectorEdit from "./CollectorEdit";
import CollectorCreate from "./CollectorCreate";

const CollectorIndex = () => {

  
  const [collecteurs, setCollecteurs] = useState([]);
  const [load, setLoad] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [collecteur, setCollecteur] = useState(false);

  useEffect(() => {
    
  }, [])

  const create = () => {

  //   if(closeModal){
  //     setCloseModal(false)
  //   } 
  //   setCreateForm(!createForm)
  }

  const edit = (collecteur) => {
  //   setCloseModal(!closeModal);
  //   if (createForm) {
  //     setCreateForm(false)
  //   }

  //   setSecteur(secteur);
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

          <div className="container-fluid" id="container-wrapper">
          <ToastContainer />

            {
              closeModal && (<CollectorEdit collecteur={collecteur} setCollecteurs={setCollecteurs} setLoad={setLoad} setCloseModal={setCloseModal} />)
            }
            {
              createForm && (<CollectorCreate  setCollecteurs={setCollecteurs} setLoad={setLoad} setCreateForm={setCreateForm} />)
            }
            <div className="row mb-3">

              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Liste des collecteurs</h6>
                <button className="btn btn-sm btn-success" onClick={()=> create()}><i className="fa fa-plus"></i> Nouveau</button>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Nom  complet</th>
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
                          <td>{collecteur?.name}</td>
                          <td>{collecteur?.locality}</td>
                          <td>

                            <Link to="#" onClick={() => edit(collecteur)} className="btn btn-sm btn-primary"><i className="fa fa-pen"></i></Link>
                            <Link to="#" onClick={(e) => deleteCollector(collecteur?.id)} className="btn btn-sm btn-danger ml-2 "><i className="fa fa-trash"></i></Link>
                          </td>
                        </tr>
                      ))

                    }

                  </tbody>
                </table>
              </div>

            </div>



          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CollectorIndex;