'use client'

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Unit, TempUnit, FilterType, WeatherResponse } from "./lib/definitions";
import { tempUnitMap } from "./lib/maps";

export default function Home() {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [tempUnit, setTempUnit] = useState<TempUnit>('K')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<FilterType>({
    city: 'London',
    stateCode: '',
    country: '',
    unit: 'standard',
    lang: 'en'
  })

  useEffect(() => {
    fetchResult()
  }, [])

  const fetchResult = async () => {
    setError('')
    try {
      const geo_response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${[filter.city, filter.stateCode, filter.country].filter(Boolean).join(',')}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )

      const geo_data = await geo_response.json()

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo_data[0].lat}&lon=${geo_data[0].lon}&units=${filter.unit}&lang=${filter.lang}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )

      setData(await response.json())
      setTempUnit(tempUnitMap[filter.unit])
    }
    catch {
      setError('Error fetching data from api...!')
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    fetchResult()
  }

  return (
    <div>
      <h1 className="px-3 pb-4 text-3xl font-bold text-orange-400">Current Forcast</h1>
      <form className="block" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-2 items-center">
            <label htmlFor="city">City:</label>{' '}
            <input
              type="text"
              name="city"
              id='city'
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              required
              placeholder="Enter city name" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="country">Country:</label>{' '}
            <input
              type="text"
              name="country"
              id='country'
              value={filter.country}
              onChange={(e) => setFilter({ ...filter, country: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Enter country name(optional)" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="stateCode">State Code:</label>{' '}
            <input
              type="text"
              name="stateCode"
              id='stateCode'
              value={filter.stateCode}
              onChange={(e) => setFilter({ ...filter, stateCode: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Enter state code(optional)" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="unit">Unit:</label>{' '}
            <select
              name="unit"
              id="unit"
              value={filter.unit}
              onChange={(e) => setFilter({ ...filter, unit: e.target.value as Unit })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6">
              <option value="standard" className="hover:bg-orange-300">standard</option>
              <option value="metric" className="hover:bg-orange-300">Metric</option>
              <option value="imperial" className="hover:bg-orange-300">Imperial</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="unit">Language:</label>{' '}
            <select
              name="lang"
              value={filter.lang}
              onChange={(e) => setFilter({ ...filter, lang: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-orange-300 text-white hover:bg-orange-500 focus:outline-none transition">
            Filter results
          </button>
        </div>
      </form>

      {
        error && <div className="p-3 bg-red-500 text-white">{error}</div>
      }
      <div className="my-3">
        {
          data && (
            <>
              <h3 className="p-1 text-center text-2xl text-white rounded-md bg-orange-400" id='weather-report-heading'>Weather Report</h3>
              <div className="p-4 text-center text-orange-700 text-base" id='weather-report-subheading'>
                Following is the weather report for <strong>{data.name}</strong> at <strong>{new Date(data.dt * 1000).toUTCString()}</strong>.
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Weather</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div className="font-medium" id='weather-name'><strong>{data.weather[0].main}</strong> - {data.weather[0].description}</div>
                    <div>
                      {
                        data.weather[0].icon && <Image
                          width={120}
                          height={120}
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                          alt='weather-image' />
                      }
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Wind</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div id='wind-speed'>
                      <span className="font-medium">Speed:</span> <strong>{data.wind.speed} m/s</strong>
                    </div>
                    <div id='wind-direction'>
                      <span className="font-medium">Direction:</span> <strong>{data.wind.deg}°</strong>
                    </div>
                    {
                      data.wind.gust && (
                        <div id='wind-gust'>
                          <span className="font-medium">Gust:</span> <strong>{data.wind.gust} m/s</strong>
                        </div>
                      )
                    }
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Cloud</h3>
                  </div>
                  <div className="space-y-2 text-gray-700" id='cloud-text'>
                    <div>
                      <span className="font-medium">The cloud covers the <strong>{data.clouds.all}% of sky</strong>.</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {data.clouds.all > 50 ? 'The sky is mostly cloudy today.' : 'The sky is relatively clear today.'}
                      </span>
                    </div>
                    <div>
                      {
                        data.rain && data.rain['1h'] && <span className="font-medium">
                          Also the rain of {data.rain['1h']} mm falls within last hour.
                        </span>
                      }
                      {
                        data.snow && data.snow['1h'] && <span className="font-medium">
                          Also the snow of {data.snow['1h']} mm falls within last hour.
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Location Details</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    {
                      data.name && <div id='location-city'>
                        <span className="font-medium">City:</span> <strong>{data.name}</strong>
                      </div>
                    }
                    {
                      data.sys.country && <div id='location-country'>
                        <span className="font-medium">Country:</span> <strong>{data.sys.country}</strong>
                      </div>
                    }
                    <div id='location-sunrise'>
                      <span className="font-medium">Sunrise:</span> <strong>{new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                    </div>
                    <div id='location-sunset'>
                      <span className="font-medium">Sunset:</span> <strong>{new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                    </div>
                    <div id='location-offset'>
                      <span className="font-medium">UTC Offset:</span> <strong>
                        {parseInt(data.timezone) > 0 && '+'}{Math.floor(parseInt(data.timezone) / 3600)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Temperature</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div id='temperature-avg'>
                      <span className="font-medium">Average Temp:</span> <strong>{data.main.temp}&deg;{tempUnit}</strong>
                    </div>
                    <div id='temperature-like'>
                      <span className="font-medium">Feels Like:</span> <strong>{data.main.feels_like}&deg;{tempUnit}</strong>
                    </div>
                    <div id='temperature-min'>
                      <span className="font-medium">Minimum Temp:</span> <strong>{data.main.temp_min}&deg;{tempUnit}</strong>
                    </div>
                    <div id='temperature-max'>
                      <span className="font-medium">Maximum Temp:</span> <strong>{data.main.temp_max}&deg;{tempUnit}</strong>
                    </div>
                    <div id='temperature-humidity'>
                      <span className="font-medium">Humidity:</span> <strong>{data.main.humidity}%</strong>
                    </div>
                    {
                      data.main.sea_level && <div id='temperature-sea'>
                        <span className="font-medium">Pressure at Sea Level:</span> <strong>{data.main.sea_level} hPa</strong>
                      </div>
                    }
                    {
                      data.main.grnd_level && <div id='temperature-ground'>
                        <span className="font-medium">Pressure at Ground Level:</span> <strong>{data.main.grnd_level} hPa</strong>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}
