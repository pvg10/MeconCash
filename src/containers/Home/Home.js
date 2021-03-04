import React from 'react';
import messages from "./../../assets/Local/messages";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        const { lang } = this.props;
        const message = messages[lang]
        return (
            <div className="container my-5">
                <Link to={`/${lang}/rendering`} className="mx-3">
                    <h3 className="text-center">"The Hint"</h3>
                </Link>
                <p>{message.home.content}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(Home);