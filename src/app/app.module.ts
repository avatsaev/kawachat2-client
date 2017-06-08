import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './views/home/home.component';
import {ChatComponent} from './views/chat/chat.component';
import {FormsModule} from '@angular/forms';
import {ChatService} from './services/chat.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {StringifyPipe} from './pipes/stringify.pipes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ToolbarComponent,
    StringifyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
