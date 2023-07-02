import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="grid justify-items-center m-4 h-full">
      <form
        class="w-full justify-items-center"
        (ngSubmit)="onSubmit(loginForm)"
        #loginForm="ngForm"
      >
        <div class="flex justify-center">
          <div
            class="grid grid-cols-1 md:grid-cols-2 max-w-4xl justify-items-center"
          >
            <div class="grid grid-rows-3 md:grid-rows-2">
              <div class="grid grid-cols-1 justify-center m-4">
                <p
                  class="w-full text-center font-sans text-2xl text-teal-600 mb-2"
                >
                  username
                </p>
                <input
                  class="w-full max-w-xs justify-self-center h-10 rounded-xl border-teal-600 border-2 focus:outline-none focus:ring-0 text-center"
                  type="text"
                  id="username"
                  name="username"
                  [(ngModel)]="username"
                  required
                />
              </div>
              <div class="grid grid-cols-1 justify-center m-4">
                <p
                  class="w-full text-center font-sans text-2xl text-teal-600 mb-2"
                >
                  password
                </p>
                <input
                  class="w-full max-w-xs justify-self-center h-10 rounded-xl border-teal-600 border-2 focus:outline-none focus:ring-0 text-center"
                  type="password"
                  id="password"
                  name="password"
                  [(ngModel)]="password"
                  required
                />
              </div>
              <button
                class="button md:hidden text-white rounded-xl bg-teal-600 h-8 m-4 w-28 justify-self-center"
                type="submit"
                [disabled]="!loginForm.valid"
              >
                Login
              </button>
            </div>
            <img
              class=" w-96 self-end"
              src="../../../assets/gatto.png"
              alt=""
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="hidden md:block button text-white rounded-xl bg-teal-600 h-8 m-4 w-28 justify-self-center"
            type="submit"
            [disabled]="!loginForm.valid"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('COOKIE', document.cookie);
          console.log('RESPONSE: ', response);
          this.router.navigate(['/bacari_list']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
