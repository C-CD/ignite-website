import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';

const modules=[ CommonModule]
const components=[SafePipe]
@NgModule({
  declarations: [components],
  imports:  [modules],
  exports: [modules, components]
})
export class SharedModule {}
