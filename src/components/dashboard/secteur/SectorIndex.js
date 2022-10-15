import { useEffect, useState } from "react";
import { sectorDeleteService, sectorService } from "../../../service/http/sectorService";
import Loader from "../../../service/Loader";
import Footer from "../Footer";
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Link } from "react-router-dom";
import SectorEdit from "./SectorEdit";
import { toast } from 'react-toastify';
import SectorCreate from "./SectorCreate";
import { create } from "yup/lib/Reference";
import SectorShow from "./SectorShow";
import Pagination from "../../pagination/Pagination";

const Sector = () => {

  const [secteurs, setSecteurs] = useState([]);
  const [load, setLoad] = useState(true);
  const [closeModal, setCloseModal] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  // const [id, setId] = useState();
  const [secteur, setSecteur] = useState();
  const [showSector, setShowSector] = useState(false);

   // pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [dataPerPage] = useState(5);

   const indexOfLastPost = currentPage * dataPerPage;
   const indexOfFistPost = indexOfLastPost - dataPerPage;
   const currentPost = secteurs.slice(indexOfFistPost, indexOfLastPost)

   const paginate = (numeroPage) =>setCurrentPage(numeroPage);

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

    if (closeModal) {
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
    if (!window.confirm('Voulez-vous supprimer le secteur ?')) {
      return 0;
    }
    setLoad(true);
      sectorDeleteService(id).then(res => {
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);
          setSecteurs(res.data.secteurs)
        }
        
        setLoad(false);
      }).catch(err => {
        console.log(err.response);
        if (err.response.status === 403) {
          toast.warning(err.response.data.message);
        }
        setLoad(false);
      })
  }

  const show = (secteur) => {
    setShowSector(!showSector);
    if (createForm) {
      setCreateForm(false)
    }

    if (closeModal) {
      setCloseModal(false);
    }

    setSecteur(secteur);
  }

  return (
    <div id="wrapper">


      <Sidebar />
      <Loader loading={load} />


      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">


          <Navbar />

          <div className="container-fluid" id="container-wrapper">

            {
              closeModal && (<SectorEdit secteur={secteur} setSecteurs={setSecteurs} setLoad={setLoad} setCloseModal={setCloseModal} />)
            }
            {
              createForm && (<SectorCreate setSecteurs={setSecteurs} setLoad={setLoad} setCreateForm={setCreateForm} />)
            }
            {
              showSector && (<SectorShow secteur={secteur} setShowSector={setShowSector} setLoad={setLoad} />)
            }

            {
              !showSector
                ? <div className="row mb-3">

                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Liste des secteurs</h6>
                    <button className="btn btn-sm btn-success" onClick={() => create()}><i className="fa fa-plus"></i> Nouveau</button>
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
                          currentPost.map((secteur, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td><Link to={'#'} onClick={() => show(secteur)}>{secteur?.name}</Link></td>
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
                    <Pagination totalPost={secteurs.length} dataPerPage={dataPerPage} paginate={paginate} />
                  </div>

                </div>

                : <></>
            }




          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Sector;