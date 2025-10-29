# Transaction API Spec

## Add Transactions API

Endpoint : POST /api/transactions/

Request Body :
```json
{
  "info": "Desember 2025",
  "data": {
    "type": "income", 
    "nominal": 800000,
    "kategori": "Kiriman Bulanan",
    "tanggal": "2025-12-01",
    "catatan": "Kiriman dari bapak"
  }
}

```
Request Body Success :
```json
{
  "message": "Transaction added successfully",
  "transactionId": "67301b2a7f21a44cde123456"
}

```
Request Body Failed :
```json 
{
  "error": "Nominal cannot be null"
}

```

## Get History Transaction API
 Endpoint : GET /api/transactions

 Request Body Success:
 ```json
{
  "info": "Desember 2025",
  "data": [
    {
      "type": "income",
      "nominal": 800000,
      "kategori": "Kiriman Bulanan",
      "tanggal": "2025-12-01",
      "catatan": "Kiriman dari bapak"
    },
    {
      "type": "spending",
      "nominal": 10000,
      "kategori": "Konsumsi",
      "tanggal": "2025-12-03",
      "catatan": "Warung geprek enak"
    }
  ]
}

```

Request Body Failed :
```json
{
  "error": "No transactions found for this period"
}

```

## Allocation Add Money API

Endpoint : POST /api/alocations

Request Body :
```json
{
    "data" : [
        {"name" : "Uang makan", "Percent": 60 },
        {"name" : "Kebutuhan", "Percent": 30 },
        {"name" : "Saving", "Percent": 10 },


    ]
}
```
Request Body Success :
```json
{
    "data" : "Allocation Set Seccessfuly"
}
```
Request Body Success :
```json
{
  "error": "Total allocation percentage must equal 100%"
}
```

## Allocation Update Money API

Endpoint : PATCH /api/alocations

Request Body :
```json
{
    "data" : [
        {"name" : "Uang makan", "Percent": 60 },
        {"name" : "Kebutuhan", "Percent": 20 },
        {"name" : "Saving", "Percent": 10 },
        {"name" : "Hiburan", "Percent": 10 },


    ]
}
```
Request Body Success :
```json
{
  "message": "Allocation updated successfully"
}

```
Request Body Success :
```json
{
  "error": "Total allocation percentage must equal 100%"
}
```
## Get All Allocations

Endpoint : GET /api/allocations

Request Body Success:
```json
{
  "userId": "67301b2a7f21a44cde123456",
  "allocations": [
    { "name": "Uang makan", "percent": 60 },
    { "name": "Kebutuhan", "percent": 30 },
    { "name": "Saving", "percent": 10 }
  ],
  "updatedAt": "2025-10-27T03:00:00.000Z"
}
```

Request Body Failed :
```json
{
  "error": "Allocations not set yet"
}

```

## Saving money API

Endpoint : GET /api/savings

Request Body Seccess:
```json
{
    "date" : "31 December 2025",
    "balance" : 5000000,
    "history" : [
    {
      "amount": 1000000,
      "source": "Smart Split",
      "transactionId": "67301b2a7f21a44cde123456",
      "date": "2025-10-27T03:20:00.000Z"
    },
    {
      "amount": 4000000,
      "source": "Manual Top-Up",
      "transactionId": null,
      "date": "2025-10-27T03:25:00.000Z"
    }
  ],
    

}
```
Request Body Failed :
```json
{
  "error": "You haven't started saving yet!"
}
```
## Add Saving Money API
Endpoint : POST /api/savings

Request Body :
```json
{
    "amount": 200000,
    "tanggal": "2025-12-31",
    "catatan": "Bisnis"
}
```
Request Body Success :
```json
{
  "message": "Saving added successfully"
}
```
Request Body Failed :
```json
{
  "error": "Amount is required"
}
```

## Update Saving Money API
Endpoint : PATCH /api/savings

Request Body :

```json
{
    "nominal" : "200.000",
    "tanggal" : "31 december 2025", 
    "catatan" : "Bisnis"
}
```
Requset Body Success :
```json
{
    "data" : "data add successfuly"
}
```
Request Body Failed :
```json
{
    "errors" : "Nominal harus dimasukan"
}
```