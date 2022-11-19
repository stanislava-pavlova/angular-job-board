import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formGroup!: FormGroup;
  loggedUser!: User;
  errorMessage: string | null | undefined;

  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;

    const formValue = this.formGroup.value;

    if (formValue.password !== formValue.rePassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // const data = {
    //   ...this.formGroup.value,
    // };

    // update
    this.authService.update$(formValue).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  onDelete(): void {
    this.authService.delete$(this.loggedUser.id).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/home']);
      },
    });
  }

  getFormNameErrors(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  getFormEmailErrors(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  getFormPasswordErrors(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  getFormRePasswordErrors(): FormControl {
    return this.formGroup.get('rePassword') as FormControl;
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: [this.loggedUser?.id],
      name: [this.loggedUser?.name, [Validators.required]],
      email: [this.loggedUser?.email, [Validators.required]],
      password: [
        this.loggedUser?.password,
        [Validators.required, Validators.minLength(5)],
      ],
      rePassword: [
        this.loggedUser?.rePassword,
        [Validators.required, Validators.minLength(5)],
      ],
      isOrganisation: [this.loggedUser?.isOrganisation],
      applications: [this.loggedUser.applications],
    });
  }
}
