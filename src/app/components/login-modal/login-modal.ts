import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModalComponent {
  username = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.error = '';
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          // Модалка закроется автоматически (в AuthService)
        },
        error: () => {
          this.error = 'Неверный логин или пароль';
        }
      });
  }

  close() {
    this.authService.closeLoginModal();
  }
}
