import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSubService {
  private subject = new Subject<any>();

  setUser(user: any) {
      this.subject.next({ user$: user });
  }

  clearUser() {
      this.subject.next();
  }

  getUser(): Observable<any> {
      return this.subject.asObservable();
  }
}
