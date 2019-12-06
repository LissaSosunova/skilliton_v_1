import { Component, OnDestroy } from '@angular/core';
import { StompWsService } from './services/stomp-ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Skilliton';
  webSocketAPI: StompWsService;

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }
}
