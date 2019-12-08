import { connect } from 'react-redux';

import { setPreviewAction } from '../school.actions';

import { getClasses } from '../school.selectors';

import { Classes } from './classes.component';

const mapStateoProps = state => ({
  classes: getClasses(state),
});

const mapDispatchToProps = dispatch => ({
  setPreview: classe => dispatch(setPreviewAction(classe)),
});

export default connect(
  mapStateoProps,
  mapDispatchToProps,
)(Classes);
