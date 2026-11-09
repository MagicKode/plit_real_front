import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.error = '';
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin']); // Перенаправляем в админку
        },
        error: (err) => {
          this.error = 'Неверный логин или пароль';
          console.error(err);
        }
      });
  }
}
