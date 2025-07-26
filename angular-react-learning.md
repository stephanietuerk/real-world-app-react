# What I've learned about shifting from Angular to React

- In Angular, unless you are creating a very small application where you are passing properties up and down through `@Input` and `@Output` (not recommended), I find myself constantly mentally managing reactivity. In Angular apps, I've always chosen to use RxJS and Observables (and now signals) to create state where changes will propagate to the DOM (always subscribed in the template with `AsyncPipe`), as opposed to using NgRx which adds a lot of boilerplate, but even with this fully-reactive approach to state, because I
