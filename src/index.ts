import Model from "./Model";
import View from "./View";
import Controller from "./Controller";
import Todo from "./Todo";

const app = new Controller(new Model(), new View());
