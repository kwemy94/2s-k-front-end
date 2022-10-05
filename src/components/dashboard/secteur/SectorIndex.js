import { useEffect, useState } from "react";
import { sectorService } from "../../../service/http/sectorService";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { sectorStoreService } from "../../../service/http/sectorService";
import { Link } from "react-router-dom";
import SectorEdit from "./SectorEdit";
import { ToastContainer, toast } from 'react-toastify';
import SectorCreate from "./SectorCreate";
import { create } from "yup/lib/Reference";

const Sector = () => {

  const [secteurs, setSecteurs] = useState([]);
  const [load, setLoad] = useState(true);
  const [closeModal, setCloseModal] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  // const [id, setId] = useState();
  const [secteur, setSecteur] = useState();

  useEffect(() => {
    sectorService().then(res => {
      console.log(res.data.secteurs);
      setSecteurs(res.data.secteurs)
      setLoad(false);

    }).catch(err => {
      console.log(err.response);
      setLoad(false);
    })
  }, [])

  const create = () => {

    if(closeModal){
      setCloseModal(false)
    } 
    setCreateForm(!createForm)
  }

  const edit = (secteur) => {
    setCloseModal(!closeModal);
    if (createForm) {
      setCreateForm(false)
    }

    setSecteur(secteur);
  }

  const deleteSector = (id) => {

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
              closeModal && (<SectorEdit secteur={secteur} setSecteurs={setSecteurs} setLoad={setLoad} setCloseModal={setCloseModal} />)
            }
            {
              createForm && (<SectorCreate  setSecteurs={setSecteurs} setLoad={setLoad} setCreateForm={setCreateForm} />)
            }
            <div className="row mb-3">

              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Liste des secteurs</h6>
                <button className="btn btn-sm btn-success" onClick={()=> create()}><i className="fa fa-plus"></i> Nouveau</button>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Nom </th>
                      <th>Localité</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      secteurs.map((secteur, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{secteur?.name}</td>
                          <td>{secteur?.locality}</td>
                          <td>

                            <Link to="#" onClick={() => edit(secteur)} className="btn btn-sm btn-primary"><i className="fa fa-pen"></i></Link>
                            <Link to="#" onClick={(e) => deleteSector(secteur?.id)} className="btn btn-sm btn-danger ml-2 "><i className="fa fa-trash"></i></Link>
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

export default Sector;