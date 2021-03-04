import React from "react";
import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

class CatalogFilter extends React.Component {
  render() {
    const { lang } = this.props;
    const message = messages[lang];
    return (
      <section id="catalog__filter">
        <div className="left__filter">         
          <div><b>Filter By</b></div>
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic" data-toggle="dropdown">
              <span>Category</span><FontAwesomeIcon icon={faAngleDown} />
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={(e) => { console.log('clicked', e.target.text) }}>
              <Dropdown.Item href="#/action-1">Necklaces</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pendants</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Pins</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Rings</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Signed Pieces</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Watches</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <span>Brand/Designer</span><FontAwesomeIcon icon={faAngleDown} />
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={(e) => { console.log('clicked', e.target.text) }}>
              <Dropdown.Item href="#/action-1">All</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Arments</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Penny Preville</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Kwiat</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Sloane Street</Dropdown.Item>
              <Dropdown.Item href="#/action-3">KC Designs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <span>Price</span><FontAwesomeIcon icon={faAngleDown} />
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={(e) => { console.log('clicked', e.target.text) }}>
              <Dropdown.Item href="#/action-1">1-1000</Dropdown.Item>
              <Dropdown.Item href="#/action-2">1000-10000</Dropdown.Item>
              <Dropdown.Item href="#/action-3">10000-100000</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="right__filter">
          <div>
            <span>Keyword search </span>
            <input type="text" />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export default connect(mapStateToProps, null)(CatalogFilter);
