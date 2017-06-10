import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {environment} from "../../../../environments/environment";
import * as rp from "request-promise"

export class Chat {

  socket: any;
  socketConnected$ = new BehaviorSubject<boolean>(false);

  frq: string;
  chatStream: Observable<any>;
  statsStream: Observable<any>;
  chatSub: Subscription;
  statsSub: Subscription;
  msgList: any[] = [];
  totalClients = 0;

  constructor(frq: string) {

    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));

    this.frq = frq;
    this.socket.emit('join', {frq});
    this.chatStream = this.listen('chat');
    this.statsStream = this.listen('frqUpdate');

    this.chatSub = this.chatStream.subscribe(res => this.msgList.push(res));
    this.statsSub = this.statsStream.subscribe(res => {
      if (res.frq === this.frq) {
        this.totalClients = res.clientsCount;
      }
    });

    this.getFrqStats()
        .then(res => this.totalClients = res.clientsCount);
  }

  send(msg: string, usr: string) {
    if (msg.length) {
      this.socket.emit('send', {msg, usr, frq: this.frq });
      this.msgList.push({msg, usr, frq: this.frq});
    }
  }

  listen(event: string): Observable<any> {

    return new Observable(observer => {

      this.socket.on(event, data => {
        console.log('incoming for', event, data);
        if (data.frq === this.frq) {
          observer.next(data);
        }
      });

      // observable is disposed
      return () => {
        this.socket.off(event);
      }

    });

  }

  leave() {
    this.socket.emit('leave', {frq: this.frq});
  }

  getFrqStats(): Promise<any> {

    return rp({
      uri: `${environment.api.baseUrl}/room/${this.frq}/stats`,
      json: true
    });
  }

}
