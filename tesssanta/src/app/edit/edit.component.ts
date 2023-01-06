import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from "@angular/router"

function Game(dictionary, items) {
	this.dictionary = dictionary;
	this.items = items;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

	constructor(private data: DataService, private router: Router) { }

	game = new Game("Urban", ["Tess","Woodlief"])

	item_list = []

	dictionaries = ["Oxford","Urban"]

	selected_dictionary = ""

	random_words = ["Tea","Skrt","Gina","Shook","Salty","Woke","Mood",
	"Felicia","Receipts","Beat","Kiki","Cap","Swerve","Fleek","TBH","Slaps",
	"Slay","Read","Bruh","Realness","Dead","Shade","Bae","Boo","Snatched",
	"Tess","Basic","Yas","Goat","Extra","Gucci","Lit","Ratchet","Savage",
	"Stan","Thirsty","Chad","AF","Turnt","Twerk","Yeet","Yot","Yote","Beer",
	"Thirsty","Facts","Unicorn","Hoe","Whore","haha","Straight","Gay","Gey",
	"EMA","Shock Site","No Cap","Donald Trump","Obama","Cop","College",
	"Tufts University","Boston University","Dick","Feels","Tik Tok",
	"Tumblr","Instagram","Crash","White Knight","Shrooms","Whole Snack",
	"Brony","Whomst","Eighth","Woah","Boujie"]

	alc_words = ["Rum","Gin","Tequila","Brandy","Vodka","Sake","Mead",
	"Cider","Whisky","Beer","Natural Light","Absinthe",
	"Sangria","White Wine","Arrack","Red Wine","Rye","Soju","Champagne",
	"Grey Goose","Hard cider","Martini","Bud Light","Keystone Light",
	"Coors", "Budweiser","Natty Light","Jack Daniels"]

	sex_words = ["Threesome","Sex","Cum","Hicky","Bang","Fuck","Screw",
	"Condom","Shag","Donkey Punch"]
		
	ngOnInit() {
		// Sets up data subscription
		this.data.currentMessage.subscribe(message => this.game = message)
		this.item_list = this.game.items
	}

	public ngOnDestroy() {
		// Sends data to sibiling component (bubbles component)
		this.data.changeMessage(this.game)
	}

	removeItem(index) {
		if (index < 0) {return}
		if (index >= this.item_list.length) {return}

		delete this.item_list[index]

		let new_list = []
		for (let item of this.item_list) {
			if (typeof item !== 'undefined') {
				new_list.push(item)
			}
		}

		this.item_list = new_list

		this.updateGame()
	}

	updateValue(index, event) {
		let new_value = event.target.textContent;

		this.item_list[index] = new_value
	}

	input_text_value

	addItem() {
		// @ts-ignore
		let new_item = document.getElementById("add_input").value
		// @ts-ignore
		document.getElementById("add_input").value = ""
		this.item_list.push(new_item)

		this.updateGame()
	}

	updateGame() {
		this.game.items = this.item_list
	}

	selectChange($event) {
		this.game.dictionary = $event
	}

	randomWords() {
		this.item_list = JSON.parse(JSON.stringify(this.random_words));
		this.updateGame()
	}

	alcWords() {
		this.item_list = JSON.parse(JSON.stringify(this.alc_words));
		this.updateGame()
	}

	sexWords() {
		this.item_list = JSON.parse(JSON.stringify(this.sex_words));
		this.updateGame()
	}

	clear() {
		this.item_list = []
		this.updateGame()
	}
}
