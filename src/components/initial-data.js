const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Take Out the garbage1'},
        'task-2': {id: 'task-2', content: 'Take Out the garbage2'},
        'task-3': {id: 'task-3', content: 'Take Out the garbage3'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        },
    },
    columnOrder: ['column-1','column-2','column-3',]
}

export default initialData;