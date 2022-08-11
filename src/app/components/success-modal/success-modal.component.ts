import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';

declare let bootstrap: any;

export type ModalData = {
  title:string;
  desc: string;
  success: boolean
}

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {

  @Input() public data!: ModalData;

  constructor(
    // public dialogRef: MatDialogRef<SuccessModalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) { }

  ngOnInit(): void {

  }

  openModal(){
    var myModalEl = document.getElementById('successModal');
    var modal = new bootstrap.Modal(myModalEl, {});

    // console.log(myModalEl, modal, $('#successModal').html());

    document.onreadystatechange = () => modal.show();
  }

}
