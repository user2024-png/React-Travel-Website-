import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import '../../App.scss';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

function Products() {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [open, setOpen] = useState(true);

    // SEARCH + FILTER STATES
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        fetchItems()
    }, []);

    const fetchItems = async () => {
        try {
            const data = await fetch(`https://fakestoreapi.com/products`);
            const items = await data.json();
            setItems(items);
            setFilteredItems(items); // Default: show all
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    // FILTER FUNCTION
    useEffect(() => {
        let updated = items;

        // SEARCH FILTER
        if (searchTerm.trim() !== "") {
            updated = updated.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // CATEGORY FILTER
        if (category !== "all") {
            updated = updated.filter(item =>
                item.category.toLowerCase() === category.toLowerCase()
            );
        }

        // PRICE FILTER
        if (minPrice !== "") {
            updated = updated.filter(item => item.price >= parseFloat(minPrice));
        }

        if (maxPrice !== "") {
            updated = updated.filter(item => item.price <= parseFloat(maxPrice));
        }

        setFilteredItems(updated);
    }, [searchTerm, category, minPrice, maxPrice, items]);

    const renderBackdrop = () => {
        if (open) {
            return <Loader open />
        } else {
            return null;
        }
    }

    return (
        <div className="product-lists">
            {renderBackdrop()}
            <h1 className="products">Products</h1>

            {/* FILTER BAR */}
            <Container className="mb-4">

                {/* SEARCH */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* CATEGORY FILTER */}
                <select
                    className="form-control mb-3"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewellery</option>
                </select>

                {/* PRICE FILTER */}
                <Row>
                    <Col xs="6">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </Col>
                    <Col xs="6">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col xs="12">
                        <div className="products-container">
                            {filteredItems.length === 0 ? (
                                <h4>No products found</h4>
                            ) : (
                                filteredItems.map((item, index) => (
                                    <article className={`product product-${item.id}`} key={index}>
                                        <img src={item.image} className="product-img img-fluid" />
                                        <div className="product-info">
                                            <Link to={`/products/${item.id}`} className="single-product-link">
                                                <h4 className="text-center product-name">{item.title}</h4>
                                            </Link>
                                            <h5 className="text-center product-price">${item.price}</h5>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Products;
