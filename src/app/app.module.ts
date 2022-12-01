import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';
import { ScoreComponent } from './components/score/score.component';

import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
  declarations: [AppComponent, HomeComponent, StudentComponent, ScoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ConfirmDialogModule,
    FileUploadModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    MultiSelectModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ChipsModule,
    CardModule,
    SkeletonModule,
    ChartModule,
    ProgressBarModule,
    TabViewModule,
    ToggleButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
