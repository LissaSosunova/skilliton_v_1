import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment  } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public message: string;
  constructor(
    private data: HttpService,
    public router: Router,
    private routerService: RouterService,
  ) { }

  ngOnInit() {
    this.message = '';
    this.getCurrentRoute();
  }
   private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('=');
      this.data.confirmAccaunt(urlSegments[1]).subscribe(
        (data) => {this.checkStatusData(data); },
        error => this.getErrorCodeApi(error.status));
    });
   }

   getErrorCodeApi(data: any): void {
    this.message = 'Looks like something went wrong...';
   }
   // Check status of response, set tocken and navigate to HOME page
   checkStatusData(data: any): void {
    if (data.error === false) {
      this.message = 'Your account confimed.';
      setTimeout(() => { this.router.navigate([''])}, 4000);
    }
   }

}
