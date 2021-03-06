/*
This file handles the tutorial, which is shown when the app is first started after installation
and optionally when the participant wants to see it again by clicking on the info option on tray icon
 */

// import the self-report question component and the mouse task component
import SelfReport from "./SelfReport";
import KeyboardTask from "./KeyboardTask";

import React, { Component } from 'react';


export default class DataGrabber extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phase: "keyboardTask"
        }

        this.grabbedData = {}
    }


    // switch from the Keyboard Task to the self-report and save the logged data
    endTask(data) {

        // add the self report data to the grabbed data dictionary
       Object.assign(this.grabbedData, data);

        this.setState({phase: "selfReport"});
    }

    // end the DataGrabber and log the grabbed Data
    endGrabber(data) {
        // add keyboard usage data
        Object.assign(this.grabbedData, data);

        // send the grabbed Data to the parent component in the props
        this.props.endDataGrabber(this.grabbedData);
    }

    render() {

        return(
            <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <div style={{margin: "auto"}}>
                    {this.state.phase === "keyboardTask" ? <KeyboardTask intro={false} endTask={(data) => this.endTask(data)}
                                                                         zoom={this.props.zoom}
                                                                         taskWindowSize={this.props.taskWindowSize}
                                                                         language={this.props.language}/>
                        :
                        this.state.phase === "selfReport" ? <SelfReport intro={false}
                                                                        endReport={(e) => this.endGrabber(e)}
                                                                        zoom={this.props.zoom}
                                                                        language={this.props.language}/>
                            : null}
                </div>
            </div>
        )
    }

}