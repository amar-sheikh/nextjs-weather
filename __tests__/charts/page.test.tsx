import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import type { ReactNode } from 'react'
import ChartPage from '../../app/charts/page'

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts')
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: ReactNode }) => (
            <OriginalModule.ResponsiveContainer width={800} height={800}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    }
})

const london_data = {
    cod: "200",
    message: 0,
    cnt: 10,
    list: [
        {
            dt: 1750086000,
            main: {
                temp: 297.16,
                feels_like: 296.84,
                temp_min: 297.16,
                temp_max: 298.89,
                pressure: 1027,
                sea_level: 1027,
                grnd_level: 1022,
                humidity: 47,
                temp_kf: -1.73
            },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d"
                }
            ],
            clouds: {
                all: 6
            },
            wind: {
                speed: 2.28,
                deg: 252,
                gust: 2.21
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-16 15:00:00"
        },
        {
            dt: 1750096800,
            main: {
                temp: 297.72,
                feels_like: 297.43,
                temp_min: 297.72,
                temp_max: 298.43,
                pressure: 1026,
                sea_level: 1026,
                grnd_level: 1021,
                humidity: 46,
                temp_kf: -0.71
            },
            weather: [
                {
                    id: 801,
                    main: "Clouds",
                    description: "few clouds",
                    icon: "02d"
                }
            ],
            clouds: {
                all: 14
            },
            wind: {
                speed: 3.23,
                deg: 233,
                gust: 3.15
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-16 18:00:00"
        },
        {
            dt: 1750107600,
            main: {
                temp: 293.34,
                feels_like: 293.14,
                temp_min: 293.34,
                temp_max: 293.34,
                pressure: 1027,
                sea_level: 1027,
                grnd_level: 1023,
                humidity: 66,
                temp_kf: 0
            },
            weather: [
                {
                    id: 803,
                    main: "Clouds",
                    description: "broken clouds",
                    icon: "04n"
                }
            ],
            clouds: {
                all: 75
            },
            wind: {
                speed: 2.24,
                deg: 261,
                gust: 5
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-16 21:00:00"
        },
        {
            dt: 1750118400,
            main: {
                temp: 290.42,
                feels_like: 290.19,
                temp_min: 290.42,
                temp_max: 290.42,
                pressure: 1027,
                sea_level: 1027,
                grnd_level: 1023,
                humidity: 76,
                temp_kf: 0
            },
            weather: [
                {
                    id: 802,
                    main: "Clouds",
                    description: "scattered clouds",
                    icon: "03n"
                }
            ],
            clouds: {
                all: 43
            },
            wind: {
                speed: 1.64,
                deg: 244,
                gust: 3.58
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-17 00:00:00"
        },
        {
            dt: 1750129200,
            main: {
                temp: 289.13,
                feels_like: 288.64,
                temp_min: 289.13,
                temp_max: 289.13,
                pressure: 1026,
                sea_level: 1026,
                grnd_level: 1022,
                humidity: 71,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04n"
                }
            ],
            clouds: {
                all: 98
            },
            wind: {
                speed: 1.69,
                deg: 247,
                gust: 4.28
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-17 03:00:00"
        },
        {
            dt: 1750140000,
            main: {
                temp: 289.76,
                feels_like: 289.1,
                temp_min: 289.76,
                temp_max: 289.76,
                pressure: 1027,
                sea_level: 1027,
                grnd_level: 1022,
                humidity: 62,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d"
                }
            ],
            clouds: {
                all: 94
            },
            wind: {
                speed: 2.39,
                deg: 257,
                gust: 3.93
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 06:00:00"
        },
        {
            dt: 1750150800,
            main: {
                temp: 294.68,
                feels_like: 294.22,
                temp_min: 294.68,
                temp_max: 294.68,
                pressure: 1026,
                sea_level: 1026,
                grnd_level: 1022,
                humidity: 51,
                temp_kf: 0
            },
            weather: [
                {
                    id: 802,
                    main: "Clouds",
                    description: "scattered clouds",
                    icon: "03d"
                }
            ],
            clouds: {
                all: 36
            },
            wind: {
                speed: 3.01,
                deg: 260,
                gust: 4.06
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 09:00:00"
        },
        {
            dt: 1750161600,
            main: {
                temp: 298.42,
                feels_like: 297.89,
                temp_min: 298.42,
                temp_max: 298.42,
                pressure: 1025,
                sea_level: 1025,
                grnd_level: 1021,
                humidity: 34,
                temp_kf: 0
            },
            weather: [
                {
                    id: 803,
                    main: "Clouds",
                    description: "broken clouds",
                    icon: "04d"
                }
            ],
            clouds: {
                all: 64
            },
            wind: {
                speed: 3.2,
                deg: 268,
                gust: 3.68
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 12:00:00"
        },
        {
            dt: 1750172400,
            main: {
                temp: 299.25,
                feels_like: 299.25,
                temp_min: 299.25,
                temp_max: 299.25,
                pressure: 1024,
                sea_level: 1024,
                grnd_level: 1020,
                humidity: 34,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d"
                }
            ],
            clouds: {
                all: 97
            },
            wind: {
                speed: 3.64,
                deg: 271,
                gust: 3.9
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 15:00:00"
        },
        {
            dt: 1750183200,
            main: {
                temp: 296.98,
                feels_like: 296.59,
                temp_min: 296.98,
                temp_max: 296.98,
                pressure: 1024,
                sea_level: 1024,
                grnd_level: 1020,
                humidity: 45,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d"
                }
            ],
            clouds: {
                all: 98
            },
            wind: {
                speed: 4.41,
                deg: 281,
                gust: 4.69
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 18:00:00"
        }
    ],
    city: {
        id: 2643743,
        name: "London",
        coord: {
            lat: 51.5085,
            lon: -0.1257
        },
        country: "GB",
        population: 1000000,
        timezone: 3600,
        sunrise: 1750045363,
        sunset: 1750105188
    }
}

const moscow_data = {
    cod: "200",
    message: 0,
    cnt: 12,
    list: [
        {
            dt: 1750172400,
            main: {
                temp: 70.41,
                feels_like: 70.39,
                temp_min: 69.49,
                temp_max: 70.41,
                pressure: 1006,
                sea_level: 1006,
                grnd_level: 987,
                humidity: 69,
                temp_kf: 0.51
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 77
            },
            wind: {
                speed: 4.99,
                deg: 177,
                gust: 11.56
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 1.67
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 15:00:00"
        },
        {
            dt: 1750183200,
            main: {
                temp: 68.02,
                feels_like: 68.47,
                temp_min: 66.6,
                temp_max: 68.02,
                pressure: 1005,
                sea_level: 1005,
                grnd_level: 987,
                humidity: 84,
                temp_kf: 0.79
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 89
            },
            wind: {
                speed: 5.03,
                deg: 273,
                gust: 7.61
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 1.65
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 18:00:00"
        },
        {
            dt: 1750194000,
            main: {
                temp: 64.87,
                feels_like: 65.52,
                temp_min: 64.87,
                temp_max: 64.87,
                pressure: 1005,
                sea_level: 1005,
                grnd_level: 986,
                humidity: 95,
                temp_kf: 0
            },
            weather: [
                {
                    id: 501,
                    main: "Rain",
                    description: "moderate rain",
                    icon: "10n"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 4.29,
                deg: 316,
                gust: 6.02
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 4.2
            },
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-17 21:00:00"
        },
        {
            dt: 1750204800,
            main: {
                temp: 62.35,
                feels_like: 62.83,
                temp_min: 62.35,
                temp_max: 62.35,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 97,
                temp_kf: 0
            },
            weather: [
                {
                    id: 501,
                    main: "Rain",
                    description: "moderate rain",
                    icon: "10n"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 3.69,
                deg: 317,
                gust: 6.73
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 3.1
            },
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-18 00:00:00"
        },
        {
            dt: 1750215600,
            main: {
                temp: 74.03,
                feels_like: 75.56,
                temp_min: 74.03,
                temp_max: 74.03,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 94,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 3.58,
                deg: 339,
                gust: 5.99
            },
            visibility: 10000,
            pop: 0.74,
            rain: {
                "3h": 0.33
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 03:00:00"
        },
        {
            dt: 1750226400,
            main: {
                temp: 64.76,
                feels_like: 65.41,
                temp_min: 64.76,
                temp_max: 64.76,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 95,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 4.63,
                deg: 334,
                gust: 8.19
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 2
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 06:00:00"
        },
        {
            dt: 1750237200,
            main: {
                temp: 61.86,
                feels_like: 61.79,
                temp_min: 61.86,
                temp_max: 61.86,
                pressure: 1005,
                sea_level: 1005,
                grnd_level: 986,
                humidity: 86,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 2.66,
                deg: 324,
                gust: 4.9
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 1.51
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 09:00:00"
        },
        {
            dt: 1750248000,
            main: {
                temp: 63.5,
                feels_like: 63.41,
                temp_min: 63.5,
                temp_max: 63.5,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 82,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 4.68,
                deg: 302,
                gust: 7.05
            },
            visibility: 10000,
            pop: 1,
            rain: {
                "3h": 1.75
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 12:00:00"
        },
        {
            dt: 1750258800,
            main: {
                temp: 64.69,
                feels_like: 64.47,
                temp_min: 64.69,
                temp_max: 64.69,
                pressure: 1003,
                sea_level: 1003,
                grnd_level: 985,
                humidity: 77,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 7.38,
                deg: 293,
                gust: 10.31
            },
            visibility: 10000,
            pop: 0.72,
            rain: {
                "3h": 0.71
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 15:00:00"
        },
        {
            dt: 1750269600,
            main: {
                temp: 60.67,
                feels_like: 60.58,
                temp_min: 60.67,
                temp_max: 60.67,
                pressure: 1003,
                sea_level: 1003,
                grnd_level: 984,
                humidity: 88,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d"
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 5.57,
                deg: 298,
                gust: 12.93
            },
            visibility: 10000,
            pop: 0.54,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 18:00:00"
        },
        {
            dt: 1750280400,
            main: {
                temp: 57.42,
                feels_like: 57.24,
                temp_min: 57.42,
                temp_max: 57.42,
                pressure: 1001,
                sea_level: 1001,
                grnd_level: 983,
                humidity: 93,
                temp_kf: 0
            },
            weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10n"
                }
            ],
            clouds: {
                all: 52
            },
            wind: {
                speed: 4.99,
                deg: 276,
                gust: 9.89
            },
            visibility: 10000,
            pop: 0.38,
            rain: {
                "3h": 0.16
            },
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-18 21:00:00"
        },
        {
            dt: 1750291200,
            main: {
                temp: 55.22,
                feels_like: 54.68,
                temp_min: 55.22,
                temp_max: 55.22,
                pressure: 1000,
                sea_level: 1000,
                grnd_level: 981,
                humidity: 90,
                temp_kf: 0
            },
            weather: [
                {
                    id: 802,
                    main: "Clouds",
                    description: "scattered clouds",
                    icon: "03n"
                }
            ],
            clouds: {
                all: 39
            },
            wind: {
                speed: 4.97,
                deg: 262,
                gust: 10.56
            },
            visibility: 10000,
            pop: 0.09,
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-19 00:00:00"
        }
    ],
    "city": {
        id: 524901,
        "name": "Moscow",
        "coord": {
            "lat": 55.7522,
            "lon": 37.6156
        },
        "country": "RU",
        "population": 1000000,
        "timezone": 10800,
        "sunrise": 1750121059,
        "sunset": 1750184198
    }
}

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('q=London')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(london_data),
            });
        }

        if (url.includes('q=moscow') && url.includes('cnt=12') && url.includes('units=imperial')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(moscow_data),
            });
        }

        return Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'No data for this location' }),
        });
    }) as jest.Mock
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe('ChartPage', () => {
    it('renders with london data', async () => {
        const { container } = render(<ChartPage />)

        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Future Forecast');

        await waitFor(() => {
            expect(screen.getByText('Temperature')).toBeInTheDocument()
            expect(screen.getByText('Humidity')).toBeInTheDocument()
            expect(screen.getByText('Pressure')).toBeInTheDocument()

            expect(screen.getByText('temperature')).toBeInTheDocument();
            expect(screen.getByText('value')).toBeInTheDocument();
            expect(screen.getByText('sea_level')).toBeInTheDocument();
            expect(screen.getByText('ground_level')).toBeInTheDocument();

            expect(screen.getAllByText('2025-06-16 15:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-16 18:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-16 21:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 00:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 03:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 06:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 09:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 12:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 15:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 18:00:00')).toHaveLength(3)
        })

        const bars = container.querySelectorAll('.recharts-layer.recharts-bar-rectangle')
        expect(bars.length).toBe(20)

        const lines = container.querySelectorAll('.recharts-line-curve')
        expect(lines.length).toBe(2)

        // temperature chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[0], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[0]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[0]?.textContent).toContain('temperature : 297.16°K')
        })

        // humidity chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[1], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[1]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[1]?.textContent).toContain('value : 47%')
        })

        // pressure chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[2], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[2]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('sea_level : 1027 hPa')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('ground_level : 1022 hPa')
        })
    })

    it('renders with moscow data, count 12 and unit imperial', async () => {
        const { container } = render(<ChartPage />)

        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Future Forecast');

        const city = screen.getByLabelText('City:')
        fireEvent.input(city, { target: { value: 'moscow' } })

        const cnt = screen.getByLabelText('Count:')
        fireEvent.input(cnt, { target: { value: '12' } })

        const unit_input = screen.getByLabelText('Unit:');
        fireEvent.change(unit_input, { target: { value: 'imperial' } });

        const submit_button = screen.getByText('Filter results')
        fireEvent.click(submit_button)

        await waitFor(() => {

            expect(screen.getByText('Temperature')).toBeInTheDocument()
            expect(screen.getByText('Humidity')).toBeInTheDocument()
            expect(screen.getByText('Pressure')).toBeInTheDocument()

            expect(screen.getByText('temperature')).toBeInTheDocument();
            expect(screen.getByText('value')).toBeInTheDocument();
            expect(screen.getByText('sea_level')).toBeInTheDocument();
            expect(screen.getByText('ground_level')).toBeInTheDocument();

            expect(screen.getAllByText('2025-06-17 15:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 18:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-17 21:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 00:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 03:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 06:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 09:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 12:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 15:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 18:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-18 21:00:00')).toHaveLength(3)
            expect(screen.getAllByText('2025-06-19 00:00:00')).toHaveLength(3)
        })

        const bars = container.querySelectorAll('.recharts-layer.recharts-bar-rectangle')
        expect(bars.length).toBe(24)

        const lines = container.querySelectorAll('.recharts-line-curve')
        expect(lines.length).toBe(2)

        // temperature chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[0], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[0]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[0]?.textContent).toContain('temperature : 70.41°F')
        })

        // humidity chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[1], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[1]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[1]?.textContent).toContain('value : 69%')
        })

        // pressure chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[2], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[2]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('sea_level : 1006 hPa')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('ground_level : 987 hPa')
        })
    })
})