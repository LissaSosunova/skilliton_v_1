import { Injectable } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { HomeComponent } from '../../app/components/home/home.component';
import {StompConfig, StompService, StompHeaders} from '@stomp/ng2-stompjs';
import { Subject, Observable } from 'rxjs';
import { UpdateUsersNotificationsMatches } from '../state/actions/user.actions';
import { Store} from '@ngrx/store';

const stompConfig: StompConfig = {
  // Which server?
  url: 'http://185.41.250.120:8080/ws',

  // Headers
  // Typical keys: login, passcode, host
  headers: {},

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: false
};

@Injectable({
  providedIn: 'root'
})
export class StompWsService {
  stompClient: any;
  stompConfig = stompConfig;
  url: 'http://185.41.250.120:8080/ws';
  // store: Store<any>;

  constructor(private store: Store<any>) {}

   _connect() {
    const socket = new SockJS('http://185.41.250.120:8080/ws');
    const tokenStr = sessionStorage.getItem('_token');
    const tokenType = sessionStorage.getItem('tokenType');
    const token = tokenType + ' ' + tokenStr;
    const headers = {'Authorization': token};
    const pathes = {
      income: '/skilliton/matches/income',
      outcome: '/skilliton/matches/outcome',
      active: '/skilliton/matches/active',
      notify: '/user/queue/notify'
    };
    this.stompClient = Stomp.over(socket);
    const _this = this;
    const store = this.store;
    _this.stompClient.connect(headers, function(frame) {
      _this.stompClient.subscribe(pathes.notify, function (sdkEvent) {
        console.log('notify: ' + sdkEvent.body);
        if(sdkEvent.body.length > 2 ) {
          console.log(sdkEvent.body, sdkEvent.body.length);
          _this.store.dispatch(new UpdateUsersNotificationsMatches(sdkEvent.body));
        }
      });
    }, this.errorCallBack);
    
}

_disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
}

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

  onDataReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    return message;
  }
}