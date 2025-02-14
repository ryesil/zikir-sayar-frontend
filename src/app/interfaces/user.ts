export class User {

private name: string;
private userType: UserTypes;
private date:Date;
private expiresAt:number;

//3600000 ms = 1 hr;
constructor(name: string = '', userType?: UserTypes) {
  this.name = name;
  if(name === ''){
    this.date = new Date('01/01/1970');
  } else {
    this.date = new Date();
  }
    this.userType = userType ?? UserTypes.USER;
    this.expiresAt = this.date.getTime() + 3600000; 
  }
 

  setExpiresAt():void{
    this.expiresAt += 3600000;
  }

  getExpiresAt():number{
    return this.expiresAt;
  }

  getName():string{
    return this.name;
  }

  getUserType(): UserTypes {
    return this.userType;
  }

  getdate():Date{
    return this.date;
  }
// static method to parse User from sessionStorage
//if user is not valid or empty we return a dummy user.
//Should we move this method to userService?
static fromStorage(): User {
  const userData = sessionStorage.getItem('user');
  if (userData) {
    const parsed = JSON.parse(userData);
    const parsedUser = new User(parsed.name, parsed.userType);
      if(parsedUser.isExpired()){
        return new User();
      } else {
        return parsedUser;
      }
  } else {
    return new User();
  }
}
 isExpired(): boolean {
  return new Date().getTime() > this.expiresAt;
}
  }


 export enum UserTypes { ADMIN = 'Admin', USER = 'User'}
