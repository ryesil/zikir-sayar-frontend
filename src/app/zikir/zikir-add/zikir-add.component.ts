import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Zikir } from 'src/app/interfaces/zikir';
import { ZikirService } from 'src/app/services/zikir.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-zikir-add',
  templateUrl: './zikir-add.component.html',
  styleUrls: ['./zikir-add.component.scss']
})
export class ZikirAddComponent {
  isFormSelected = true;
  svgContentController = new FormControl()
  zikir = new Zikir();
  fileName = '';
currentFile: any;
  constructor(private zikirService: ZikirService, private snackBar: MatSnackBar, private router : Router) {
  }

onSubmit(){
  if(this.zikir.svgContent){
    this.isFormSelected = true;
  } else {
    this.isFormSelected = false;
  }
 if(this.isFormSelected) {
  const zikirFinal = new Zikir({name: this.zikir.name, svgContent: this.zikir.svgContent, amount: this.zikir.amount, date: new Date(), cycle: this.zikir.cycle, description: this.zikir.description, goal: this.zikir.goal});
  this.zikirService.postZikir(zikirFinal).subscribe({
    complete: () => {
      this.showToast('Successfully saved!');
      setTimeout(()=>{
        this.router.navigate(['/zikirs']);
      }, 2000);
    }
  })
 }
}

csvInputChange(e: any): void {
  const file: File = e.target.files[0];
  if (file) {
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      // Assign the file content to the svgContent property
      this.zikir.svgContent = reader.result as string;
    };

    reader.readAsText(file); // Reads the file as text
  } else {
    this.isFormSelected = false;
  }
}

showToast(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 2000,  // Duration in milliseconds
    horizontalPosition: 'center', // Snackbar position
    verticalPosition: 'top', // Snackbar position
    panelClass: ['toast-style'] // Optional: add a custom class for styling
  });
}
onBack(){
  this.router.navigate(['/zikirs']);
}
}

