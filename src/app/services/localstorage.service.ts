import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public getValue(key: string): string {
    return localStorage.getItem(key);
  }

  public setValue(value: string, key: string): void {
    localStorage.setItem(key, value);
  }

  public removeValue(key: string): void {
    localStorage.removeItem(key);
  }
}
