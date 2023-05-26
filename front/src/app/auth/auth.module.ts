import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OutletAuthComponent } from './outlet-auth/outlet-auth.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, OutletAuthComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
