import { Component, OnInit } from '@angular/core';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'tesssanta';

  constructor() { }

  side_image_link : String

  image_links = ["../assets/background3.png", "../assets/background2.png", "../assets/background1.png"]

  curr_index = 0

  ngOnInit() {

  	this.side_image_link = "../assets/background3.png"

  }

  changeSideImage() {
  	this.curr_index += 1
  	if (this.curr_index >= this.image_links.length) {this.curr_index = 0}
  	this.side_image_link = this.image_links[this.curr_index]
  }
}
