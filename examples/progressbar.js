import inkly, { e, Box, Text } from '../lib/inkly'
import ProgressBar from '../lib/components/ProgressBar'
import delay from 'delay'

const { release, setState } = inkly((props, { i }) => {
  return e(ProgressBar, { ...props, charIncomplete: ' ' });
}, { width: 30, total: null });

(async _ => {
  process.stdin.resume();
  setState({ total: null });
  for (let i = 0; i < 30; i++) {
    setState({ tickSize: i * 2 });
    await delay(200);
  }
  for (let j = 0; j < 30; j++) {
    setState({ tickSize: j, total: 30 });
    await delay(200);
  }
  await release('done');
  process.stdin.pause();
})();
