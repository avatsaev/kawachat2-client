import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ChatModule } from './modules/chat/chat.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChatModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
