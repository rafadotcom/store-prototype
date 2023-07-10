export interface Cart {
    status: string;
    data: [{
        _id: string;
        produtos: [{
            _id: string,
            quantidade: number
        }];
    }]
    __v: number
}