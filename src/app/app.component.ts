import { Component, OnInit } from '@angular/core';

import { WeatherDownloaderService } from './weather-downloader.service';
import { Weather } from './iweather';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	weather: Weather.IWeather;
	error: any;

	constructor(private weatherService: WeatherDownloaderService) { }

	ngOnInit(): void {
		this.weatherService.getCurrentWeather('Brno')
			.subscribe(weather => this.weather = weather, error => this.error = error);
	}
}
