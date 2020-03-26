import { connect } from 'react-redux';

import { setToken, clearToken } from './redux';

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = { setToken, clearToken };

export default function reduxConnect(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true },
  )(component);
}
