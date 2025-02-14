import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserTypes } from 'src/app/interfaces/user';
import { Zikir } from 'src/app/interfaces/zikir';
import { UserService } from 'src/app/services/user.service';
import { ZikirService } from 'src/app/services/zikir.service';

@Component({
  selector: 'app-zikir-list',
  templateUrl: './zikir-list.component.html',
  styleUrls: ['./zikir-list.component.scss']
})
export class ZikirListComponent implements OnInit {
  gridCols = 1;
  total = 0;
  zikirs : Zikir[] = [];
  user!: User;
  UserTypes = UserTypes;
constructor(private router: Router, private route: ActivatedRoute, private zikirService: ZikirService, private userService: UserService, private cdr: ChangeDetectorRef){

}

  ngOnInit(): void {
     this.userService.userObs.subscribe(user=> {
      this.user = user;
     });

    this.zikirService.getZikirs().subscribe(zikirs => {
      this.zikirs = zikirs;
      console.log(this.zikirs, 'zikirs pislik');
      this.cdr.detectChanges();
    });

   
  }


  onClick(id:number | null | undefined){
    if( id !== null && id !== undefined)
    this.router.navigate(['zikirs', id])
  }

  onLogout(){
    this.userService.logout()
  }


  updateGridCols(e: number){
    this.gridCols = e
  }

  addZikir(){
    if(this.isAdmin()){
      this.router.navigate(['/zikirs/add']);
    }
  }

isAdmin(): boolean {
 return this.user.getUserType() === UserTypes.ADMIN;
}

}
