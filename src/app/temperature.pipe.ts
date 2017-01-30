import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

	transform(value: any, args?: any): any {
		return ((+value) - 272.15).toFixed(1) + "°C";
	}

}
