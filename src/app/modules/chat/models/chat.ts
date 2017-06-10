import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
export class Chat {
  frq: string;
  chatStream: Observable<any>;
  statsStream: Observable<any>;
  chatSub: Subscription;
  statsSub: Subscription;
  msgList: any[] = [];
  totalClients = 0;

  constructor(frq: string, chatStream: Observable<any>, statsStream:  Observable<any>) {
    this.frq = frq;
    this.chatStream = chatStream;
    this.statsStream = statsStream;

    this.chatSub = this.chatStream.subscribe(res => this.msgList.push(res));
    this.statsSub = this.statsStream.subscribe(res => {
      if (res.frq === this.frq) {
        this.totalClients = res.clientsCount;
      }
    })
  }


}
