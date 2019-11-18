import React, { createElement } from "react";
import { render as renderInk, Text, Box } from "ink";
import delay from "delay";

export { Box, Color, Static, Text, StdinContext, StdoutContext } from "ink";

export { createElement as createReactElement } from "react";

export const e = function(component, props = null, children = []) {
  // string
  if (typeof component === "string") {
    return createElement(Text, props, component);
  }
  // array
  if (Array.isArray(component) && props === null) {
    return <Box>{[
      ...component.map((node, index) => <React.Fragment key={index}>{node}</React.Fragment>)
    ]}</Box>;
  }
  // (props, array)
  if (typeof component === 'object' && Array.isArray(props)) {
    return <Box {...component}>{[
      ...props.map((node, index) => <React.Fragment key={index}>{node}</React.Fragment>)
    ]}</Box>;
  }
  // (component, props, array)
  return createElement(component, props, children);
};

export const ReactComponent = React.Component;

/**
 * inkly
 * @param  {(props: any, renderState: any)=>React.Component} render=()=>null
 * @param  {any} initialState=null
 * @param  {any} options={}
 * @returns {{ release: (content) => Promise, setState: (state) => void }}
 */
export default function(render = () => null, initialState = null, options = {}) {

  class InkFragment extends ReactComponent {
    constructor(props) {
      super(props);
      this.state = { _t: Date.now(), _dt: 0, _i: 0 };
    }

    static getDerivedStateFromProps(props, state) {
      const now = Date.now();
      return { ...props, _t: now, _dt: now - state._t, _i: state._i + 1 };
    }

    render() {
      const { _t: t, _dt: dt, _i: i } = this.state;
      return render(
        { ...this.props },
        { t, dt, i }
      );
    }
  }

  let state = { ...initialState };

  const optionsRenderInk = {
    stdout: process.stdout,
    stdin: process.stdin,
    ...options
  };

  const { rerender, unmount, waitUntilExit } = renderInk(<InkFragment {...state}/>, optionsRenderInk);

  let isReleased = false;

  const release = async (clearContent = null) => {
    if (isReleased) {
      return false;
    }
    isReleased = true;
    if (clearContent) {
      if (React.isValidElement(clearContent)) {
        rerender(clearContent);
      } else if (typeof clearContent === "string") {
        rerender(<Text>{clearContent}</Text>)
      }
    }
    unmount();
    return true;
  }

  const setState = (nextState) => {
    if (isReleased) {
      return false;
    }
    state = { ...state, ...nextState };
    rerender(<InkFragment {...state}/>);
    return true;
  }

  return { release, setState };
}
