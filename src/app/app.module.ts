import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { WeatherDownloaderService } from './weather-downloader.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { TemperaturePipe } from './temperature.pipe'

@NgModule({
	declarations: [
		AppComponent,
		CurrentWeatherComponent,
		TemperaturePipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		NgbModule.forRoot(),
	],
	providers: [
		WeatherDownloaderService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
