import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css'
import './css/style.css'
import { info } from './data'
import Spinner from 'react-svg-spinner'

import { useForm } from 'react-hook-form'

function App() {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(info)
  const [array, setArray] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', data.file[0])

    try {
      const res = await axios.post('http://127.0.0.1:5000/show', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setData(res.data)
      console.log(res)
    } catch (err) {}

    setLoading(false)
  }

  const loadScript = (src) => {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.src = src
      script.addEventListener('load', function () {
        resolve()
      })
      script.addEventListener('error', function (e) {
        reject(e)
      })
      document.body.appendChild(script)
      document.body.removeChild(script)
    })
  }

  const changeFormat = (time, format) => {

    console.log(time)
    console.log(format)
    var new_time;

    //change the format time if pm
    if (format == 'PM') {
      var hour = time

      var a = hour.split(':')

      var hour_number = (parseInt(a[0]) + 12).toString()

      if (a.length == 1) {
        new_time = hour_number + ':00'
      } else if (a.length == 2) {
        new_time = hour_number + ':' + a[1]
      }
    } else if (format == 'AM') {
      //if the hour is am we just change the to suitable time string
      new_time = time
    }

    console.log( new_time)

    return new_time
  }

  // const arr = changeFormat(data)

  useEffect(() => {
    setData(info)
    loadScript('https://azrihasin.github.io/crs-scheduler/src/js/main.js')

    setTimeout(() => {
      setTimeout(() => {
        setLoading(false)
      }, 500)
      loadScript('https://azrihasin.github.io/crs-scheduler/src/js/main.js')
    }, 200)
  }, [])

  useEffect(() => {
    loadScript('https://azrihasin.github.io/crs-scheduler/src/js/main.js')

    setTimeout(() => {
      setTimeout(() => {
        setLoading(false)
      }, 500)
      loadScript('https://azrihasin.github.io/crs-scheduler/src/js/main.js')
    }, 200)
  }, [data])

  console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('file', { required: true })}
          type="file"
          name="file"
        />
        <button>Submit</button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="js">
          <div>
            <header className="cd-main-header text-center flex flex-column flex-center">
              <p className="margin-top-md margin-bottom-xl">
                👈{' '}
                <a
                  className="cd-article-link"
                  href="https://codyhouse.co/gem/schedule-template"
                >
                  Article &amp; Download
                </a>
              </p>

              <h1 className="text-xl">Schedule Template</h1>
            </header>

            <div className="cd-schedule cd-schedule--loading margin-top-lg margin-bottom-lg js-cd-schedule">
              <div className="cd-schedule__timeline">
                <ul>
                  <li>
                    <span>09:00</span>
                  </li>
                  <li>
                    <span>09:30</span>
                  </li>
                  <li>
                    <span>10:00</span>
                  </li>
                  <li>
                    <span>10:30</span>
                  </li>
                  <li>
                    <span>11:00</span>
                  </li>
                  <li>
                    <span>11:30</span>
                  </li>
                  <li>
                    <span>12:00</span>
                  </li>
                  <li>
                    <span>12:30</span>
                  </li>
                  <li>
                    <span>13:00</span>
                  </li>
                  <li>
                    <span>13:30</span>
                  </li>
                  <li>
                    <span>14:00</span>
                  </li>
                  <li>
                    <span>14:30</span>
                  </li>
                  <li>
                    <span>15:00</span>
                  </li>
                  <li>
                    <span>15:30</span>
                  </li>
                  <li>
                    <span>16:00</span>
                  </li>
                  <li>
                    <span>16:30</span>
                  </li>
                  <li>
                    <span>17:00</span>
                  </li>
                  <li>
                    <span>17:30</span>
                  </li>
                  <li>
                    <span>18:00</span>
                  </li>
                </ul>
              </div>

              <div className="cd-schedule__events">
                <ul>
                  <li className="cd-schedule__group">
                    <div className="cd-schedule__top-info">
                      <span>Monday</span>
                    </div>

                    <ul>
                      {data == null ? (
                        <div> </div>
                      ) : (
                        data.monday.map((p) => (
                          <li className="cd-schedule__event">
                            <a
                              data-start={changeFormat(p.start_time,p.time_format)}
                              data-end={changeFormat(p.end_time,p.time_format)}
                              data-content="event-abs-circuit"
                              data-event="event-1"
                              href="#0"
                            >
                              <em className="cd-schedule__name">{p.code}</em>
                            </a>
                          </li>
                        ))
                      )}
                    </ul>
                  </li>

                  <li className="cd-schedule__group">
                    <div className="cd-schedule__top-info">
                      <span>Tuesday</span>
                    </div>

                    <ul>
                      <li className="cd-schedule__event">
                        <a
                          data-start="10:00"
                          data-end="11:00"
                          data-content="event-rowing-workout"
                          data-event="event-2"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Rowing Workout</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="11:30"
                          data-end="13:00"
                          data-content="event-restorative-yoga"
                          data-event="event-4"
                          href="#0"
                        >
                          <em className="cd-schedule__name">
                            Restorative Yoga
                          </em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="13:30"
                          data-end="15:00"
                          data-content="event-abs-circuit"
                          data-event="event-1"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Abs Circuit</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="15:45"
                          data-end="16:45"
                          data-content="event-yoga-1"
                          data-event="event-3"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Yoga Level 1</em>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="cd-schedule__group">
                    <div className="cd-schedule__top-info">
                      <span>Wednesday</span>
                    </div>

                    <ul>
                      <li className="cd-schedule__event">
                        <a
                          data-start="09:00"
                          data-end="10:15"
                          data-content="event-restorative-yoga"
                          data-event="event-4"
                          href="#0"
                        >
                          <em className="cd-schedule__name">
                            Restorative Yoga
                          </em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="10:45"
                          data-end="11:45"
                          data-content="event-yoga-1"
                          data-event="event-3"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Yoga Level 1</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="12:00"
                          data-end="13:45"
                          data-content="event-rowing-workout"
                          data-event="event-2"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Rowing Workout</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="13:45"
                          data-end="15:00"
                          data-content="event-yoga-1"
                          data-event="event-3"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Yoga Level 1</em>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="cd-schedule__group">
                    <div className="cd-schedule__top-info">
                      <span>Thursday</span>
                    </div>

                    <ul>
                      <li className="cd-schedule__event">
                        <a
                          data-start="09:30"
                          data-end="10:30"
                          data-content="event-abs-circuit"
                          data-event="event-1"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Abs Circuit</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="12:00"
                          data-end="13:45"
                          data-content="event-restorative-yoga"
                          data-event="event-4"
                          href="#0"
                        >
                          <em className="cd-schedule__name">
                            Restorative Yoga
                          </em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="15:30"
                          data-end="16:30"
                          data-content="event-abs-circuit"
                          data-event="event-1"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Abs Circuit</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="17:00"
                          data-end="18:30"
                          data-content="event-rowing-workout"
                          data-event="event-2"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Rowing Workout</em>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="cd-schedule__group">
                    <div className="cd-schedule__top-info">
                      <span>Friday</span>
                    </div>

                    <ul>
                      <li className="cd-schedule__event">
                        <a
                          data-start="10:00"
                          data-end="11:00"
                          data-content="event-rowing-workout"
                          data-event="event-2"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Rowing Workout</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="12:30"
                          data-end="14:00"
                          data-content="event-abs-circuit"
                          data-event="event-1"
                          href="#0"
                        >
                          <em className="cd-schedule__name">Abs Circuit</em>
                        </a>
                      </li>

                      <li className="cd-schedule__event">
                        <a
                          data-start="15:45"
                          data-end="16:45"
                          data-content="event-yoga-1"
                          data-event="event-3"
                          href="#0"
                        >
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

                <a href="#0" className="cd-schedule-modal__close text-replace">
                  Close
                </a>
              </div>

              <div className="cd-schedule__cover-layer"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
