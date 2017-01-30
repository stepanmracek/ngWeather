import { Component, OnInit, Input } from '@angular/core';

import { Weather } from '../iweather'

@Component({
	selector: 'current-weather',
	templateUrl: './current-weather.component.html',
	styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

	@Input()
	weather: Weather.IWeather;

	constructor() { }

	ngOnInit() {
	}

}
