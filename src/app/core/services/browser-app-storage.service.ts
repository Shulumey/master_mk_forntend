import {Injectable} from '@angular/core';
import {AppStorageService} from "./app-storage-service";

export class BrowserAppStorageService implements AppStorageService {

  constructor() {
  }

  get<T>(key: string): T | null {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } else {
      return null;
    }
  }

  set<T>(key: string, val: T): void {
    localStorage.setItem(key, JSON.stringify(val));
  }
}
