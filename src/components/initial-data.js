const initialData = {
    products: {
        'product-1': {id: 'product-1', content: 'Take Out the garbage1'},
        'product-2': {id: 'product-2', content: 'Take Out the garbage2'},
        'product-3': {id: 'product-3', content: 'Take Out the garbage3'},
        'product-4': {id: 'product-4', content: 'Take Out the garbage3'},
        'product-5': {id: 'product-5', content: 'Take Out the garbage3'},
        'product-6': {id: 'product-6', content: 'Take Out the garbage3'},
        'product-7': {id: 'product-7', content: 'Take Out the garbage3'}
    },
    productsColumn: {
        id: 'products',
        title: 'Products',
        productIds: ['product-1', 'product-2', 'product-3'],
    },
    days: {
        'monday': {
            id: 'monday',
            title: 'Monday',
            productIds: [],
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