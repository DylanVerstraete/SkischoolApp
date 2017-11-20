import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { CampsComponent } from './camps/camps.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    CampsComponent,
    ProfileEditComponent,
    RegisterComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    CollapseModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([  
      { path: "login", component:LoginComponent },
      { path: "register", component:RegisterComponent },
      { path: "home", component:HomeComponent},
      { path: "profiel", component:ProfileComponent},
      { path: "profiel/edit", component:ProfileEditComponent},
      { path: "kampen", component:CampsComponent},
      { path: "", component:HomeComponent},
      { path: "**", component:PageNotFoundComponent},      
    ])
  ],
  providers: [AuthenticationService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
