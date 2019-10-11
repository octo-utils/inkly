
import React from 'react'
import { Text } from 'ink'

function stringRepeatMaxLength(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str.repeat((~~(maxLength / str.length)) + 1).slice(0, maxLength);
}

const TICK_STEP_TOTAL = 20;

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tickStep: 0 }
  }
  componentDidMount() {
    this.setState({ tickStep: 0 })
  }
  static getDerivedStateFromProps(props, state) {
    return {
      tickStep: state.tickStep + 1
    }
  }
  render() {
    const {
      // infinte = false,
      indicatorInfinte = '<=>',
      wrapper = ['[', ']'],
      charComplete = '=>',
      charIncomplete = '-',
      width,
      tickSize,
      total,
    } = this.props;

    const {
      tickStep
    } = this.state;

    const tickSizeByTotal = (tickSize / total);

    const isTotalUnCountable = Number.isNaN(tickSizeByTotal) || !Number.isFinite(tickSizeByTotal);

    const [charLeft, charRight] = wrapper;

    const wrap = bar => (`${charLeft}${bar}${charRight}`);

    if (isTotalUnCountable) {
      const widthRest = width - wrapper.join('').length - indicatorInfinte.length;
      const widthLeft = Math.max(0, Math.round(((tickStep % TICK_STEP_TOTAL) / TICK_STEP_TOTAL) * widthRest));
      const widthRight = Math.max(0, widthRest - widthLeft);
      return <Text>{wrap(`${' '.repeat(widthLeft)}${indicatorInfinte}${' '.repeat(widthRight)}`)}</Text>;
    }

    const charCompleteTail = charComplete.slice(charComplete.length - 1);
    const charCompleteHead = charComplete.slice(0, charComplete.length - 1);
    const widthRest = width - wrapper.join('').length;
    const widthLeft = Math.round((tickSizeByTotal) * widthRest);
    const widthRight = Math.max(0, widthRest - widthLeft - charCompleteTail.length);

    return <Text>{
      wrap(
        stringRepeatMaxLength(charCompleteHead, widthLeft) +
        charCompleteTail +
        stringRepeatMaxLength(charIncomplete, widthRight)
      )
    }</Text>;
  }
}