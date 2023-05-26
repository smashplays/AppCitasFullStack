import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Days } from '../../shared/interfaces/days';
import { DayService } from 'src/app/shared/services/day.service';
import { HourService } from 'src/app/shared/services/hour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-hora',
  templateUrl: './generar-hora.component.html',
  styleUrls: ['./generar-hora.component.css'],
})
export class GenerarHoraComponent implements OnInit {
  constructor(
    private router: Router,
    private hourService: HourService,
    private dayService: DayService
  ) {}

  public days: Days;

  ngOnInit(): void {
    this.dayService.getDays().subscribe((days) => {
      this.days = days;
    });
  }

  public hourForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    ]),
    day_id: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.hourForm.invalid;
  }

  public crear(): void {
    this.hourService.createHour(this.hourForm.value).subscribe(() => {
      Swal.fire('Hora creada correctamente', '', 'success').then(() => {
        this.router.navigate(['admin/horas']);
      });
    });
  }
}
