import React, { createElement } from 'react';
import { render as renderInk, Text } from 'ink';

export {  Box, Color, Static, Text, StdinContext, StdoutContext } from 'ink';

export { createElement } from 'react';

export const e = function(component, props, children) {
  if (typeof component === 'string') {
    return createElement(Text, props, component);
  }
  return createElement(component, props, children);
};

export const Component = React.Component;

/**
 * inkly
 * @param  {(props: any, renderState: any)=>React.Component} render=()=>null
 * @param  {any} initialState=null
 * @param  {any} options={}
 * @returns {{ release: (content) => Promise, setState: (state) => void }}
 */
export default function(render = () => null, initialState = null, options = {}) {

  class InkFragment extends Component {
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

  const release = async (clearContent = null) => {
    if (clearContent) {
      if (React.isValidElement(clearContent)) {
        rerender(clearContent);
      } else if (typeof clearContent === 'string') {
        rerender(<Text>{clearContent}</Text>)
      }
    }
    unmount();
    await waitUntilExit();
  }

  const setState = (nextState) => {
    state = { ...state, ...nextState };
    rerender(<InkFragment {...state}/>);
  }

  return { release, setState };
}
