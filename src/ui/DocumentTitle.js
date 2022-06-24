import withSideEffect from 'react-side-effect';

const DocumentTitle = ({ children }) => children;

const reducePropsToState = propsList => {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
};

const handleStateChangeOnClient = title => {
  document.title = title || '';
};

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
