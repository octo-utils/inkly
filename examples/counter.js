import inkly, { e } from '../lib/inkly'

const { release, setState } = inkly((props) => {
  return e(`count: ${props.count}`);
}, { count: 1 }, { experimental: true });

let count = 1;

setInterval(() => {
    count = count + 1;
    setState({ count });
}, 100);
