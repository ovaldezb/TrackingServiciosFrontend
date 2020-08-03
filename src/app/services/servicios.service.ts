import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ServicioService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = Global.url;
    }

    getServicios(last: any = null):Observable<any>{        
        return this._http.get(this.url+'get-servicios');
    }

    create(servicio):Observable<any>{
        let params = JSON.stringify(servicio);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'servicio',params,{headers:headers});
    }

    updateServicio(idServicio,servicio):Observable<any>{
        let params = JSON.stringify(servicio);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'servicio/'+idServicio,params,{headers:headers});
    }

    getFolio():Observable<any>{
        return this._http.get(this.url+'get-folio/folio');
    }

    createEquipo(equipo):Observable<any>{
        let params = JSON.stringify(equipo);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'equipo',params,{headers:headers});
    }

    getEquiposById(id):Observable<any>{        
        return this._http.get(this.url+'equipos/'+id);
    }

    updateEquipoById(id,equipo):Observable<any>{
        let params = JSON.stringify(equipo);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'equipo/'+id,params,{headers:headers});
    }

    sendmail():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'send-email',{},{headers:headers});
    }

    getetapas():Observable<any>{
        return this._http.get(this.url+'etapas');
    }
}