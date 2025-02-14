import { Component, ChangeDetectionStrategy,  signal, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/modals/confirm-dialog/confirm-dialog.component';
import { mergeMap, tap } from 'rxjs';
import { Zikir, ZikirDTO } from 'src/app/interfaces/zikir';
import { User } from 'src/app/interfaces/user';
import { ZikirService } from 'src/app/services/zikir.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-zikir',
  templateUrl: './zikir.component.html',
  styleUrls: ['./zikir.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZikirComponent implements OnInit { 
  confirmDialogComponent = ConfirmDialogComponent;
  user! : User;
  total = signal(0);
  gridCols = 1;
  gridButtonColumns = 4
  readonly panelOpenState = signal(false);
  zikir!: Zikir
  zikirDTO!: ZikirDTO;
  displayedColumns: string[] = ['name', 'amount', 'date'];

  constructor(private router: Router, private dialog: MatDialog, private zikirService: ZikirService, private userService: UserService, private route: ActivatedRoute){
    this.userService.userObs.subscribe(user => {
      this.user = user;
    })
  }
  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(params => {
        return this.zikirService.getZikir(+params['id'])
      })
    ).subscribe(zikir => {
      this.zikir = zikir;
      this.zikir.svgContent = 'data:image/svg+xml;base64,' + btoa(this.zikir.svgContent);
    })
  }
  
  updateGridCols(responsiveColumn: number){
    this.gridCols = responsiveColumn;
  }

onSubmit(){
if(this.total() > 0 && this.user && !this.user.isExpired()){
  this.zikirDTO = {id: this.zikir.id ?? 0, amount: this.total()};
  this.zikir.amount +=this.total();
  this.zikirService.putZikir(this.zikirDTO).subscribe({
    next: ()=> {
      this.router.navigate(['/zikirs']);
    },
    error: (error)=>{
      console.log(error);
      this.router.navigate(['/zikirs']);
    }
  })
} else {
  this.router.navigate(['/zikirs']);
}

}

onCount(){
this.total.update((total) => total + 1);
}
onReset(){
  if(this.total() > 0){
    const dialogRef = this.dialog.open(this.confirmDialogComponent);
    dialogRef.afterClosed().pipe(
      tap(result => {
        console.log(result);
        if(result === true){
          this.total.set(0);
        }
      })
    ).subscribe();
  }

}

}
