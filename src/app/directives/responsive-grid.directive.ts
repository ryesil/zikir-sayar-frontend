import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appResponsiveGrid]'
})
export class ResponsiveGridDirective {
  @Output() gridColsChange = new EventEmitter<number>();
  
  constructor() {
    this.updateGridCols();
   }

  @HostListener('window:resize')
  onReSize(){
    this.updateGridCols();
  }


  private updateGridCols(): void {
    const width = window.innerWidth;
    let gridCols = 1;
    if(width< 600){
      gridCols = 1;
    } else if( width < 960){
      gridCols = 3;
    } else {
      gridCols = 3;
    }
    this.gridColsChange.emit(gridCols);
  }

}
