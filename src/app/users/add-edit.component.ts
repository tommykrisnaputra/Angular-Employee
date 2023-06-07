import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, startWith, map } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    maxBirthDate!: string;
    edit = false;
    group : string | undefined;
    basicSalary: string | undefined;
    amountCtrl = new FormControl(null, { updateOn: 'blur' });

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        this.maxBirthDate = new Date().toISOString().slice(0, 10);
    }

    myControl = new FormControl('');
    options: string[] = ['Twitter', 'Tesla', 'Microsoft', 'Apple', 'Cognizant', 'Oracle', 'IBM', 'Intel', 'Amazon', 'Cisco'];
    filteredOptions!: Observable<string[]>;

    ngOnInit() {
        registerLocaleData( es );
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );

        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthDate: ['', Validators.required],
            basicSalary: ['', Validators.required],
            status: ['', Validators.required],
            group: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.title = 'Add Employee';
        if (this.id) {
            // edit mode
            this.title = 'Employee Detail';
            this.loading = true;
            this.edit = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    console.log(x);
                    this.group = x.group;
                    this.basicSalary = x.basicSalary;
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        // this.saveUser()
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             this.alertService.success('User saved', { keepAfterRouteChange: true });
        //             this.router.navigateByUrl('/users');
        //         },
        //         error: error => {
        //             this.alertService.error(error);
        //             this.submitting = false;
        //         }
        //     })
    }

    private saveUser() {
        // create or update user based on id param
        // return this.id
        //     ? this.accountService.update(this.id!, this.form.value)
        //     : this.accountService.register(this.form.value);
    }
}