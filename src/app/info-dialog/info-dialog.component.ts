import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoDialogProps } from 'src/types';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.sass'],
})
export class InfoDialogComponent implements OnInit {
  public message: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogProps) {}

  renderMessage(): any {
    const { type, operation } = this.data;
    if (type === 'success') {
      if (operation === 'create')
        return (this.message = 'Cadastro realizado com Sucesso!');
      else if (operation === 'edit')
        return (this.message = 'Edição realizada com Sucesso!');
      else return (this.message = 'Deleção realizada com Sucesso!');
    }

    if (type === 'error') return (this.message = 'Erro ao realizar a deleção');
  }

  ngOnInit(): void {
    this.renderMessage();
  }
}
