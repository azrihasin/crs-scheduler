import React, { Component } from "react";
import './App.css'
import './css/style.css'

export default class MyComponent extends Component {


    
  componentDidMount() {
    const script = document.createElement("script");
    const script2 = document.createElement("script");

    script.src = "https://azrihasin.github.io/crs-scheduler/src/js/main.js";
    script.async = true;
    script.type = "text/babel";
    script.onload = () => this.scriptLoaded();

    script2.src = "https://azrihasin.github.io/crs-scheduler/src/js/util.js";
    script2.async = true;
    script2.type = "text/babel";
    script2.onload = () => this.scriptLoaded();

    document.body.appendChild(script);
    document.body.appendChild(script2);
  }

  render() {
    return (
        <>
          <div className="js">
        
            <div>
                <div className="cd-main-header text-center flex flex-column flex-center">
        <p className="margin-top-md margin-bottom-xl">👈 <a className="cd-article-link" href="https://codyhouse.co/gem/schedule-template">Article &amp; Download</a></p>
    
        <h1 className="text-xl">Schedule Template</h1>
      </div>
    
                 <div className="cd-schedule cd-schedule--loading margin-top-lg margin-bottom-lg js-cd-schedule">
        <div className="cd-schedule__timeline">
          <ul>
            <li><span>09:00</span></li>
            <li><span>09:30</span></li>
            <li><span>10:00</span></li>
            <li><span>10:30</span></li>
            <li><span>11:00</span></li>
            <li><span>11:30</span></li>
            <li><span>12:00</span></li>
            <li><span>12:30</span></li>
            <li><span>13:00</span></li>
            <li><span>13:30</span></li>
            <li><span>14:00</span></li>
            <li><span>14:30</span></li>
            <li><span>15:00</span></li>
            <li><span>15:30</span></li>
            <li><span>16:00</span></li>
            <li><span>16:30</span></li>
            <li><span>17:00</span></li>
            <li><span>17:30</span></li>
            <li><span>18:00</span></li>
          </ul>
        </div> 
      
        <div className="cd-schedule__events">
          <ul>
            <li className="cd-schedule__group">
              <div className="cd-schedule__top-info"><span>Monday</span></div>
      
              <ul>
                <li className="cd-schedule__event">
                  <a data-start="09:30" data-end="10:30" data-content="event-abs-circuit" data-event="event-1" href="#0">
                    <em className="cd-schedule__name">Abs Circuit</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="11:00" data-end="12:30" data-content="event-rowing-workout" data-event="event-2" href="#0">
                    <em className="cd-schedule__name">Rowing Workout</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="14:00" data-end="15:15"  data-content="event-yoga-1" data-event="event-3" href="#0">
                    <em className="cd-schedule__name">Yoga Level 1</em>
                  </a>
                </li>
              </ul>
            </li>
      
            <li className="cd-schedule__group">
              <div className="cd-schedule__top-info"><span>Tuesday</span></div>
      
              <ul>
                <li className="cd-schedule__event">
                  <a data-start="10:00" data-end="11:00"  data-content="event-rowing-workout" data-event="event-2" href="#0">
                    <em className="cd-schedule__name">Rowing Workout</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="11:30" data-end="13:00"  data-content="event-restorative-yoga" data-event="event-4" href="#0">
                    <em className="cd-schedule__name">Restorative Yoga</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="13:30" data-end="15:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                    <em className="cd-schedule__name">Abs Circuit</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="15:45" data-end="16:45"  data-content="event-yoga-1" data-event="event-3" href="#0">
                    <em className="cd-schedule__name">Yoga Level 1</em>
                  </a>
                </li>
              </ul>
            </li>
      
            <li className="cd-schedule__group">
              <div className="cd-schedule__top-info"><span>Wednesday</span></div>
      
              <ul>
                <li className="cd-schedule__event">
                  <a data-start="09:00" data-end="10:15" data-content="event-restorative-yoga" data-event="event-4" href="#0">
                    <em className="cd-schedule__name">Restorative Yoga</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="10:45" data-end="11:45" data-content="event-yoga-1" data-event="event-3" href="#0">
                    <em className="cd-schedule__name">Yoga Level 1</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="12:00" data-end="13:45"  data-content="event-rowing-workout" data-event="event-2" href="#0">
                    <em className="cd-schedule__name">Rowing Workout</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="13:45" data-end="15:00" data-content="event-yoga-1" data-event="event-3" href="#0">
                    <em className="cd-schedule__name">Yoga Level 1</em>
                  </a>
                </li>
              </ul>
            </li>
      
            <li className="cd-schedule__group">
              <div className="cd-schedule__top-info"><span>Thursday</span></div>
      
              <ul>
                <li className="cd-schedule__event">
                  <a data-start="09:30" data-end="10:30" data-content="event-abs-circuit" data-event="event-1" href="#0">
                    <em className="cd-schedule__name">Abs Circuit</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="12:00" data-end="13:45" data-content="event-restorative-yoga" data-event="event-4" href="#0">
                    <em className="cd-schedule__name">Restorative Yoga</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="15:30" data-end="16:30" data-content="event-abs-circuit" data-event="event-1" href="#0">
                    <em className="cd-schedule__name">Abs Circuit</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="17:00" data-end="18:30"  data-content="event-rowing-workout" data-event="event-2" href="#0">
                    <em className="cd-schedule__name">Rowing Workout</em>
                  </a>
                </li>
              </ul>
            </li>
      
            <li className="cd-schedule__group">
              <div className="cd-schedule__top-info"><span>Friday</span></div>
      
              <ul>
                <li className="cd-schedule__event">
                  <a data-start="10:00" data-end="11:00"  data-content="event-rowing-workout" data-event="event-2" href="#0">
                    <em className="cd-schedule__name">Rowing Workout</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="12:30" data-end="14:00" data-content="event-abs-circuit" data-event="event-1" href="#0">
                    <em className="cd-schedule__name">Abs Circuit</em>
                  </a>
                </li>
      
                <li className="cd-schedule__event">
                  <a data-start="15:45" data-end="16:45"  data-content="event-yoga-1" data-event="event-3" href="#0">
                    <em className="cd-schedule__name">Yoga Level 1</em>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      
        <div className="cd-schedule-modal">
          <header className="cd-schedule-modal__header">
            <div className="cd-schedule-modal__content">
              <span className="cd-schedule-modal__date"></span>
              <h3 className="cd-schedule-modal__name"></h3>
            </div>
      
            <div className="cd-schedule-modal__header-bg"></div>
          </header>
      
          <div className="cd-schedule-modal__body">
            <div className="cd-schedule-modal__event-info"></div>
            <div className="cd-schedule-modal__body-bg"></div>
          </div>
      
          <a href="#0" className="cd-schedule-modal__close text-replace">Close</a>
        </div>
      
        <div className="cd-schedule__cover-layer"></div>
      </div> 
    
            </div>
    
    
            </div>
            
        </>
      )
  }
}