import React, { useEffect, useRef } from 'react';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const withSideEffect = (reducePropsToState, handleStateChangeOnClient, mapStateOnServer) => {
  return WrappedComponent => {
    let mountedInstances = [];
    let state;

    function emitChange() {
      state = reducePropsToState(mountedInstances);

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    function SideEffect(props) {
      const willMount = useRef(true);
      if (willMount.current) {
        mountedInstances.push(props);
        emitChange();
      }
      willMount.current = false;
      useEffect(() => {
        return () => {
          mountedInstances.splice(mountedInstances.indexOf(props), 1);
          emitChange();
        };
      });
      return <WrappedComponent {...props} />;
    }
    // Exposed for testability
    SideEffect.canUseDOM = canUseDOM;
    SideEffect.rewind = () => {
      if (SideEffect.canUseDOM) {
        throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
      }
      let recordedState = state;
      state = undefined;
      mountedInstances = [];
      return recordedState;
    };
    SideEffect.peek = () => state;
    SideEffect.displayName = `SideEffect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return SideEffect;
  };
};

export default withSideEffect;
