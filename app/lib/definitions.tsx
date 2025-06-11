export type Unit = 'standard' | 'metric' | 'imperial'

export type TempUnit = 'K' | 'C' | 'F'

export type FilterType = {
    lat: string
    lon: string
    unit: Unit
    lang: string
}

export type FourDaysFilterType = {
    city:string,
    country:string
    stateCode:string
    cnt: string
    lang: string
}

export type WeatherResponse = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
        temp_kf?: number
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    rain?: {
        '1h'?: number
        '3h'?: number
    };
    snow?: {
        '1h'?: number
        '3h'?: number
    };
    dt: number;
    sys: {
        type?: number;
        id?: number;
        message?: number;
        country: string;
        sunrise: number;
        sunset: number;
        pod?: 'd' | 'n'
    };
    timezone: string;
    id: number;
    name: string;
    cod: number;
    pop?: number;
    dt_txt?: string
};

export type FourDaysWeatherResponse = {
    cod: string
    message: number
    cnt: number
    list: WeatherResponse[]
    city: {
        id: number
        name: string
        coord: {
            lat: number
            lon: number
        }
        country: string
        timezone: number
        sunrise: number
        sunset: number
    }
}
