import {NgModule} from '@angular/core';
import {StringifyPipe} from './pipes/stringify.pipe';
import {FormsModule} from '@angular/forms';
import {ChatComponent} from './views/chat/chat.component';
import {ChatService} from './services/chat.service';
import {ChannelComponent} from './views/channel/channel.component';
import {ChatRoutingModule} from './chat-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    StringifyPipe,
    ChatComponent,
    ChannelComponent,

  ],
  imports: [
    FormsModule,
    ChatRoutingModule,
    CommonModule,
  ],
  providers: [ChatService],
})

export class ChatModule {

}
