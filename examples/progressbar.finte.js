import inkly, { e, Box, Text } from "../lib/inkly"
import ProgressBar from "../lib/components/ProgressBar"
import delay from "delay"

const { release, setState } = inkly((props, { i }) => {
  return e(ProgressBar, { before: 'prefix ', ...props, charIncomplete: " " });
}, { width: 30, total: 30 }, { experimental: true });

let count = 0;

const timer = setInterval(() => {
    count = count + 1;
    setState({ tickSize: count });
    if (count >= 30) {
      clearInterval(timer);
    }
}, 100);
