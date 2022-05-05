import Model from "./Model";
import View from "./View";
import Controller from "./Controller";
import './sass/main.scss';

const app = new Controller(new Model(), new View());
