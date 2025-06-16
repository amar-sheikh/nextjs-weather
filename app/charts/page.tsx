'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import {
  LineChart, BarChart, Bar, Line, Legend, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer
} from 'recharts'
import { FourDaysFilterType, FourDaysWeatherResponse } from '../lib/definitions'

const FourDaysPage = () => {
  const [filter, setFilter] = useState<FourDaysFilterType>({
    city: 'London',
    stateCode: '',
    country: '',
    cnt: '10',
    lang: 'en',
  })

  const [data, setData] = useState<FourDaysWeatherResponse | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResult()
  }, [])

  const temperatureChartData = data?.list.map(item => ({
    datetime: item.dt_txt ?? '',
    temperature: item.main.temp
  })) ?? []

  const humidityChartData = data?.list.map(item => ({
    datetime: item.dt_txt ?? '',
    value: item.main.humidity
  })) ?? []

  const pressureChartData = data?.list.map(item => ({
    datetime: item.dt_txt ?? '',
    sea_level: item.main.sea_level ?? 0,
    ground_level: item.main.grnd_level ?? 0,
    avg: Math.floor(((item.main.sea_level ?? 0) + (item.main.grnd_level ?? 0)) / 2)
  })) ?? []

  const fetchResult = async () => {
    setError('')
    try {
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast?q=${[filter.city, filter.stateCode, filter.country].filter(Boolean).join(',')}&cnt=${filter.cnt}&lang=${filter.lang}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      if (!response.ok) throw new Error('API request failed')

      const jsonData = await response.json()
      setData(jsonData)
    } catch {
      setError('Error fetching data from API.')
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    fetchResult()
  }

  return (
    <div>
      <h1 className="px-3 pb-4 text-3xl font-bold text-orange-400">Future Forecast</h1>

      <form className="block" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-2 items-center">
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              required
              placeholder="Enter city name" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              name="country"
              onChange={(e) => setFilter({ ...filter, country: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Enter country name(optional)" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="stateCode">State Code: </label>
            <input
              type="text"
              name="stateCode"
              onChange={(e) => setFilter({ ...filter, stateCode: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Enter state code(optional)" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="cnt">Count: </label>
            <input
              type="number"
              name="cnt"
              max={96}
              min={10}
              value={filter.cnt}
              onChange={(e) => setFilter({ ...filter, cnt: e.target.value })}
              className="py-1.5 pr-3 pl-1 grow rounded-sm border-orange-400 border-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Enter cnt" />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="unit">Language: </label>
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

      {error && <div className="p-3 bg-red-500 text-white rounded-md">{error}</div>}

      {data && (
        <div className="space-y-8">
          <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
            <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Temperature</h3>
            </div>
            <div className="text-gray-700">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart width={730} height={250} data={temperatureChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="temperature" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
            <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Humidity</h3>
            </div>
            <div className="text-gray-700">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart width={730} height={250} data={humidityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#FFC0CB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-lg shadow-orange-300 space-y-3">
            <div className="flex items-center justify-between border-b-2 border-orange-400 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Pressure</h3>
            </div>
            <div className="text-gray-700">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={pressureChartData} width={730} height={250} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="datetime" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sea_level" stroke="#8884d8" />
                  <Line type="monotone" dataKey="ground_level" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FourDaysPage
