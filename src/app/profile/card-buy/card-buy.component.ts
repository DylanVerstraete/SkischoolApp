import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-card-buy',
  templateUrl: './card-buy.component.html',
  styleUrls: ['./card-buy.component.css']
})
export class CardBuyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardBuyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog(): void{
    this.dialogRef.close("ok");
  }

  onNoClick(): void {
    this.dialogRef.close("");
  }

}
