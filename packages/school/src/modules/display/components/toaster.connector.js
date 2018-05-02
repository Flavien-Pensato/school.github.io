import { connect } from 'react-redux';

import { Toaster } from './toaster.component';

import { getToaster } from '../display.selectors';

const mapStateToProps = state => ({
  toaster: getToaster(state),
});

export const ToasterConnected = connect(mapStateToProps)(Toaster);
