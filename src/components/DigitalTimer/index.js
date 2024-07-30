import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerOn: false,
    resetOn: true,
    minutes: 25,
    seconds: 0,
    timer: 25,
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState({
      resetOn: true,
      minutes: 25,
      seconds: 0,
      timer: 25,
      timerOn: false,
    })
  }

  tick = () => {
    const {seconds, minutes, timerOn, resetOn} = this.state
    if (timerOn === false || resetOn === true) {
      clearInterval(this.timerId)
    }
    if (seconds === 0) {
      if (seconds === 0 && minutes === 0) {
        this.setState({
          resetOn: true,
          timerOn: false,
        })
      }
      if (minutes > 0) {
        this.setState(pre => ({
          seconds: 59,
          minutes: pre.minutes - 1,
        }))
      }
    } else {
      if (seconds > 0) {
        this.setState(pre => ({
          seconds: pre.seconds - 1,
        }))
      }
      console.log('a')
    }
  }

  timerStart = () => {
    const {timerOn} = this.state
    if (timerOn === true) {
      clearInterval(this.timerId)
    }
    this.setState(pre => ({timerOn: !pre.timerOn, resetOn: false}))
    if (timerOn === false) {
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  onMinus = () => {
    const {minutes} = this.state
    if (minutes > 0) {
      this.setState(pre => ({
        minutes: pre.minutes - 1,
        timer: pre.timer - 1,
      }))
    }
  }

  onPlus = () => {
    this.setState(pre => ({
      minutes: pre.minutes + 1,
      timer: pre.timer + 1,
    }))
  }

  render() {
    const {timerOn, resetOn, timer} = this.state
    let {minutes, seconds} = this.state
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    const plusMinusAble = () => (
      <div className="limit-container">
        <button className="minut-button" type="button" onClick={this.onMinus}>
          <p className="minus">-</p>
        </button>
        <p className="limit-time">{timer}</p>
        <button className="minut-button" type="button" onClick={this.onPlus}>
          <p className="plus">+</p>
        </button>
      </div>
    )

    const plusMinusDisable = () => (
      <div className="limit-container">
        <button type="button" className="minut-button">
          <p className="minus">-</p>
        </button>

        <p className="limit-time">{timer}</p>
        <button type="button" className="minut-button">
          <p className="plus">+</p>
        </button>
      </div>
    )

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container-background">
          <div className="timer-container">
            <div className="white-background">
              <h1 className="time">
                {minutes}:{seconds}
              </h1>
              <p className="timer-status">{timerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="container">
            <div className="start-and-reset-container">
              <div className="start-pause-container">
                <button
                  className="button-start"
                  type="button"
                  onClick={this.timerStart}
                >
                  <img
                    className="start-pause-image"
                    src={
                      timerOn
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={timerOn ? 'pause icon' : 'play icon'}
                  />
                </button>
                <p className="start-text">{timerOn ? 'Pause' : 'Start'}</p>
              </div>
              <div className="reset-container">
                <button
                  className="button-start"
                  type="button"
                  onClick={this.onClickReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="start-pause-image"
                  />
                </button>
                <p className="start-text">Reset</p>
              </div>
            </div>
            <div className="timer-set-container">
              <p className="set-timer-limit-text">Set Timer Limit</p>
              {resetOn ? plusMinusAble() : plusMinusDisable()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
