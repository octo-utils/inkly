import inkly, { e, Text } from "../lib/inkly"

const { release, setState } = inkly((props) => {
  return e([
    e(`head`),
    e("tail")
  ]);
}, null, { experimental: true });
