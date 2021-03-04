import React from "react";
import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

class ProductItem extends React.Component {
  render() {
    const { lang } = this.props;
    const message = messages[lang];
    return (
      <section className="product__list--section">
       <div className="row">
        <div className="col-3 product__item">
          <div>
            <div className="image__section">
            <Link to="/product/123">
                  <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/MNM10013ADXW.jpg" /></Link>
            </div>
              <div className="text-center prod-brand-name">Penny Preville</div>
              <div className="text-center"><b>$ 4569</b></div>
          </div>
        </div>
        <div className="col-3 product__item">
          <div>
            <div className="image__section">
            <Link to="/product/123">
                  <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/UNZ2267BDW.jpg" /></Link>
            </div>
              <div className="text-center prod-brand-name">GOSHWARA</div>
              <div className="text-center"><b>$ 1456</b></div>
          </div>
        </div>
        <div className="col-3 product__item">
          <div>
            <div className="image__section">
            <Link to="/product/123">
              <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/MNM10013ADXW.jpg" /></Link>
            </div>
              <div className="text-center prod-brand-name">GOSHWARA</div>
              <div className="text-center"><b>$ 6456</b></div>
          </div>
        </div>
        <div className="col-3 product__item">
          <div>
            <div className="image__section">
            <Link to="/product/123">
              <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/MZQ10021GDXW.jpg" /></Link>
            </div>
              <div className="text-center prod-brand-name">Harry Kotlar</div>
              <div className="text-center"><b>$ 2456</b></div>
          </div>
        </div>
        <div className="col-3 product__item">
          <div>
            <div className="image__section">
            <Link to="/product/123">
              <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/MNA10067BZXW.jpg" /></Link>
            </div>
            <div className="text-center prod-brand-name">Kwait</div>
              <div className="text-center"><b>$ 4565</b></div>
          </div>
          </div>
          <div className="col-3 product__item">
            <div>
              <div className="image__section">
                <Link to="/product/123">
              <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/FEM00090XDXK.jpg" /></Link>
              </div>
              <div className="text-center prod-brand-name">Penny Preville</div>
              <div className="text-center"><b>$ 4569</b></div>
            </div>
          </div>
          <div className="col-3 product__item">
            <div>
              <div className="image__section">
                <Link to="/product/123">
                  <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/UNZ2267BDW.jpg" /></Link>
              </div>
              <div className="text-center prod-brand-name">GOSHWARA</div>
              <div className="text-center"><b>$ 1456</b></div>
            </div>
          </div>
          <div className="col-3 product__item">
            <div>
              <div className="image__section">
                <Link to="/product/123">
                  <img src="https://cdn-stage.optcentral.com/optportal/catalog/2/large/FEM00090XDXW.jpg" /></Link>
              </div>
              <div className="text-center prod-brand-name">GOSHWARA</div>
              <div className="text-center"><b>$ 6456</b></div>
            </div>
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

export default connect(mapStateToProps, null)(ProductItem);
