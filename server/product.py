from fastapi import APIRouter, HTTPException
from db import products_collection
from schemas import Product
from bson import ObjectId
from fastapi import FastAPI, Depends, Request

product_router = APIRouter()




@product_router.get("/view/{product_id}")
async def view_product(product_id: str):
    try:
        if product_id is None:
            raise HTTPException(status_code=404, detail="Product id missing")
        product = await products_collection.find_one({"_id": ObjectId(product_id)})
        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")
        product["_id"] = str(product["_id"])
        return dict(product)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error -{e}: Product not found")


@product_router.get("/view-all")
async def view_all_products():
    try:
        products = []
        async for product in products_collection.find({"stock": {"$gt": 0}}):
            product["_id"] = str(product["_id"])
            products.append(product)
        if products is None:
            raise HTTPException(status_code=404, detail="No products listed")
        return products
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error -{e}: No products listed")


@product_router.post("/list")
async def sell_product(product: Product):
    try:
        if product is None:
            raise HTTPException(status_code=404, detail="Product info missing")
        result = await products_collection.insert_one(product.dict())
        if result is None:
            raise HTTPException(status_code=404, detail="Product not listed")
        return {"message": f"product {product.name} listed for sale"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error -{e}: Product not listed")


@product_router.put("/update/{product_id}")
async def update_product(product_id: str, product: Product):
    try:
        product_record = await products_collection.find_one(
            {"_id": ObjectId(product_id)}
        )
        if product_record is None:
            raise HTTPException(status_code=404, detail="Product not found")
        elif product is None or product_id is None:
            raise HTTPException(status_code=404, detail="Product info missing")
        result = await products_collection.update_one(
            {"_id": ObjectId(product_id)}, {"$set": product.dict()}
        )
        if result.modified_count == 0:
            raise HTTPException(
                status_code=404, detail=f"Product {product.name} not updated"
            )
        return {"message": f"product {product.name} updated"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error -{e}: Product not updated")


@product_router.delete("/delete/{product_id}")
async def delete_product(product_id: str):
    try:
        product_record = await products_collection.find_one(
            {"_id": ObjectId(product_id)}
        )
        if product_record is None:
            raise HTTPException(status_code=404, detail="Product not found")
        elif product_id is None:
            raise HTTPException(status_code=404, detail="Product id missing")
        result = await products_collection.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail=f"Product not deleted")
        return {"message": f"product {product_id} deleted"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error -{e}: Product not deleted")


@product_router.post("/buy/{product_id}")
async def buy_product(product_id: str,body: dict):
    print(product_id,body)
    try:
        print(product_id,body)
        if product_id is None:
            raise HTTPException(status_code=404, detail="Product id missing")
        if body['count'] is None:
            raise HTTPException(status_code=404, detail="request body is missing")
        product = await products_collection.find_one(
            {"_id": ObjectId(product_id)}
        )    
        count   =   int(body['count'])    
        print(product,"found product")
        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")
        elif product["stock"] < count:
            raise HTTPException(status_code=404, detail="Product out of stock")
        
        result = await products_collection.update_one(
            {"_id": ObjectId(product_id)}, {"$set": {"stock": product["stock"] - count}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail=f"Purchase not processed")

        return {"message": f"purchase of {product_id}  processed","status":200}
    except Exception as e:
        raise HTTPException(
            status_code=404, detail=f"Error -{e}: Purchase not processed"
        )
