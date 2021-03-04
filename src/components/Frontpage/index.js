import React from "react";
import messages from "./../../assets/Local/messages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";
const textData = [
  {
    title: "How We Buy Diamonds",
    content: [
      {
        text:
         "Diamond Standard is the world's first diamond market maker. We make a cash bid on millions of varieties of round natural diamonds, generally on a daily basis. Vendors submit diamonds to us."
      },
      // {
      //   text:
      //     "Alternatively you can suggest to your spouse or significant other that they speak to me or upon your suggestion, I can reach out to them on my own initiative (wink, wink) - and then we'll work together."
      // },
      // {
      //   text:
      //     "Either way, I'll make sure your Hint List is always up-to-date with new pieces and classics for any occasion  or price point."
      // }
    ]
  },
  {
    title: "We Buy or Bid",
    content: [
      {
        text:
          "Members enter individual diamonds, or import an entire list, with their best price for immediate, COD delivery to your nearest GIA Lab. Some diamonds we buy immediately, and for others, if they are diamonds that we need for the Diamond Standard commodities, we make a bid. If you accept our bid, the system sends you a purchase order, for local delivery. We always pay COD after confirmation."
      },
      // {
      //   text:
      //     "Bottom Line: 'you're SURPRISED!' with the 'perfect piece' that they'll will know you'll love!" 
      // }
    ]
  },
  {
    title: "Millions of Diamonds Types",
    content: [
      {
        text:
          "The Diamond Standard commodities are created using statistical sampling, which means that we buy some of every geological quality of diamond, regardless of the cost."
      },
      {
        text:
          "The Range: We only buy natural mined diamonds, round shape, 0.23 to 1.99 carats, D to L Color, Flawless to SI2 Clarity, Ideal to VG Cut, Ideal to Good Polish, Ideal to Good Symmetry, None to Light Milky, None to Strong Blue Fluorescence."
      },
      {
        text:"GIA Grading: Diamonds asking above $500 must have already been graded by the GIA (any location, any year). We do not need the GIA folio paperwork. For diamonds asking below $500, we buy ungraded diamonds based on a quality asserted by the seller, and have those diamond graded by the GIA. We pay more for GIA graded diamonds below $500."
      }
    ]
  },
  {
    title: "You Deliver Locally",
    content: [
      {
        text:
          "We never touch a diamond. Within 2 days of receiving the purchase order, members deliver the diamonds to their nearest GIA Lab, which inspects all our diamonds. Their job is to confirm that the delivered diamonds match the GIA certificate, or to grade ungraded diamonds (under $500 only). We do pay more for diamonds already in the USA."
      },
      {
        text:
          "Hint + Whisper Private Jewelry Stylists are private jewelers with a background in luxury fashion who seek to help their client pair jewelry and fashion to ensure that their jewelry is timeless and works whether- attending a formal event or are just seeking to add a signaure touch to their daily wardrobe. Hint + Whisper dosen't own inventory so there's no incentive to sell a paticular item..."
      },
      {
        text:
          "...so my mission is to ensure that my clients are always surprised with the 'perfect piece'."
      }
    ]
  }
];
class FrontPage extends React.Component {
  render() {
    const { lang } = this.props;
    const message = messages[lang];
    return (
      <section className="frontpage">
        <div className="frontpage-head">
        <h5 className="text-center text-uppercase">Welcome to Diamond Standard Exchange</h5>
        </div>
        {/* <div className="banner__img">
          <img src="./banner/banner_one.jpg" alt="" />
        </div> */}

        <div className="container frontpage-content">
          {textData.map((item, index) => {
            return (
              <div className="content" key={index}>
                <h5 className="text-left">{item.title}</h5>
                <ul>
                  {item.content.map((val, i)=> {
                    return <div key={i}>{val.text}</div>;
                  })}
                </ul>
              </div>
            );
          })}
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

export default connect(mapStateToProps, null)(FrontPage);
