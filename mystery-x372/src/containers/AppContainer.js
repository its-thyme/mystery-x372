import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    // no state at the moment
  };
}

const mapDispatchToProps = (dispatch) => ({
  // empty object at the moment
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
