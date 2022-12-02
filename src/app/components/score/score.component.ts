import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Score } from 'src/app/interfaces/score';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ScoreComponent {
  checked: boolean | undefined;
  scores: Score[] = [];

  score: Score ={}
  isAuthenticated = false
 /*  private userSub: Subscription */
  public nominateds: any
  public userEmail: any
  public connectedToB: boolean = true
  clonedScores: { [s: string]: Score; } = {};

  scoreDialog: boolean | undefined;
  statsDialog: boolean = false
  scoreId: any

  selectedScores: Score[] =[];

  submitted: boolean | undefined;

  statuses: any[] | undefined;
  constructor(


    private _scoreService:SharedService,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {




  }

  handleChange(e: any, score: any) {
    var isChecked = e.checked;
    score.status = e.checked
    this._scoreService.updateScore(score).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado satisfactoriamenete', life: 3000 });
        this.getScores()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en la peticion' });
      }
    )


  }
  getScores() {
    this._scoreService.getScores().subscribe(
      resp => {
        this.scores = resp

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }

  /* getScores() {
    this._scoreService.getCampaings().subscribe(
      resp => {


        this.scores = resp
        this.scores.map(campana => {

          campana.endDate = new Date(campana.endDate)
        })
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  } */

  /* new code  */
  openNew() {
    this.score = {}
    this.submitted = false;
    this.scoreDialog = true;
  }

  deleteSelectedScores() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedScores.length; i++) {
          let score = this.selectedScores[i]
          this._scoreService.deleteScore(score.Id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedScores.length + ' seleccionados', life: 1000 });
            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedScores.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedScores = [];
        this.getScores()
      }
    });
  }

  editScore(score: Score) {
    this.score = { ...score };
    this.scoreDialog = true;
  }

  deleteScore(score: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar ' + score.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._scoreService.deleteScore(score.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getScores()
          },
          err => {
            console.log(err);

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.score = {};

      }
    });
  }

  openStats(id: any) {
    this.scoreId = id
    this.statsDialog = true
  }

  hideStatsDialog() {
    this.scoreId = null
    this.statsDialog = false
  }
  hideDialog() {
    this.score = {}
    this.scoreDialog = false;
    this.submitted = false;
  }

  saveScore() {
    this.submitted = true;
    /*   console.log('campania', this.score); */
    console.log(this.score);

    if (this.score.Id !== undefined && this.score.Id != null) {

      this._scoreService.updateScore(this.score).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado', life: 3000 });
          this.hideDialog()
          this.getScores()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
        }
      )
    } else {
      this._scoreService.saveScore(this.score).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.hideDialog()
          this.getScores()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
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
    for (let i = 0; i < this.scores.length; i++) {
      if ( this.scores[i].Id === id) {
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
