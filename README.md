# ☕️ Drinks App
A small web application for saving your favorite coffees and teas. The front end is a Typescript React (Vite) and the back end is Typescript Express. 

## 🏃 Running a production build
1. Clone the repository by running `git clone https://github.com/JuanitoSebastian/Drinks-App.git`
2. Open terminal at the root of the repository and run `docker compose up`
3. The application launches at `localhost:80`

## 📡 API endpoints

### Fetch many drinks
```
GET /api/drinks?type={{type}}&search={{search}}
```
| Parameter | Type   | Required? | Description                                       |
|-----------|--------|-----------|---------------------------------------------------|
| type      | enum   | no        | Type of drink. Enum values: **coffee** or **tea** |
| search    | string | no        | Sort direction. Supports ASC and DESC.            |

**Example response**
```
{
    "data": [
        {
            "id": "912045b0-b5db-11ed-ac2e-4df5eed4e12c",
            "type": "tea",
            "name": "Dreamy Mountains",
            "price": 2.2,
            "roast": 2,
            "weight": 500
        },
        {
            "id": "939c1b20-b5db-11ed-ac2e-4df5eed4e12c",
            "type": "coffee",
            "name": "Lucaffe Mamma Lucia",
            "price": 22.9,
            "roast": 4,
            "weight": 500
        }
    ]
}
```

### Create new drink
```
POST /api/drinks
```
Endpoint for creating new drinks. Successful creation returns the created Drink.
- name: string
- type: enum, supported values coffee and tea
- price: number
- roast: number, integer from 1 to 5
- weight: number, weight in grams

**Example request body**

```
{
    "name": "MokaSirs Intenso",
    "type": "coffee",
    "price": 7,
    "roast": 5,
    "weight": 1000
}
```
**Example response**

```
{
    "data": {
        "id": "37ffd620-b730-11ed-ab99-c938791196c1",
        "name": "MokaSirs Intenso",
        "type": "coffee",
        "price": 7,
        "roast": 5,
        "weight": 1000
    }
}
```