import {bootstrap}              from 'angular2/platform/browser';
import {enableProdMode}         from "angular2/core";
import {ScoresTableComponent}  from './components/scores.table';

enableProdMode();
bootstrap(ScoresTableComponent);