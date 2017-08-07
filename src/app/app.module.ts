
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PrettyJsonModule, SafeJsonPipe} from 'angular2-prettyjson';
import {JsonPipe} from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';

// Services
import { Config } from './app.config';
import { ThemeService } from './_services/theme/theme.service';
import { UserAgentService } from './_services/useragent/useragent.service';
import { NetworkNotifierService } from './_components/networknotifier/networknotifier.service';
import { DataService } from './_services/data/db';
import { ValidationService } from './_services/validation/validation.service';

// App Components
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LayoutComponent } from './layout/layout.component';
import { ClockComponent } from './_components/clock/clock.component';
import { NpmBadgeComponent } from './_components/npmbadge/npmbadge.component';
import { NetworknotifierComponent } from './_components/networknotifier/networknotifier.component';
import { OverloadCitationComponent } from './overloadcitation/overload-citation.component';
import { ViolationNoticeComponent } from './violationnotice/violation-notice.component';
import { UfpFormsModule } from './_components/forms/forms.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SettingsComponent,
    LayoutComponent,
    ClockComponent,
    NpmBadgeComponent,
    NetworknotifierComponent,
    OverloadCitationComponent,
    ViolationNoticeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrettyJsonModule,
    UfpFormsModule,
    TabsModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: JsonPipe, useClass: SafeJsonPipe },
    Config,
    ThemeService,
    UserAgentService,
    NetworkNotifierService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
