import {Injectable} from '@angular/core';
import {AppStorageService} from "./app-storage-service";

export class BrowserAppStorageService implements AppStorageService {

  constructor() { }

  get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || "");
  }

  set<T>(key: string, val: T): void {
    localStorage.setItem(key, JSON.stringify(val));
  }
}
