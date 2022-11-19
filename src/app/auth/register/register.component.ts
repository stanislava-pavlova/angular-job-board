import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;

  errorMessage: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;
    const formValue = this.formGroup.value;

    // Password mismatch
    if (formValue.password !== formValue.rePassword) {
      this.errorMessage = 'Passwords do not match.';

      this.formGroup.reset({
        name: formValue.name,
        email: formValue.email,
        password: '',
        rePassword: '',
        isOrganisation: formValue.isOrganisation,
      });
      return;
    }

    // Check if an account with this email has a registration
    this.authService
      .getUsers()
      .pipe(
        map((stream: User[]) =>
          stream.find((user) => user.email === formValue.email)
        ),
        take(1)
      )
      .subscribe((response) => {
        if (response) {
          this.errorMessage =
            'An account with this email address already exists.';
          return;
        }

        // register
        this.authService
          .register(formValue)
          .pipe(take(1))
          .subscribe(() => {
            this.router.navigate(['login']);
          });
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
  //(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])

  private buildForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]],
      isOrganisation: [false],
      applications: [[]],
    });
  }
}
