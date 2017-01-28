export namespace Weather {
	export interface ICoord {
		lon: number;
		lat: number;
	}

	export interface IWeatherItem {
		id: number;
		main: string;
		description: string
		icon: string
	}

	export interface IMain {
		temp: number;
		pressure: number;
		humidity: number;
		temp_min: number;
		temp_max: number;
	}

	export interface IWind {
		speed: number;
		deg: number;
	}

	export interface IClouds {
		all: number;
	}

	export interface ISys {
		type: number;
		id: number;
		message: number;
		country: string;
		sunrise: number;
		sunset: number;
	}

	export interface IWeather {
		coord: ICoord;
		weather: IWeatherItem[];
		base: string;
		main: IMain;
		visibility: number;
		wind: IWind;
		clouds: IClouds;
		dt: number;
		sys: ISys;
		id: number;
		name: string;
		cod: number;
	}
}