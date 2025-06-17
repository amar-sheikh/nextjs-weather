import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Page from '../app/page'

const lat_0_lon_0_data = {
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
    wind: { speed: 5.7, deg: 200 },
    clouds: { all: 40 },
    main: {
        temp: 298.15,
        feels_like: 299.26,
        temp_min: 297.04,
        temp_max: 299.82,
        humidity: 65,
    },
    dt: 1687012800,
    name: 'Test City',
    sys: { country: 'Test Country', sunrise: 1686964800, sunset: 1687005000 },
    timezone: 10800,
}

const lat_20_lon_negative_45_data = {
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '13d' }],
    wind: { speed: 6.83, deg: 72, gust: 7.71 },
    clouds: { all: 100 },
    main: {
        temp: 24.45,
        feels_like: 24.91,
        temp_min: 24.45,
        temp_max: 24.45,
        humidity: 75,
        sea_level: 9008,
        grnd_level: 1020
    },
    dt: 1750078187,
    sys: { sunrise: 1750080000, sunset: 1750041600 },
    timezone: -18000,
}

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('lat=0') && url.includes('lon=0')) {
            return Promise.resolve({
                json: () => Promise.resolve(lat_0_lon_0_data),
            });
        }
        if (url.includes('lat=20') && url.includes('lon=-45') && url.includes('units=metric')) {
            return Promise.resolve({
                json: () => Promise.resolve(lat_20_lon_negative_45_data),
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


describe('Page', () => {
    it('renders with lat 0 and lon 0', async () => {
        const { container } = render(<Page />)

        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Current Forcast');

        await waitFor(() => {
            expect(container.querySelector('#weather-report-heading')?.textContent).toBe('Weather Report')
        })
        expect(
            container.querySelector('#weather-report-subheading')?.textContent
        ).toBe(
            `Following is the weather report for latitute °0 and longitude °0 at Sat, 17 Jun 2023 14:40:00 GMT.`
        )

        expect(container.querySelector('#weather-name')?.textContent).toBe(`Clouds - scattered clouds`)
        expect((screen.getByAltText('weather-image') as HTMLImageElement).src).toContain('03d')

        expect(container.querySelector('#wind-speed')?.textContent).toBe('Speed: 5.7 m/s')
        expect(container.querySelector('#wind-direction')?.textContent).toBe('Direction: 200°')

        expect(container.querySelector('#cloud-text')?.textContent).toBe(
            'The cloud covers the 40% of sky.The sky is relatively clear today.'
        )

        expect(container.querySelector('#location-city')?.textContent).toBe('City: Test City')
        expect(container.querySelector('#location-country')?.textContent).toBe('Country: Test Country')
        expect(container.querySelector('#location-sunrise')?.textContent).toBe('Sunrise: 06:20 AM')
        expect(container.querySelector('#location-sunset')?.textContent).toBe('Sunset: 05:30 PM')
        expect(container.querySelector('#location-offset')?.textContent).toBe('UTC Offset: +3')

        expect(container.querySelector('#temperature-avg')?.textContent).toBe('Average Temp: 298.15°K')
        expect(container.querySelector('#temperature-like')?.textContent).toBe('Feels Like: 299.26°K')
        expect(container.querySelector('#temperature-min')?.textContent).toBe('Minimum Temp: 297.04°K')
        expect(container.querySelector('#temperature-max')?.textContent).toBe('Maximum Temp: 299.82°K')
        expect(container.querySelector('#temperature-humidity')?.textContent).toBe('Humidity: 65%')
    })

    it('renders with lat 20, lon -45 and unit metric', async () => {
        const { container } = render(<Page />)

        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Current Forcast');

        const lat_input = screen.getByLabelText('Latitute:');
        fireEvent.change(lat_input, { target: { value: '20' } });

        const lon_input = screen.getByLabelText('Longitude:');
        fireEvent.change(lon_input, { target: { value: '-45' } });

        const unit_input = screen.getByLabelText('Unit:');
        fireEvent.change(unit_input, { target: { value: 'metric' } });

        const submit_button = screen.getByText('Filter results');
        fireEvent.click(submit_button);

        await waitFor(() => {
            expect(
                container.querySelector('#weather-report-subheading')?.textContent
            ).toBe(
                `Following is the weather report for latitute °20 and longitude °-45 at Mon, 16 Jun 2025 12:49:47 GMT.`
            )
        })

        expect(container.querySelector('#weather-name')?.textContent).toBe(`Clouds - scattered clouds`)
        expect((screen.getByAltText('weather-image') as HTMLImageElement).src).toContain('13d')

        expect(container.querySelector('#wind-speed')?.textContent).toBe('Speed: 6.83 m/s')
        expect(container.querySelector('#wind-direction')?.textContent).toBe('Direction: 72°')
        expect(container.querySelector('#wind-gust')?.textContent).toBe('Gust: 7.71 m/s')

        expect(container.querySelector('#cloud-text')?.textContent).toBe(
            'The cloud covers the 100% of sky.The sky is mostly cloudy today.'
        )

        expect(container.querySelector('#location-sunrise')?.textContent).toBe('Sunrise: 06:20 PM')
        expect(container.querySelector('#location-sunset')?.textContent).toBe('Sunset: 07:40 AM')
        expect(container.querySelector('#location-offset')?.textContent).toBe('UTC Offset: -5')

        expect(container.querySelector('#temperature-avg')?.textContent).toBe('Average Temp: 24.45°C')
        expect(container.querySelector('#temperature-like')?.textContent).toBe('Feels Like: 24.91°C')
        expect(container.querySelector('#temperature-min')?.textContent).toBe('Minimum Temp: 24.45°C')
        expect(container.querySelector('#temperature-max')?.textContent).toBe('Maximum Temp: 24.45°C')
        expect(container.querySelector('#temperature-humidity')?.textContent).toBe('Humidity: 75%')
        expect(container.querySelector('#temperature-sea')?.textContent).toBe('Pressure at Sea Level: 9008 hPa')
        expect(container.querySelector('#temperature-ground')?.textContent).toBe('Pressure at Ground Level: 1020 hPa')
    })
})