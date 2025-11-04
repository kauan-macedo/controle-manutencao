import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Solicitacao } from '../models/solicitacao';
import { Usuario } from '../models/usuario';
import { ToastService } from './toast-service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  

  constructor(private toastService: ToastService, private httpClient: HttpClient) { }


}
