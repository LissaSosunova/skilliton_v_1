import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment  } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-resend-code',
  templateUrl: './resend-code.component.html',
  styleUrls: ['./resend-code.component.scss']
})
export class ResendCodeComponent implements OnInit {
private message: string;
  constructor(
    private data: HttpService,
    private router: Router,
    private routerService: RouterService,
  ) { }

  ngOnInit() {
    this.message = '';
    this.getCurrentRoute();
  }
   private getCurrentRoute(): void {
    this.routerService.getCurrentRoute$().subscribe(url => {
      const urlSegments = url.split('=');
      this.data.resendActivationCode(urlSegments[1]).subscribe(
        (data) => {this.checkStatusData(data); },
        error => this.getErrorCodeApi(error.status));
    });
   }

   getErrorCodeApi(data: any): void {
    this.message = 'Looks like something went wrong...';
    setTimeout(() => { this.router.navigate([''])}, 10000);
   }
   // Check status of response, set tocken and navigate to HOME page
   checkStatusData(data: any): void {
    if (data.error === false) {
      this.message = 'Your request was been sent. Check your e-mail and confirm your accaunt.';
      setTimeout(() => { this.router.navigate([''])}, 4000);
    }
   }

}
