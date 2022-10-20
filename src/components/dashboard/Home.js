import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { operationIndexService } from "../../service/http/OperationService";

function Home() {

    const [clients, setClients] = useState([]);
    const [operations, setOperations] = useState([]);
    const [sectors, setSectors] = useState([]);

    // récupération du premier jour et du dernier jour du mois en cours
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(lastDay);

    const data = {
        labels: ['VERT', 'ROUGE', 'JAUNE', 'BLEU'],
        datasets: [
            {
                label: 'Couleurs du 237',
                data: [12, 20, 17, 10],
                backgroundColor: ['green', 'red', 'yellow', 'blue'],
            },

        ]
    }

    useEffect(() => {
        operationIndexService().then(res => {
            console.log(res.data.operations);
            setClients(res.data.clients);
            setOperations(res.data.operations);
            setSectors(res.data.sectors);
        }).catch(err => {
            console.log(err.response);
        })
    }, [])


    return (
        <>
            <div id="wrapper">


                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">


                        <Navbar />

                        <div className="container-fluid" id="container-wrapper">


                            <div className="row mb-3">

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Nombre de clients </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{clients.length}</div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span>Since last month</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-users fa-2x text-info"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Montant collecte du mois</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        
                                                        {
                                                            operations.filter(operation => 
                                                                new Date(operation.created_at).getTime() >= firstDay.getTime()
                                                                && new Date(operation.created_at).getTime() < lastDay.getTime()
                                                                && operation.type !== '-1'
                                                                )
                                                            .reduce((total, operat) =>{
                                                                return total += operat.amount
                                                            },0)
                                                        } XAF 
                                                    </div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                                                        <span>Since last years</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-hand-holding-usd fa-3x text-success"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Nouveau client</div>
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                        {
                                                            clients.filter(client => 
                                                                new Date(client.created_at).getTime() >= firstDay.getTime()
                                                                && new Date(client.created_at).getTime() < lastDay.getTime()
                                                                ).reduce((total, clt) => {
                                                                    return total += 1;
                                                                },0)
                                                        }
                                                    </div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                                                        <span>Since last month</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-user-plus fa-2x text-info"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Zone de collecte</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{sectors.length} </div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span>
                                                        <span>Since yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-comments fa-2x text-warning"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-3">
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                                <div className="col-xl-8 col-md-8 col-mb-8">
                                    <Bar data={data} />
                                </div>
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                                <div className="col-xl-8 col-md-8 col-mb-8">
                                    <Line data={data} />
                                </div>
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                                <div className="col-xl-8 col-md-8 col-mb-8">
                                    <Doughnut data={data} />
                                </div>
                                <div className="col-xl-1 col-md-1 col-mb-1"></div>
                            </div>


                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home;