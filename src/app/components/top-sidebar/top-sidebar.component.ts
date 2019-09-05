import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-top-sidebar',
  templateUrl: './top-sidebar.component.html',
  styleUrls: ['./top-sidebar.component.scss']
})
export class TopSidebarComponent implements OnInit {

  public currParentUrl: string;
  public currChildUrl: string;

  constructor(public router: Router,
    private activateRouter: ActivatedRoute,
    private routerService: RouterService,) { }

  ngOnInit() {
    this.getCurrentRoute();
  }

  private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('/');
      this.currParentUrl = urlSegments[1];
      if (this.currParentUrl === '/' || !this.currParentUrl) {
        this.currParentUrl = 'login';
      }
      if (urlSegments.length > 2) {
        this.currChildUrl = urlSegments[2];
        const childSegments = this.currChildUrl.split('?');
        this.currChildUrl = childSegments[0];
      } else {
        this.currChildUrl = '';
      }
    });
   }
}
