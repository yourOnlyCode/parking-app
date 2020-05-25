import React, { Component } from 'react'

export default class Timer extends Component {

    state = {
        count: null,
    }

    // componentDidMount() {
    //     this.timerCountDown()
    //     this.timerAtZero()
    // }

    componentWillUnmount() {
        this.clearInterval(this.myInterval)
    }

    // timerCountDown = () => {
    //     console.log('park time:', this.props.parkTime)
    //     this.setState({ parkTime: this.props.parkTime })
    //     this.myInterval = setInterval(() => {
    //         this.setState({ parkTime: this.props.count - 1 })
    //     }, 1000)
    // }

    // timerAtZero = () => {
    //     if (this.state.count === 0) {
    //         console.log('timer ran out')
    //         this.setState({ carParked: false })
    //         this.setState({ count: null })
    //     }
    // }

    render() {
        const { count } = this.state
        return (
            <div>
                <div>
                    Time Left: {this.state.count}
                </div>
            </div>
        )
    }
}
