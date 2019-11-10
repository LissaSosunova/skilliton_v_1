import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Store} from '@ngrx/store';
import { LoadUserData } from '../state/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {

  constructor(
    private data: HttpService,
    private store: Store<any>,
  ) { }

  public sendData(key: string, data: any): void {
    const params = {[key]: data};
    this.data.postNewProfileData(params).subscribe((res) => {
      if (res) {
        this.store.dispatch(new LoadUserData());
      }
    });
  }
}
