import { createContext } from "react";

import menFashion from '../asset/Products/cloth/men/men-1.jpeg'
import womenFashion from '../asset/Products/cloth/women/women-1.jpeg'
import kidsFashion from '../asset/Products/cloth/kids/kids-2.jpeg'

export const FeatureCategoryContext = createContext([
    {
        storeName: "Store 1",
        image: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        url: '/category/men',
        id: 1,
        
    },
    {
        storeName: "Store 2",
        image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        url: '/category/women',
        id: 2
    },
    {
        storeName: "Store 3",
        image: 'https://images.unsplash.com/photo-1584801096196-592feb269e31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        url: '/category/kids',
        id: 3
    }
])