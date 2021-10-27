import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    private dialog: MatDialog,
  ) { }


  async toggleModal(component:any, config:any){
    const modal = await this.dialog.open(component, {
      width: '100%',
      maxWidth: (config.width) ? config.width : '400px',
      height: 'auto',
      maxHeight: (config.height) ? config.height : '100%',
      panelClass: (config.class) ? config.class : 'modal-card',
      data: config.data
    });

    modal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
