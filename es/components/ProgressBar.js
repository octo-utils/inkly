
import React from "react"
import { Text } from "ink"

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
    this.state = { tickStep: 0, tickDirectionInfinte: true, tickInterval: null }
  }
  componentDidMount() {
    const { intervalInfinte = 200 } = this.props;
    this.setState({ 
      tickStep: 0, 
      tickDirectionInfinte: true,
      tickInterval: setInterval(this.tickFrameInterval, intervalInfinte),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.tickInterval);
  }
  tickFrameInterval = () => {
    const {
      tickSize = 0,
      total = null,
    } = this.props;
    const tickSizeByTotal = (tickSize / total);
    const isTotalUnCountable = Number.isNaN(tickSizeByTotal) || !Number.isFinite(tickSizeByTotal);
    if (isTotalUnCountable) {
      const nextTickStep = this.state.tickStep + 1;
      this.setState({
        tickStep: nextTickStep,
        ...(nextTickStep % TICK_STEP_TOTAL === 0) && {
          tickDirectionInfinte: !this.state.tickDirectionInfinte
        }
      });
    } else {
      this.setState({ tickStep: 0, tickDirectionInfinte: true });
    }
  }
  render() {
    const {
      // infinte = false,
      indicatorInfinte = "<=>",
      charEmptyInfinte = " ",
      wrapper = ["[", "]"],
      charComplete = "=>",
      charIncomplete = " ",
      width = 2,
      tickSize = 0,
      total = null,
      before = null,
      after = null
    } = this.props;

    const {
      tickStep,
      tickDirectionInfinte
    } = this.state;

    const [charLeft, charRight] = wrapper;

    const wrap = bar => <>{before}{`${charLeft}${bar}${charRight}`}{after}</>;

    if ((tickSize === null || tickSize === 0)) {
       const widthRest = Math.max(0, width - wrapper.join("").length);
       return <Text>{wrap(`${(' ').repeat(widthRest)}`)}</Text>;
    }

    const tickSizeByTotal = (tickSize / total);

    const isTotalUnCountable = Number.isNaN(tickSizeByTotal) || !Number.isFinite(tickSizeByTotal);

    if (isTotalUnCountable) {
      const widthRest = width - wrapper.join("").length - indicatorInfinte.length;
      const widthLeft = Math.max(0, Math.round(((tickStep % TICK_STEP_TOTAL) / TICK_STEP_TOTAL) * widthRest));
      const widthRight = Math.max(0, widthRest - widthLeft);
      if (!tickDirectionInfinte) {
        return <Text>{
          wrap(`${charEmptyInfinte.repeat(widthRight)}${indicatorInfinte}${charEmptyInfinte.repeat(widthLeft)}`)
        }</Text>;
      }
      return <Text>{
        wrap(`${charEmptyInfinte.repeat(widthLeft)}${indicatorInfinte}${charEmptyInfinte.repeat(widthRight)}`)
      }</Text>;
    }

    const charCompleteTail = charComplete.slice(charComplete.length - 1);
    const charCompleteHead = charComplete.slice(0, charComplete.length - 1);
    const widthRest = Math.max(0, width - wrapper.join("").length);
    const widthLeft = Math.round((tickSizeByTotal) * (widthRest - charCompleteTail.length));
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