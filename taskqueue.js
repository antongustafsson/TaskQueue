// Anton Gustafsson
// TaskQueue

function TaskQueue(method, taskTimeout){
  var this_ = this;
  this.taskTimeout = taskTimeout || false;
  this.tasks = [];
  this.method = method;
  this.currentTask = null;
  this.doneEventCalled = true;
  this.tasktimeout = -1;
  this.interval =
    setInterval(function(){
      if(this_.tasks.length > 0){
        if(this_.currentTask == null){
          this_.currentTask = this_.tasks[0];
        }
        if(!this_.currentTask.started){
          this_.method(this_.currentTask);
          if(this_.taskTimeout){
            this_.tasktimeout = setTimeout(function(){
              if(!this_.currentTask.completed){
                this_.tasks.splice(0, 1);
                if(this_.tasks.length > 0){
                  this_.currentTask = this_.tasks[0];
                  this_.method(this_.currentTask);
                }
              }
            }, this_.taskTimeout);
          }
          this_.currentTask.started = true;
        }

        if(this_.currentTask.completed){
          clearTimeout(this_.tasktimeout);
          this_.tasks.splice(0, 1);
          if(this_.tasks.length > 0){
            this_.currentTask = this_.tasks[0];
          }
        }
      }else{
        if(!this_.doneEventCalled){
          for (var i = 0; i < this_.eventHandlers.done.length; i++) {
            this_.eventHandlers.done[i]();
          }
          this_.doneEventCalled = true;
        }
      }
    }, 200);

  this.addTask = function(task){
    this_.doneEventCalled = false;
    task.index = this_.tasks.push(task) - 1;
    this_.currentTask = this_.tasks[0];
  }
  this.eventHandlers = {
    done: []
  }
  this.on = function(event, handler){
    switch (event) {
      case 'done':
        this_.eventHandlers.done.push(handler);
        break;
      default:

    }
    return this_;
  }
}

function Task(){
  var this_ = this;
  this.index = null;
  this.completed = false;
  this.started = false;
  this.args = arguments;
  this.done = function(){
    this_.completed = true;
  }
  this.timeout = function(){

  }
}