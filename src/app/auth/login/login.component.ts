import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  errorMessage: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;

    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;

    this.authService
      .login(email, password)
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) {
          this.errorMessage = 'Invalid email or password';
          return;
        }

        // set logged user
        this.authService.setLoggedUser(response);

        this.router.navigate(['/home']);
      });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
