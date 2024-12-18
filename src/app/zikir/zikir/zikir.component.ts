import { Component, HostListener, ChangeDetectionStrategy,  signal} from '@angular/core';
@Component({
  selector: 'app-zikir',
  templateUrl: './zikir.component.html',
  styleUrls: ['./zikir.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZikirComponent {
  total = 0;
  gridCols = 4;
  gridButtonColumns = 4
  readonly panelOpenState = signal(false);

  dataSource = [
    { name: 'Hydrogen', amount: 1.0079, date: 'H'},
    {name: 'Helium', amount: 4.0026, date: 'He'},
    {name: 'Lithium', amount: 6.941, date: 'Li'},
    {name: 'Beryllium', amount: 9.0122, date: 'Be'},
    {name: 'Boron', amount: 10.811, date: 'B'},
    {name: 'Carbon', amount: 12.0107, date: 'C'},
    {name: 'Nitrogen', amount: 14.0067, date: 'N'},
  ];

  displayedColumns: string[] = ['name', 'amount', 'date'];



@HostListener('window:resize')
onReSize(){
  const width = window.innerWidth;
  if(width< 600){
    this.gridCols = 4;
  } else if( width < 960){
    this.gridCols = 2;
  } else {
    this.gridCols = 1;
  }

}

}
