import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgFor, AsyncPipe } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from "angular-datatables";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        AngularMaterialModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NgFor,
        AsyncPipe,
        CurrencyPipe,
        DataTablesModule,
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }