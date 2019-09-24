import { Injectable } from '@angular/core';
import { Role, UserDetails } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: Role;
  private name: string;
  private email: string;
  private storage = localStorage;
  private authenticated = false;

  roleSync: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  nameSync: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {
    this.init();
  }

  setEmail(email: string) {
    this.storage.removeItem('email');
    this.storage.setItem('email', email);
    this.email = email;
  }

  getUserDetails(): UserDetails {
    return {
      Name: this.name,
      Email: this.email
    };
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  init(): void {
    this.resetAll();
    const role = this.storage.getItem('role');
    if (role && role !== 'undefined') {
      this.role = JSON.parse(role);
      this.roleSync.next(JSON.parse(role));
    }
    const name = this.storage.getItem('name');
    if (name && name !== 'undefined') {
      this.name = name;
      this.nameSync.next(name);
    }

    const email = this.storage.getItem('email');
    if (email && email !== 'undefined') {
      this.email = email;
    }
  }

  setRole(role: Role): void {
    this.role = role;
    this.storage.removeItem('role');
    this.storage.setItem('role', `${role}`);
    this.roleSync.next(this.role);
  }

  IsAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  authenticate(): void {
    this.authenticated = true;
  }

  isAuthenticated(): boolean {
    return this.authenticated && this.role === Role.ADMIN;
  }

  private removeAuthenticate(): void {
    this.authenticated = false;
  }

  setName(name: string): void {
    this.storage.removeItem('name');
    this.storage.setItem('name', name);
    this.name = name;
    this.nameSync.next(name);
  }

  resetAll(): void {
    this.role = null;
    this.name = '';
    this.roleSync.next(this.role);
    this.nameSync.next(this.name);
    this.storage.setItem('name', undefined);
    this.storage.setItem('role', undefined);
    this.removeAuthenticate();
  }
}
