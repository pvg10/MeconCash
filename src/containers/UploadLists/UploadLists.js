import React from "react";
import messages from "../../assets/Local/messages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadList from "../../components/UploadLists/uploadList";

class UploadLists extends React.Component {
  render() {
    const { lang } = this.props;
    const message = messages[lang];
    return (
      <div className="hl__container">
        <UploadList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(UploadLists);
