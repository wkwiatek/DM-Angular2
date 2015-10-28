import {
    View,
    Component,
    FORM_DIRECTIVES,
    NgFor,

    Validators,
    FormBuilder,
    ControlGroup
} from 'angular2/angular2';

import {TodoModel, TodoService} from '../services/todo';

@Component({
    selector: 'item-form'
})

@View({
    directives: [FORM_DIRECTIVES, NgFor],
    template: `
        <h2 class="text-center">New task</h2>
        <form (submit)="submit(todoForm)" [ng-form-model]="todoForm" class="form-horizontal">

            <div class="form-group">
                <div class="col-xs-10">
                    <label class="control-label">Title</label>
                    <input type="text" ng-control="title" class="form-control"/>

                </div>
                <div class="col-xs-2">
                    <label class="control-label">Priority</label>
                    <select ng-control="priority" class="form-control">
                        <option *ng-for="#val of priority" [value]="val">{{ val }}</option>
                    </select>
                </div>

            </div>
            <div class="form-group">
                <div class="col-xs-12 text-center">
                    <button type="submit" class="btn btn-success btn-lg">Yet more stuff...</button>
                </div>
            </div>

        </form>
    `
})

export class ItemFormComponent {
    public todoForm: ControlGroup;
    public priority: Array<number> = [1, 2, 3];

    constructor(
        private todoService: TodoService,
        builder: FormBuilder
    ) {
        this.todoForm = builder.group({
           title: [this.defaults.title, Validators.required], // TODO: display validation messages
           priority: [this.defaults.priority /* TODO: custom validation */],
        });
    }

    submit(form): void {
        let {title, priority} = form.value;
        if(form.valid) {
            this.todoService.add( new TodoModel(title, priority) );

            form.controls.title.updateValue(this.defaults.title);
            form.controls.priority.updateValue(this.defaults.priority);
        }
    }

    get defaults() {
        return {
            title: "",
            priority: 1
        }
    }
}