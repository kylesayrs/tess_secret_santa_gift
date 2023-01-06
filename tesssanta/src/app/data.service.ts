import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function Game(dictionary, items) {
	this.dictionary = dictionary;
	this.items = items;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  	private default_data = new Game("Urban",["Tess","Secret Santa","Alchohol"]);

	private messageSource = new BehaviorSubject(this.default_data);
	currentMessage = this.messageSource.asObservable();

	constructor() { }

	changeMessage(message) {
		this.messageSource.next(message)
	}
}
