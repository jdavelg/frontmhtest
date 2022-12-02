import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Student } from 'src/app/interfaces/student';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StudentComponent implements OnInit{
  checked: boolean | undefined;
  students: any[] = [];
  studentuDialog:boolean=false
  student: any ={}
  isAuthenticated = false
 /*  private userSub: Subscription */
  public nominateds: any
  public userEmail: any
  public connectedToB: boolean = true
  clonedStudents: { [s: string]: Student; } = {};

  studentDialog: boolean | undefined;
  statsDialog: boolean = false
  studentId: any

  selectedStudents: Student[] =[];

  submitted: boolean | undefined;

  statuses: any[] | undefined;
  constructor(


    private _studentService:SharedService,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {




  }

  ngOnInit(): void {

    this.getStudents()
  }
  handleChange(e: any, student: any) {
    var isChecked = e.checked;
    student.status = e.checked
    this._studentService.updateStudent(student).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado satisfactoriamenete', life: 3000 });
        this.getStudents()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en la peticion' });
      }
    )


  }
  getStudents() {
    this._studentService.getStudents().subscribe(
      resp => {
        this.students = resp

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }


  /* new code  */
  openNew() {
    this.student = {}
    this.submitted = false;
    this.studentDialog = true;
  }

  deleteSelectedStudents() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedStudents.length; i++) {
          let cantante = this.selectedStudents[i]
          this._studentService.deleteStudent(this.student.Id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedStudents.length + ' seleccionados', life: 1000 });
            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedStudents.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedStudents = [];
        this.getStudents()
      }
    });
  }

  editStudent(student: any) {
    /* this.student = { ...student }; */
    console.log(student);

    this.student=student
    this.studentuDialog = true;
  }

  deleteStudent(student: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar ' + student.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._studentService.deleteStudent(student.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getStudents()
          },
          err => {
            console.log(err);

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.student = {};

      }
    });
  }

  openStats(id: any) {
    this.studentId = id
    this.statsDialog = true
  }

  hideStatsDialog() {
    this.studentId = null
    this.statsDialog = false
  }
  hideDialog() {
    this.student = {}
    this.studentDialog = false;
    this.studentuDialog=false
    this.submitted = false;
  }

  saveStudent() {
    this.submitted = true;

    console.log(this.student);

    if (this.student.Id !== undefined && this.student.Id != null ||this.student.id !== undefined && this.student.id != null ) {

      this._studentService.updateStudent(this.student).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado', life: 3000 });
          this.hideDialog()
          this.getStudents()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
        }
      )
    } else {

      console.log(this.student);

      this._studentService.saveStudent(this.student).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.hideDialog()
          this.getStudents()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    }

    /*    if (this.type.name) {
           if (this.product.id) {
               this.products[this.findIndexById(this.product.id)] = this.product;
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
           }
           else {
               this.product.id = this.createId();
               this.product.image = 'product-placeholder.svg';
               this.products.push(this.product);
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
           }

           this.types = [...this.types];
           this.categoryDialog = false;
           this.type = undefined;
       } */


  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if ( this.students[i].Id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
