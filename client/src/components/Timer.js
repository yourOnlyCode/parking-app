import React, { Component } from 'react'

export default class Timer extends Component {

    state = {
        count: 0,
    }

    componentDidMount() {
        this.timerCountDown()
    }

    timerCountDown = () => {
        setInterval(() => {
            this.setState({ count: this.props.parkTime - 1 })
        }, 1000)
    }

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
