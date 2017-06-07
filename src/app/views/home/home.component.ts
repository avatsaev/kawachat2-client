import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  username: string;
  frq: string;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
  }


  join() {
    console.log(this.username);
    console.log(this.frq);

    this.socketService.username = this.username;
    this.router.navigate(['/chat', this.frq]);
  }
}
