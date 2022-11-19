import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  formGroup!: FormGroup;

  errorMessage: string | null | undefined;
  organisationId = JSON.parse(localStorage.getItem('loggedUser')!).id;

  offer!: OfferModel;
  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.offer = {
      title: '',
      description: '',
      type: '',
      category: '',
      organisationId: this.organisationId,
      candidates: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params['id'];

        if (id) {
          this.getOffer(id);
        }
      });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    // this.errorMessage = null;

    const formValue = this.formGroup.value;

    if (this.formGroup.invalid) {
      this.errorMessage = 'Fill in the empty fields.';
      return;
    }

    if (!this.formGroup.value.id) {
      this.offersService
        .post$(formValue)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['jobs']);
        });

      return;
    }

    this.offersService
      .put$(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['jobs']);
      });
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.offer.id,
      organisationId: this.organisationId,
      title: [this.offer.title, [Validators.required]],
      description: [this.offer.description, [Validators.required]],
      category: [this.offer.category, [Validators.required]],
      type: [this.offer.type, [Validators.required]],
    });
  }

  private getOffer(id: number): void {
    this.offersService
      .getById$(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.offer = response;
        this.buildForm();
      });
  }
}
