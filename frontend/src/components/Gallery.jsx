import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MySpinner from './MySpinner';

export default function Gallery({ agregarAlCarrito }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/product')
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
                setError('Hubo un problema al cargar los productos.');
                setLoading(false);
            });
    }, []);

    if (loading) return <MySpinner />;
    if (error) return <p>{error}</p>;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(data.length / productsPerPage);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div style={{ textAlign: "center", backgroundColor: "#F1F1F1", padding: "20px" }}>
            <section style={{
                display: "flex", gap: "10px", justifyContent: "center",
                marginTop: "20px", flexWrap: "wrap"
            }}>
                {currentProducts.map((product) => (
                    <div key={product.id} style={{
                        border: "1px solid #ccc", padding: "20px", width: "200px",
                        backgroundColor: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        textAlign: "center", borderRadius: "8px"
                    }}>
                        <img src={product.image} alt={product.name}
                            style={{ width: "100%", height: "200px", borderRadius: "4px", objectFit: "cover" }} />
                        <h3>{product.name}</h3>
                        <p>{product.price} USD</p>
                        <Link to={`/products/${product.id}`}>
                            <button
                                style={{ padding: "10px 15px", backgroundColor: "#433F45", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                Ver Detalle
                            </button>
                        </Link>
                    </div>
                ))}
            </section>

            <div style={{ margin: "20px 0" }}>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary mx-2"
                >
                    Anterior
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => goToPage(i + 1)}
                        className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary mx-2"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
