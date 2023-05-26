import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioCitaComponent } from './formulario-cita/formulario-cita.component';
import { OutletCitaComponent } from './outlet-cita/outlet-cita.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormularioCitaComponent, OutletCitaComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DateModule {}
