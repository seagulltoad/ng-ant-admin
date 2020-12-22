import {NgModule} from '@angular/core';
import {SHARED_ZORRO_MODULES} from './shared-zorro.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {PipesModule} from './pipes/pipes.module';

const MODULES = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule,
  PipesModule,
  ...SHARED_ZORRO_MODULES
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class ShareModule {
}
