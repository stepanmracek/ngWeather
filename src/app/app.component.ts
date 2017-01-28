import { Component, OnInit } from '@angular/core';

import { WeatherDownloaderService } from './weather-downloader.service';
import { Weather } from './iweather';
import { ISavedLocation } from './isavedlocation';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	savedLocationsKey: string = 'savedLocations';
	locations: ISavedLocation[] = [];
	newLocation: string = null;
	selectedLocation: string = null;
	weather: Weather.IWeather;
	error: any;

	constructor(private weatherService: WeatherDownloaderService) { }

	ngOnInit(): void {
		var savedLocationsString = localStorage.getItem(this.savedLocationsKey);
		if (!savedLocationsString) {
			savedLocationsString = JSON.stringify([]);
			localStorage.setItem(this.savedLocationsKey, savedLocationsString);
		}
		this.locations = JSON.parse(savedLocationsString);

		if (this.locations.length > 0) {
			this.selectedLocation = this.locations[0].name;
		}

		/*this.weatherService.getCurrentWeather(this.location)
			.subscribe(weather => this.weather = weather, error => this.error = error);*/
	}

	addLocation(): void {
		if (!this.newLocation) return;
		var item: ISavedLocation = {
			name: this.newLocation,
		}
		if (this.locations.findIndex(value => value.name === item.name) >= 0) return;
		this.locations.push(item);
		localStorage.setItem(this.savedLocationsKey, JSON.stringify(this.locations));
	}
}
