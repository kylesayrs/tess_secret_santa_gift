import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from "@angular/router"

import { CountdownComponent } from 'ngx-countdown';
import { HttpClient } from '@angular/common/http';

function Game(dictionary, items) {
  this.dictionary = dictionary;
  this.items = items;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})

export class PlayComponent implements OnInit {

  constructor(private data: DataService, private router: Router, private http:HttpClient) { }

  @ViewChild('cd', { static: false })
  private countdown: CountdownComponent;

  game = new Game("Urban",["Default"])

  announcement_text : String
  hint_text : String
  answer_text : String
  announcement_subtext : String

  word : String
  word_list : String[]

  ngOnInit() {

  	// Get data from edit component
	  this.data.currentMessage.subscribe(message => this.game = message)

    this.word_list = JSON.parse(JSON.stringify(this.game.items));

    this.announcement_text = "Ready to start?"
    this.hint_text = ""
    this.answer_text = ""
    this.announcement_subtext = "Click here to begin"
    
  }

  public ngOnDestroy() {
    // Sends data to sibiling component (bubbles component)
    this.data.changeMessage(this.game)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  startGame() {
    console.log("started game")

    this.announcement_text = "3"
    this.hint_text = ""
    this.answer_text = ""
    this.announcement_subtext = ""
    this.countdown.restart()
    this.handleDefPromise()
  }

  countDownFunction(ms, i, def) {
    if (i == 0) {
      this.displayDefinition(def)
      return
    }
    this.announcement_text = i.toString()
    this.sleep(1000).then(() => {
      this.announcement_text = (i-1).toString();
      this.countDownFunction(ms, i-1, def)
    })
  }

  handleDefPromise() {

    if (this.word_list.length == 0) {
      this.word = "Game over"
    } else {
      this.word = this.word_list[Math.round(Math.random()*(this.word_list.length-1))]
    }

    let promise = new Promise((resolve, reject) => {
      this.announcement_text = "Loading..."
      this.requestDef(resolve, reject)
    });

    promise.then((def) => {
      this.countDownFunction(1000, 3, def)
    }, (def) => {
      this.countDownFunction(1000, 3, def);
    })
  }

  displayDefinition(def) {
    console.log("displaying " + def)
    this.hint_text = this.obfuscateWord()
    this.answer_text = "Show Answer"
    this.countdown.begin()

    this.removeValue(this.word)

    this.announcement_text = def

    this.sleep(10000).then(() => {
      if (this.countdown.left < 100 || this.countdown.left > 15000) {
        console.log("stopped")
        this.countdown.stop()
        this.showAnswer()
      }
    })
  }

  removeValue(val) {
    let index = this.word_list.indexOf(val)
    if (index > -1) {
      this.word_list.splice(index, 1);
    }
  }

  obfuscateWord() {
    let obfuscated = ""
    for (let i=0; i<this.word.length; i++) {
      if (this.word[i] == " ") { obfuscated += " "; continue }
      if (Math.random() >= 0.25) {
        obfuscated += "_"
      } else {
        obfuscated += this.word[i]
      }
    }

    if (obfuscated == this.word) { return this.obfuscateWord() }
    return obfuscated
  }

  showAnswer() {
    this.hint_text = ""
    this.answer_text = this.word
    this.announcement_subtext = "restart"
    this.countdown.stop()
  }

  requestDef(resolve, reject) {
    let promise = new Promise((resolve, reject) => this.requestUrban(resolve, reject))

    promise.then((def) => {
      resolve (def)
    }, (def) => {
      reject (def)
    })
  }

  requestUrban(resolve, reject) {

    // Special cases
    if (this.word.toLowerCase() == "tess") {
      resolve("An spotanious chick who goes to BU. Potato fiend")
    }
    if (this.word.toLowerCase() == "kyle") {
      resolve("A giant nerd who spent way too fucking long coding this app")
    }
    if (this.word.toLowerCase() == "sophie") {
      resolve("An awesome girl who made the art for this app")
    }
    if (this.word.toLowerCase() == "james") {
      resolve("Hearthstone World Champion 2020")
    }
    if (this.word.toLowerCase() == "karla") {
      resolve("Girl who is in love with Morgan")
    }
    if (this.word.toLowerCase() == "shervin") {
      resolve("Probably gonna get caught for insider trading")
    }
    if (this.word.toLowerCase() == "nerd") {
      resolve("Kyle Sayers in 4 letters")
    }
    if (this.word.toLowerCase() == "jack daniels") {
      resolve("Kyle's alcohol of choice (best with coke)")
    }
    if (this.word.toLowerCase() == "branson") {
      resolve("The most questionable way to spend 40K")
    }
    if (this.word.toLowerCase() == "bulls") {
      resolve("Branson school mascot")
    }
    if (this.word.toLowerCase() == "laney") {
      resolve("14 times")
    }
    if (this.word.toLowerCase() == "woody") {
      resolve("#free_____")
    }
    if (this.word.toLowerCase() == "spit sisters") {
      resolve("Top of the branson female tier. A little purebred")
    }
    if (this.word.toLowerCase() == "city girls") {
      resolve("Top of the branson female tier. A little purebred")
    }
    if (this.word.toLowerCase() == "marin girls") {
      resolve("Kinda a social class at Branson. Girls who lived in marin")
    }
    if (this.word.toLowerCase() == "no drugs") {
      resolve("Probably the best girl social group at Branson")
    }
    if (this.word.toLowerCase() == "dads") {
      resolve("Everett, Adam, people who were good at sports")
    }
    if (this.word.toLowerCase() == "memes") {
      resolve("Nick, Tommy, Nik, Simon")
    }
    if (this.word.toLowerCase() == "kyle's not drunk") {
      resolve("Best social group that got destroyed when we started talking about abortion #rip #babyfetus")
    }
    if (this.word.toLowerCase() == "knd") {
      resolve("Best social group that got destroyed when we started talking about abortion #rip #babyfetus")
    }

    console.log("requesting" + this.word)

    // Replace word
    let word = this.word.toString()
    let regex = new RegExp(" ", "ig");
    word = word.replace(regex,"%20")

    let url = "/api&arg=" + word

    this.http.get(url, {responseType: 'text'}).subscribe(res => {

      // Begin sanitization
      let result = res

      // If not 'Definition was not found'
      if (res.includes("<body>") && res.includes("</body>")) {
        result = res.split("<body>")[1].split("</body>")[0];
      }

      // Replace special characters
      result = result.replace(/&apos;/g,"'")
      result = result.replace(/&quot;/g,'"')

      // Replace word
      let word = this.word.toString()
      let regex = new RegExp(word, "ig");
      result = result.replace(regex,"____")

      // Shorten
      if (result.length > 190) {
        result = result.slice(0,190)
        result = result + "..."
      }

      console.log(result)
      resolve(result)
    })

    //reject("Result not found")

  }

}
