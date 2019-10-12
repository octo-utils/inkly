import inkly, { e, Box, Text } from '../lib/inkly'
import ProgressBar from '../lib/components/ProgressBar'
import delay from 'delay'

const { release, setState } = inkly((props, { i }) => {
  return e(ProgressBar, { ...props, charIncomplete: ' ' });
}, { width: 30, total: null }, { experimental: true });

let count = 0;

setInterval(() => {
    count = count + 1;
    setState({ tickSize: count });
}, 100);
