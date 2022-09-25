import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CrudHTTPService } from '../crud-http.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  @Input() emp: any;

  closeResult: string = '';
  formdata: any;
  empList: any = [];
  employee: any;
  updateForm: FormGroup = new FormGroup({});
  createForm: FormGroup = new FormGroup({});
  isSubmit = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private crudHTTPService: CrudHTTPService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.createForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.listemp();
  }

  get c() {
    return this.createForm.controls;
  }

  get u() {
    return this.updateForm.controls;
  }

  onSubmitCreateEmployee() {
    this.isSubmit = true;
  }

  listemp() {
    this.crudHTTPService.list().subscribe(
      (response) => {
        this.empList = response;
      },
      (error) => {}
    );
  }

  createEmployeeModal(content: any) {
    this.isSubmit = false;
    this.createForm.reset();
    this.open(content);
  }

  createEmployee() {
    this.isSubmit = true;
    if (this.createForm.invalid) {
      return;
    }
    this.isSubmit = false;
    this.formdata = this.createForm.value;
    let emp = {
      id: new Date().getTime(),
      first_name: this.createForm.value.first_name,
      last_name: this.createForm.value.last_name,
      email: this.createForm.value.email,
    };
    this.crudHTTPService.create(emp).subscribe(
      (response) => {
        this.listemp();
        this.modalService.dismissAll();
        this.createForm.reset();
      },
      (error) => {}
    );
  }

  editEmployeeModal(content: any, emp: any) {
    this.isSubmit = false;
    this.updateForm.reset();
    this.employee = emp;
    this.open(content);
  }

  editEmployee(id: Number) {
    this.isSubmit = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.isSubmit = false;
    this.formdata = this.updateForm.value;
    this.crudHTTPService.update(id, this.formdata).subscribe(
      (response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.listemp();
        this.createForm.reset();
      },
      (error) => {}
    );
  }

  //delete a record
  deleteemp(id: any) {
    this.crudHTTPService.delete(id).subscribe(
      (response) => {
        this.listemp();
      },
      (error) => {}
    );
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
