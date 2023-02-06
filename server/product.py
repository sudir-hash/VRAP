from fastapi import FastAPI
from beanie import Beanie
from bson import ObjectId
from schemas import Product

app = FastAPI()
beanie = Beanie(app)


@app.get("/products/{product_id}")
async def view_product(product_id: str):
    product = await beanie.get_document("products", {"_id": ObjectId(product_id)})
    return product


@app.post("/products/list")
async def list_product(product: Product):
    product_id = await beanie.insert_document("products", product.dict())
    return {"_id": str(product_id)}


@app.put("/products/{product_id}")
async def update_product(product_id: str, product: Product):
    product["_id"] = ObjectId(product_id)
    await beanie.update_document("products", {"_id": ObjectId(product_id)}, product)
    return {"_id": product_id}


@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    await beanie.delete_document("products", {"_id": ObjectId(product_id)})
    return {"message": "product deleted"}


@app.post("/buy/{product_id}")
async def buy_product(product_id: str):
    product = await beanie.get_document("products", {"_id": ObjectId(product_id)})
    # Implement payment processing logic here
    return {"message": "payment processed"}
