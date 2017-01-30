import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
	//weather: Observable<Weather.IWeather>;
	weather: Weather.IWeather;
	error: any;

	selectedLocationSubject: Subject<string> = new Subject<string>();

	constructor(private weatherService: WeatherDownloaderService) { }

	ngOnInit(): void {
		var savedLocationsString = localStorage.getItem(this.savedLocationsKey);
		if (!savedLocationsString) {
			savedLocationsString = JSON.stringify([]);
			localStorage.setItem(this.savedLocationsKey, savedLocationsString);
		}
		this.locations = JSON.parse(savedLocationsString);

		this.selectedLocationSubject
			.debounceTime(300)
			.distinctUntilChanged()
			//.switchMap(this.weatherService.getCurrentWeather)
			.switchMap(location => {
				return this.weatherService.getCurrentWeather(location);
			})
			.subscribe(weather => this.weather = weather);

		setTimeout(() => {
			if (this.locations.length > 0) {
				this.selectedLocation = this.locations[0].name;
				console.log("Initializing location with", this.selectedLocation);
				this.selectedLocationSubject.next(this.selectedLocation);
			}
		}, 0);
	}

	addLocation(): void {
		if (!this.newLocation) return;
		var item: ISavedLocation = {
			name: this.newLocation,
		}
		if (this.locations.findIndex(value => value.name === item.name) >= 0) return;
		this.locations.push(item);
		localStorage.setItem(this.savedLocationsKey, JSON.stringify(this.locations));
		this.newLocation = "";
	}

	onLocationChanges(): void {
		console.log('New location selected:', this.selectedLocation);
		this.selectedLocationSubject.next(this.selectedLocation);
	}

	onTabChange($event: NgbTabChangeEvent) {
		console.log($event.nextId);
	}
}
