import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

/*
 export class User {
 constructor(
 public email: string,
 public password: string) { }
 }

 var users = [
 new User('admin','admin'),
 new User('user1','u1')
 ];
 */

export class User {
  constructor(public password: string) {
  }
}

const users = [
  new User('adm1n'),
  new User('29022037'),
  new User('user1'),
  new User('Super')
];

@Injectable()
export class AuthenticationService {

  public loggedIn = false;

  constructor(private router: Router) {
  }

  logout() {
    // localStorage.removeItem('user');
    // sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }

  login(user) {
    const authenticatedUser: any = users.find(p => p.password === user.password);

    // if (authenticatedUser && authenticatedUser.password === user.password){
    if (authenticatedUser) {
      this.loggedIn = true;
      sessionStorage.setItem('uset', authenticatedUser);
      // localStorage.setItem('user', authenticatedUser);
      // this.router.navigate(['home']);
      return true;
    }
    return false;
  }

  checkCredentials() {
    // return this.loggedIn;
    if (sessionStorage.length > 0) {
      return true;
    }
  }
}
