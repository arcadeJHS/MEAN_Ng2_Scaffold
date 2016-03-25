import {Component}      from 'angular2/core';
import {NgFor}          from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Score}          from './score';
import {ScoreFactory}   from './score.factory';

@Component({
    selector: 'scores-table',
    templateUrl: './app/components/scores.table.html',
    directives: [NgFor],
    providers: [
        HTTP_PROVIDERS,
        ScoreFactory
    ]
})

export class ScoresTableComponent {
    scores: Score[];
    errorMessage: string;

    constructor(private _scoreFactory: ScoreFactory) {
        this._scoreFactory = _scoreFactory;
        this.scores = [];        
         
        // long polling        
        (function _p() {
            this._scoreFactory.getAll().subscribe(
                (data) => {this.scores = data;},
                (error) => {this.errorMessage = <any>error;},
                () => {setTimeout(_p.bind(this), 20000);}
            );            
        }.bind(this))();
    };
};