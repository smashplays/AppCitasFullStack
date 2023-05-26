import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Days } from 'src/app/shared/interfaces/days';
import { Hour } from 'src/app/shared/interfaces/hour';
import { DayService } from 'src/app/shared/services/day.service';
import { HourService } from 'src/app/shared/services/hour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-hora',
  templateUrl: './editar-hora.component.html',
  styleUrls: ['./editar-hora.component.css'],
})
export class EditarHoraComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hourService: HourService,
    private dayService: DayService
  ) {}

  public days: Days;
  public hour: Hour;

  ngOnInit(): void {
    this.dayService.getDays().subscribe((days) => {
      this.days = days;
      this.paramMapSubscription();
    });
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.hourService.getHourById(+params.get('id')).subscribe((response) => {
        this.hour = response;
      });
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

  public actualizar(): void {
    Swal.fire({
      title: `¿Quieres actualizar la hora con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hourService
          .updateHour(this.hour.data.id, this.hourForm.value)
          .pipe(
            catchError((err) => {
              if (err.status === 500) {
                Swal.fire(`La hora que has introducido no existe`, '', 'error');
              }
              return EMPTY;
            })
          )
          .subscribe(() => {
            Swal.fire(`Hora actualizada correctamente`, '', 'success').then(
              () => {
                this.router.navigate(['admin/horas']);
              }
            );
          });
      }
    });
  }
}
