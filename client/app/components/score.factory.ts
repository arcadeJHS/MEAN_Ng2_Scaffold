import {Injectable}                 from 'angular2/core';
import {Http, Response}             from 'angular2/http';
import {Headers, RequestOptions}    from 'angular2/http';
import {Observable}                 from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Score}                      from './score';

@Injectable()
export class ScoreFactory {
    constructor(private http: Http) {};

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };

    getAll() {
        return this.http.get('/api/scores')
            .map((res) => {
                return <Score[]>res.json();
            })
            .catch(this.handleError);
    };
};