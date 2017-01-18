# TaskQueue
A queue to loop a asynchronous method on objects in a list

## Usage
### The handler
#### Create a handler that will handle the Task
```javascript
const taskHandler = function(task){
	console.log(task, 'start');
	setTimeout(function(){
		console.log(task, 'done');
		task.done();
	}, 400);
}
```

### The queue
#### To create a queue with the handler `taskHandler`, use:
```javascript
var taskQueue = new TaskQueue(taskHandler)
.on('done', function(){
	console.log('The queue is done! :)');
});
```

### The task
#### Add some tasks to the queue
```javascript
for(var t = 0; t <= 16; t++){
	taskQueue.addTask(new Task('Task', t));
}
```
The ```Task``` object has the following substantial properties:

Name | Type
:---: | :---:
`index` | Integer
`completed` | Boolean
`started` | Boolean
`args` | Array
