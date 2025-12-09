import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MySpinner from '../components/MySpinner';

const MainContiner = styled.div`
  :root
  {
    fonti-size: 16px;
  }

  *{
  margin: 0;
  padding: 0;
  font-family: roboto, sans-serif;
  }
`;

export default function EditGallery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/product')
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
              setError('Hubo un problema al cargar los productos.');
              setCargando(false);
          });
    }, []);

    if (loading) {
        return <MySpinner />;
    }

    if (error) return <p>{error}</p>;

    return (
        <MainContiner>
        <Header />
        <section style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
            {data.map((product) => (
                <div key={product.id} style={{ border: "1px solid #ccc", padding: "20px", width: "200px", textAlign: "center", borderRadius: "8px" }}>
                    <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", borderRadius: "4px", objectFit: "cover" }} />
                    <h3>{product.name}</h3>
                    <p>{product.price} USD</p>
                    <Link to={`/edit/${product.id}`}>
                        <button
                            style={{ padding: "10px 15px", backgroundColor: "yellow", color: "#010101", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Editar Producto
                        </button>            
                    </Link>

                </div>
            ))}
        </section>
        <Footer />
        <Nav2 />
        </MainContiner>
    );
}
