import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import servicesData from "../../services-data";
import "../../App.scss";
import Loader from "../Loader";

const TagButton = ({ name, handleSetTag, tagActive }) => {
  return (
    <button
      className={`tag ${tagActive ? "active" : ""}`}
      onClick={() => handleSetTag(name)}
    >
      {name.toUpperCase()}
    </button>
  );
};

function Services() {
  // filters
  const [tag, setTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredServices, setFilteredServices] = useState([]);

  // loader
  const [open, setOpen] = useState(true);

  // Apply filters whenever tag or search changes
  useEffect(() => {
    let data = servicesData;

    // Filter by tag
    if (tag !== "all") {
      data = data.filter((service) => service.tag === tag);
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      data = data.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(data);
  }, [tag, searchTerm]);

  // loader effect
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 800);
  }, []);

  return (
    <div className="services">
      {open ? <Loader open /> : <Loader />}
      <h1 className="services-banner">Services</h1>

      <Container>
        <Row>
          <Col xs="12" className="mb-4">
            {/* Search Bar */}
            <input
              type="text"
              className="form-control search-box"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            />
          </Col>

          <Col xs="12">
            {/* Tag Filters */}
            <div className="tags">
              <TagButton
                name="all"
                tagActive={tag === "all"}
                handleSetTag={setTag}
              />
              <TagButton
                name="hotel"
                tagActive={tag === "hotel"}
                handleSetTag={setTag}
              />
              <TagButton
                name="villa"
                tagActive={tag === "villa"}
                handleSetTag={setTag}
              />
            </div>
          </Col>

          <Col xs="12">
            <section className="services-data">
              {filteredServices.length === 0 ? (
                <h3 className="text-center mt-5">No services found</h3>
              ) : (
                filteredServices.map((service, index) => {
                  let imgArr = [];
                  service.images.forEach((img) => imgArr.push(img.src));

                  return (
                    <div key={service.id} className="service-card">
                      <Row>
                        <Col md="6" style={{ paddingRight: "0px" }}>
                          <ImageSlider images={imgArr}>
                            <div className="slider-caption">
                              <h1>{service.name}</h1>
                              <p>{service.Setting}</p>
                            </div>
                          </ImageSlider>
                        </Col>

                        <Col
                          md="6"
                          className="service-data"
                          style={{ paddingLeft: "15px" }}
                        >
                          <Col xs="12">
                            <h3 className="service-data-heading">
                              {service.name}
                            </h3>
                          </Col>

                          <Col xs="12">
                            <div className="service-data-style">
                              <p>Style: </p>
                              <p>{service.style}</p>
                            </div>
                          </Col>

                          <Col xs="12">
                            <div className="service-data-setting">
                              <p>Setting: </p>
                              <p>{service.Setting}</p>
                            </div>
                          </Col>

                          <Col xs="12">
                            <div className="service-data-tag">
                              <p>Category: </p>
                              <p>{service.tag}</p>
                            </div>
                          </Col>

                          <Col xs="12">
                            <div className="service-data-price">
                              <p>Price per night from: </p>
                              <p>${service.price}</p>
                            </div>
                          </Col>

                          <Col xs="12">
                            <Link
                              to={`/services/${service.id}`}
                              className="view-service-btn"
                            >
                              More...
                            </Link>
                          </Col>
                        </Col>
                      </Row>
                    </div>
                  );
                })
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Services;
