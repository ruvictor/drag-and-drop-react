const initialData = {
    products: {
        'task-1': {id: 'task-1', content: 'Take Out the garbage1'},
        'task-2': {id: 'task-2', content: 'Take Out the garbage2'},
        'task-3': {id: 'task-3', content: 'Take Out the garbage3'}
    },
    productsColumn: {
        id: 'products',
        title: 'Products',
        productIds: ['task-1', 'task-2', 'task-3'],
    },
    days: {
        'monday': {
            id: 'monday',
            title: 'Monday',
            productIds: ['task-1', 'task-2', 'task-3'],
        },
        'tuesday': {
            id: 'tuesday',
            title: 'Tuesday',
            productIds: [],
        },
        'wednesday': {
            id: 'wednesday',
            title: 'Wednesday',
            productIds: [],
        },
        'thursday': {
            id: 'thursday',
            title: 'Thursday',
            productIds: [],
        },
        'friday': {
            id: 'friday',
            title: 'Friday',
            productIds: [],
        },
        'saturday': {
            id: 'saturday',
            title: 'Saturday',
            productIds: [],
        },
        'sunday': {
            id: 'sunday',
            title: 'Sunday',
            productIds: [],
        },
    },
    daysOrder: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
}

export default initialData;