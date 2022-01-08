import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materials = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatStepperModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatIconModule,
  MatRadioModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
