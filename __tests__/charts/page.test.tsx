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
            dt: 1750150800,
            main: {
                temp: 297.48,
                feels_like: 297.38,
                temp_min: 297.48,
                temp_max: 297.48,
                pressure: 1008,
                sea_level: 1008,
                grnd_level: 989,
                humidity: 54,
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
                all: 37
            },
            wind: {
                speed: 2.2,
                deg: 134,
                gust: 1.52
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
                temp: 297.04,
                feels_like: 296.87,
                temp_min: 296.16,
                temp_max: 297.04,
                pressure: 1007,
                sea_level: 1007,
                grnd_level: 987,
                humidity: 53,
                temp_kf: 0.88
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
                all: 47
            },
            wind: {
                speed: 3.3,
                deg: 144,
                gust: 2.43
            },
            visibility: 10000,
            pop: 0.2,
            "rain": {
                "3h": 0.16
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 12:00:00"
        },
        {
            dt: 1750172400,
            main: {
                temp: 295.28,
                feels_like: 295.27,
                temp_min: 294.18,
                temp_max: 295.28,
                pressure: 1006,
                sea_level: 1006,
                grnd_level: 987,
                humidity: 66,
                temp_kf: 1.1
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
                all: 79
            },
            wind: {
                speed: 1.99,
                deg: 204,
                gust: 4.09
            },
            visibility: 10000,
            pop: 0.96,
            "rain": {
                "3h": 1.25
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 15:00:00"
        },
        {
            dt: 1750183200,
            main: {
                temp: 293.14,
                feels_like: 293.47,
                temp_min: 293.14,
                temp_max: 293.14,
                pressure: 1005,
                sea_level: 1005,
                grnd_level: 987,
                humidity: 87,
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
                speed: 1.26,
                deg: 315,
                gust: 1.47
            },
            visibility: 10000,
            pop: 1,
            "rain": {
                "3h": 1.93
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-17 18:00:00"
        },
        {
            dt: 1750194000,
            main: {
                temp: 291.86,
                feels_like: 292.16,
                temp_min: 291.86,
                temp_max: 291.86,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 91,
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
                all: 100
            },
            wind: {
                speed: 1.69,
                deg: 352,
                gust: 2.85
            },
            visibility: 10000,
            pop: 1,
            "rain": {
                "3h": 0.66
            },
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-17 21:00:00"
        },
        {
            dt: 1750204800,
            main: {
                temp: 290.77,
                feels_like: 290.91,
                temp_min: 290.77,
                temp_max: 290.77,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 985,
                humidity: 89,
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
                all: 100
            },
            wind: {
                speed: 1.32,
                deg: 332,
                gust: 1.71
            },
            visibility: 10000,
            pop: 0.81,
            "rain": {
                "3h": 0.7
            },
            sys: {
                pod: "n"
            },
            dt_txt: "2025-06-18 00:00:00"
        },
        {
            dt: 1750215600,
            main: {
                temp: 286.86,
                feels_like: 286.69,
                temp_min: 286.86,
                temp_max: 286.86,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 985,
                humidity: 92,
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
                speed: 2.14,
                deg: 348,
                gust: 3.77
            },
            visibility: 10000,
            pop: 0.97,
            "rain": {
                "3h": 1.91
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 03:00:00"
        },
        {
            dt: 1750226400,
            main: {
                temp: 286.65,
                feels_like: 286.46,
                temp_min: 286.65,
                temp_max: 286.65,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
                humidity: 92,
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
                speed: 1.81,
                deg: 330,
                gust: 2.48
            },
            visibility: 10000,
            pop: 1,
            "rain": {
                "3h": 0.52
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 06:00:00"
        },
        {
            dt: 1750237200,
            main: {
                temp: 288.03,
                feels_like: 287.92,
                temp_min: 288.03,
                temp_max: 288.03,
                pressure: 1005,
                sea_level: 1005,
                grnd_level: 986,
                humidity: 90,
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
                speed: 2.12,
                deg: 330,
                gust: 2.78
            },
            visibility: 10000,
            pop: 0.52,
            "rain": {
                "3h": 0.27
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 09:00:00"
        },
        {
            dt: 1750248000,
            main: {
                temp: 291.12,
                feels_like: 290.98,
                temp_min: 291.12,
                temp_max: 291.12,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 986,
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
                speed: 1.96,
                deg: 341,
                gust: 2.8
            },
            visibility: 10000,
            pop: 0.29,
            "rain": {
                "3h": 0.13
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 12:00:00"
        },
        {
            dt: 1750258800,
            main: {
                temp: 292.13,
                feels_like: 291.86,
                temp_min: 292.13,
                temp_max: 292.13,
                pressure: 1004,
                sea_level: 1004,
                grnd_level: 985,
                humidity: 68,
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
                all: 77
            },
            wind: {
                speed: 2.77,
                deg: 330,
                gust: 3.64
            },
            visibility: 10000,
            pop: 0.29,
            "rain": {
                "3h": 0.26
            },
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 15:00:00"
        },
        {
            dt: 1750269600,
            main: {
                temp: 289.34,
                feels_like: 289.26,
                temp_min: 289.34,
                temp_max: 289.34,
                pressure: 1003,
                sea_level: 1003,
                grnd_level: 985,
                humidity: 86,
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
                all: 47
            },
            wind: {
                speed: 1.94,
                deg: 295,
                gust: 3.13
            },
            visibility: 10000,
            pop: 0.06,
            sys: {
                pod: "d"
            },
            dt_txt: "2025-06-18 18:00:00"
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
                json: () => Promise.resolve(london_data),
            });
        }

        if (url.includes('q=moscow') && url.includes('cnt=12')) {
            return Promise.resolve({
                json: () => Promise.resolve(moscow_data),
            });
        }

        return Promise.resolve({
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

            expect(screen.getByText('2025-06-16 15:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-16 18:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-16 21:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 00:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 03:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 06:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 09:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 12:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 15:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 18:00:00')).toBeInTheDocument()
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
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[0]?.textContent).toContain('temperature : 297.16')
        })

        // humidity chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[1], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[1]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[1]?.textContent).toContain('value : 47')
        })

        // pressure chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[2], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[2]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('sea_level : 1027')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('ground_level : 1022')
        })
    })

    it('renders with moscow data', async () => {
        const { container } = render(<ChartPage />)

        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Future Forecast');

        const city = screen.getByLabelText('City:')
        fireEvent.input(city, { target: { value: 'moscow' } })

        const cnt = screen.getByLabelText('Count:')
        fireEvent.input(cnt, { target: { value: '12' } })

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

            expect(screen.getByText('2025-06-17 09:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 12:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 15:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 18:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-17 21:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-18 00:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-18 03:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-18 06:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-18 09:00:00')).toBeInTheDocument()
            expect(screen.getByText('2025-06-18 12:00:00')).toBeInTheDocument()
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
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[0]?.textContent).toContain('temperature : 297.48')
        })

        // humidity chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[1], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[1]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[1]?.textContent).toContain('value : 54')
        })

        // pressure chart hover
        fireEvent.mouseMove(container.querySelectorAll('.recharts-wrapper')[2], {
            clientX: 100,
            clientY: 150,
        })
        await waitFor(() => {
            expect(container.querySelectorAll('.recharts-tooltip-wrapper')[2]).toHaveStyle('visibility: visible')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('sea_level : 1008')
            expect(container.querySelectorAll('.recharts-tooltip-item-list')[2]?.textContent).toContain('ground_level : 989')
        })
    })
})