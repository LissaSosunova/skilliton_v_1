import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

  public getValue(key: string): string {
    return sessionStorage.getItem(key);
  }

  public setValue(value: string, key: string): void {
    sessionStorage.setItem(key, value);
  }

  public removeValue(key: string): void {
    sessionStorage.removeItem(key);
  }
}
