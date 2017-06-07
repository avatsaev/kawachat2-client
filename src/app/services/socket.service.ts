import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";


@Injectable()
export class SocketService {


  socket;
  username: string;

  socketConnected$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.socket = io(environment.socket.base_url, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));
  }

  join(username: string, frq: string) {
    this.username = username;
    this.socket.emit('join', {frq, username});
  }

  listen(event: string): Observable<any> {

    return new Observable(observer => {

      this.socket.on(event, data => {
        console.log(`### incoming for event ${event}: `, data);
        observer.next(data);
      });

      // observable is disposed
      return () => this.socket.off(event);

    });

  }

}
