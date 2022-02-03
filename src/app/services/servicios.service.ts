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

    getServicios():Observable<any>{
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

    createEquipo(equipo,idServicio):Observable<any>{
        let params = JSON.stringify(equipo);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'equipo/'+idServicio,params,{headers:headers});
    }

    getEquiposById(id):Observable<any>{
        return this._http.get(this.url+'equipos/'+id);
    }

    updateEquipoById(id,equipo):Observable<any>{
        let params = JSON.stringify(equipo);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'equipo/'+id,params,{headers:headers});
    }

    enviaCorreoInicial(servicio):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'email-inicial',servicio,{headers:headers});
    }

    enviaCorreoFinal(servicio):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'email-final',servicio,{headers:headers});
    }

    getetapas():Observable<any>{
        return this._http.get(this.url+'etapas');
    }

    getTecnicos(filtro):Observable<any>{
        return this._http.get(this.url+'tecnico/'+filtro);
    }

    getTecnico(usuario):Observable<any>{
        return this._http.get(this.url + 'tecnico-by/' + usuario);
    }

    createTecnico(tecnico):Observable<any>{
        let params = JSON.stringify(tecnico);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'tecnico',params,{headers:headers});
    }

    updateTecnico(id,tecnico):Observable<any>{
        let params = JSON.stringify(tecnico);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'tecnico/'+id,params,{headers:headers});
    }

    getImagesByEquipoId(equipoId,tipo):Observable<any>{
        return this._http.get(this.url+'imagenes/'+equipoId+'/'+tipo);
    }

    getMensajerias():Observable<any>{
        return this._http.get(this.url+'mensajeria');
    }

    guardaImagenRegreso(imagen):Observable<any>{
        let params = JSON.stringify(imagen);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'imagen',params,{headers:headers});
    }

    eliminaImg(imageid):Observable<any>{
        return this._http.delete(this.url+'imagen/'+imageid);
    }

    eliminaImgbyName(imageName):Observable<any>{
        return this._http.delete(this.url+'imagen-name/'+imageName);
    }

    getreportehtml():Observable<any>{
        return this._http.get(this.url+'reportehtml');
    }

    getreportexls():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return this._http.get(this.url+'reportexls',{
            responseType: 'arraybuffer',headers:headers});
    }

    guardaImgPagTec(imagen,serviceId):Observable<any>{
        let params = JSON.stringify(imagen);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'img-pagtec/'+serviceId,params,{headers:headers});
    }

    getServicioById(serviceId):Observable<any>{
        return this._http.get(this.url+'servicio/'+serviceId);
    }

    createImagenByEquipoId(equipoId,imagen):Observable<any>{
      let params = JSON.stringify(imagen);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'equipo-imagen/'+equipoId,params,{headers:headers});
    }

    getservnoenv():Observable<any>{
      return this._http.get(this.url+'servabierto');
    }

    /*Actualixa el servicio al paso 1 */
    updtservngce(idServicio,servicio):Observable<any>{
      let params = JSON.stringify(servicio);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.put(this.url+'servudptng/'+idServicio,params,{headers:headers});
    }

    createProducto(producto):Observable<any>{
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'producto',params,{headers:headers});
    }
    createMercancia(mercancia):Observable<any>{
        let params = JSON.stringify(mercancia);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'mercancia',params,{headers:headers});
    }
    getProductoByNoParte(noParte):Observable<any>{
        return this._http.get(this.url+'producto/'+noParte);
    }

    getProductos():Observable<any>{
        return this._http.get(this.url+'producto');
    }
    getMercanciaByNoSerie(filtro,descripcion):Observable<any>{
        return this._http.get(this.url+'mercancia/'+filtro+'?descripcion='+descripcion);
    }
    getMercanciaByProductoId(idProducto):Observable<any>{
        return this._http.get(this.url+'mercancia/producto/'+idProducto);
    }
    createMercanciaVendida(mercancia):Observable<any>{
        let params = JSON.stringify(mercancia);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'mercancia/vendido',params,{headers});
    }

    createPendiente(pendiente):Observable<any>{
        let params = JSON.stringify(pendiente);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'pendiente',params,{headers});
    }

    createIncreasePendiente(pendiente):Observable<any>{
        let params = JSON.stringify(pendiente);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'pendiente/increase',params,{headers});
    }

    getMercanciaVendida():Observable<any>{
        return this._http.get(this.url+'mercancia');
    }

    getMercanciaDisponible():Observable<any>{
        return this._http.get(this.url+'disponible');
    }

    getMercVendidaByRangoFechas(fecIni,fecFin):Observable<any>{
        return this._http.get(this.url+'mercancia/rango?fecIni='+fecIni+'&fecFin='+fecFin);
    }

    getBodegas():Observable<any>{
        return this._http.get(this.url+'bodegas');
    }
}
