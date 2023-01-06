import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { PlayComponent } from './play/play.component';
import { HowComponent } from './how/how.component';


const routes: Routes = [

	{ path:"", redirectTo: 'howtoplay', pathMatch: 'full' },

	{ path:"edit",  component: EditComponent },

	{ path:"play",  component: PlayComponent },

	{ path:"howtoplay",  component: HowComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
