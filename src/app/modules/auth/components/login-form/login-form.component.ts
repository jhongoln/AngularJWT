import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestStatus } from '@models/request-status.model';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  form : FormGroup;
  showPassword = false;
  status: RequestStatus = 'init';

  private authService = inject(AuthService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){

    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParamMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.form.setValue({
          email: email
        })
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/home']);
        },
        error: () => {
          this.status = 'failed';
        }
      });
    }
  }

  
  

}
