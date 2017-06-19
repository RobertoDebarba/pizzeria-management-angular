import {Injectable} from "@angular/core";
import {
    ConnectionBackend,
    Headers,
    Http,
    Request,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class InterceptedHttp extends Http {

    // private defaultOptions: RequestOptions;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);

        // this.defaultOptions = defaultOptions;

        // let token: string = localStorage.getItem('ITATAKARU');
        // if (token) {
        //     this.defaultOptions.headers.append("x-access-token", token);
        // }
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        // if (options == null) {
        //     options = new RequestOptions();
        // }
        // if (options.headers == null) {
        //     options.headers = new Headers();
        // }
        // // options.headers.append('Content-Type', 'application/json');
        // options.headers.set('Access-Control-Allow-Origin', '*');
        // options.headers.set('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']);
        // options.headers.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);
        // options.headers.set('Content-Type', 'application/json');
        // // options.headers.set('Authorization', 'application/json');
        //
        // let token: string = localStorage.getItem('ITATAKARU');
        // if (token) {
        //     options.headers.append("Authorization", token);
        // }

        return options;
    }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}