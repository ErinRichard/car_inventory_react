// Don't include token here for production
let token = `dca45c0c2fb50e81656b5787edfb69ba0fa28607e166e847`

// Object is going to 
export const server_calls = {
    get: async () => {
        const response = await fetch(`https://car-inventory-rangers-er.herokuapp.com/api/cars`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${token}`
        }
    })

        if(!response.ok){
            console.log('Failed to fetch data from the server')
        }

        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`https://car-inventory-rangers-er.herokuapp.com/api/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            // JSON.stringify the data
            body: JSON.stringify(data)
        });
        // if we don't get a response of ok
        if(!response.ok){
            console.log('Failed to Create new Car Data')
        }

        return await response.json()

    },

    update: async (id:string, data: any = {}) => {
        // !!Make sure to add ${id} at the end of the url to avoid creating large amount of cars!!
        const response = await fetch(`https://car-inventory-rangers-er.herokuapp.com/api/cars/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        // Don't have to have this if statement or return await for update because they are part of the 'GET'
        if(!response.ok){
            console.log('Failed to Update Car Data')
        }
    },

    delete: async (id:string) => {
        const response = await fetch(`https://car-inventory-rangers-er.herokuapp.com/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}