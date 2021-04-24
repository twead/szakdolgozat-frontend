import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) {
    console.log(this.modalData);
  }

  preFilePath = 'https://onlinehealthcaresystem.s3.us-east-2.amazonaws.com/';
  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
