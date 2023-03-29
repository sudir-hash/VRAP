from typing import List
from fastapi import FastAPI, HTTPException,APIRouter
from pydantic import BaseModel
import math
from pymongo import MongoClient
from db import shops_collection


shop_router = APIRouter()

class Shop(BaseModel):
    shopname: str
    coordinates: List[str]
    image_url: List[str]
    category: str
    distance: float
    url:str




@shop_router.post("/ping")
async def ping(body: dict):
    print(body)
    return {"ping": "pong","body":body,"status":"success"}

@shop_router.post("/addShop")
async def add_shop(body: dict):
    print(body,"to be added")
    shop={
        "shopname": body['shopname'],
        "coordinates": body['coordinates'],
        "image_url": body['image_url'],
        "category": body['category'],
        "url": body['url'],
    }
    result = await shops_collection.insert_one(shop)
    print(result,"added")
    return {"message": f"shop {body['shopname']} added"}

@shop_router.post("/getShops")
async def get_shops(body: dict) -> List[Shop]:
    # Connect to MongoDB
    latitude=   body['latitude']    
    longitude=  body['longitude']

    # # Find all records in the collection
    # records = await shops_collection.find({})
    # print(records)
    print (latitude,longitude)
    # Calculate the distance between each record and the given coordinates
    shops = []
    async for record in shops_collection.find({}):
        # print(record)
        lat = float(record['coordinates'][0])
        lon = float(record['coordinates'][1])
        distance = distance_between_points(latitude, longitude, lat, lon)
        shop = Shop(**record, distance=distance)
        shops.append(shop)
    # print(shops)

    # # Sort the shops by distance in ascending order
    sorted_shops = sorted(shops, key=lambda x: x.distance)

    return sorted_shops

def distance_between_points(lat1, lon1, lat2, lon2):
    # Radius of the earth in kilometers
    R = 6371

    # Convert latitudes and longitudes from degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c

    return distance
'''
{
  "shopname": "Example Shop",
  "coordinates": ["40.7128", "-74.0060"],
  "image_url": ["https://example.com/image.jpg"],
  "category": "Example Category",
  "url":"Example"
}

'''