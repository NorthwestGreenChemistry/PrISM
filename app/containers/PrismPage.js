import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Prism from '../components/Prism';
import * as PrismActions from '../actions/prism';

function mapStateToProps(state) {
    return {
        currentStep: state.currentStep
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PrismActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prism);
