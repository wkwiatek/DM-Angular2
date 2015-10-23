/// <reference path="../../typings/angular2/angular2.d.ts"/>
import {
    View,
    Component,
    bootstrap
} from 'angular2/angular2';


import {ListComponent} from './todo_list';
import {TodoService, TodoModel, TodoPriority} from './todo_service';
import {ItemFormComponent} from './todo_form/item_form_component';
import {SortButtonComponent, ISort} from './sort_button';
import {SortPipe} from './helpers/sort_pipe';

@Component({
    selector: 'todo-app',
    directives: [ListComponent, ItemFormComponent, SortButtonComponent],
    pipes: [SortPipe],
    template: `
        <header class="row">
            <h1 class="col-sm-12 text-center">Devmeetings Angular2</h1>
        </header>
        <div class="row">
            <div class="col-xs-12">
                <div class="input-group">
                    <sort [prop]="'title'" (sort)="onSort($event)"></sort>
                    <sort [prop]="'priority'" (sort)="onSort($event)"></sort>
                </div>

            </div>

        </div>
        <div class="row">
            <div class="col-sm-12">
                <list [items]="todos | sort:sorting.prop:sorting.reversed"></list>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <item-form></item-form>
            </div>
        </div>
    `
})
export class TodoApp {
    public todos:Array<TodoModel>;
    public sorting: ISort = {
        prop: null, /* explicit no sorting upfront */
        reversed: false
    };

    constructor(
        private todoService: TodoService
    ) {
        this.todos = todoService.todos;
    }

    onSort(sort: ISort): void {
        Object.assign(this.sorting, sort);
    }
}

bootstrap(TodoApp, [TodoService]);