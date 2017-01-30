import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Weather } from './iweather'


@Injectable()
export class WeatherDownloaderService {
	private apiKey: string = 'ADD-YOUR-API-KEY-HERE';

	constructor(private http: Http) {
	}

	private handleResponse<T>(response: Response): T {
		var weather: Weather.IWeather;
		return response.json() as T;
	}

	private handleError(error: any) {
		console.log(error);
		return Observable.throw(error);
	}

	getCurrentWeather(location: string): Observable<Weather.IWeather> {
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + this.apiKey;
		console.log("getCurrentWeather() called; location:", location, "; this: ", this);
		return this.http.get(url).map(this.handleResponse).catch(this.handleError);
	}

}
