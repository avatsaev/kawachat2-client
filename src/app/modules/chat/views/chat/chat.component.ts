import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {



  constructor( public chatService: ChatService) { }



  ngOnInit() {

  }

}
