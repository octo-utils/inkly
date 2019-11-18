import inkly, { e } from "../lib/inkly"

;(async function () {
  const l1 = inkly(_ => e([e('line1')]));

  const l2 = inkly(_ => e([e('line2')]));

  await l1.release('line1 released');

  await l2.release();

  const l3 = inkly(_ => e([e('line3')]));

  await l3.release();
})();
