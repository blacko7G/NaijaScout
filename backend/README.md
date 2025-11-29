# NaijaScout Backend API

A RESTful API for managing Nigerian football players and scouting data.

## 🚀 Features

- **Player Management**: CRUD operations for football players
- **Scout Points Calculation**: Automatic calculation based on goals, assists, and interactions
- **Advanced Filtering**: Filter players by position, status, and other criteria
- **Pagination**: Built-in pagination for large datasets
- **Statistics**: Aggregated player statistics and analytics
- **Security**: Rate limiting, CORS, and input validation
- **MongoDB Integration**: Robust database with Mongoose ODM

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository** (if not already done)
2. **Navigate to backend directory**:
   ```bash
   cd Naijascout/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cp env.example .env
   ```
   Then edit `.env` with your configuration.

5. **Start MongoDB** (if using local MongoDB):
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

## ⚙️ Configuration

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/naijascout
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/naijascout

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seed Database
```bash
node seedData.js
```

## 📚 API Endpoints

### Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players (with filtering & pagination) |
| GET | `/api/players/:id` | Get single player |
| POST | `/api/players` | Create new player |
| PUT | `/api/players/:id` | Update player |
| DELETE | `/api/players/:id` | Delete player |
| GET | `/api/players/stats/overview` | Get player statistics |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

## 🔍 Query Parameters

### Get Players with Filters
```
GET /api/players?sort=scoutPoints&order=desc&limit=10&page=1&position=Forward&status=active
```

**Parameters:**
- `sort`: Field to sort by (default: scoutPoints)
- `order`: Sort order - 'asc' or 'desc' (default: desc)
- `limit`: Number of results per page (default: 10)
- `page`: Page number (default: 1)
- `position`: Filter by position (Forward, Midfielder, Defender, Goalkeeper)
- `status`: Filter by status (active, inactive, scouted, signed)

## 📊 Player Data Structure

```json
{
  "name": "Victor Osimhen",
  "position": "Forward",
  "age": 24,
  "nationality": "Nigerian",
  "club": "Napoli",
  "engagement": {
    "goals": 26,
    "assists": 4,
    "interactions": 45,
    "matches": 32,
    "minutes": 2880
  },
  "stats": {
    "pace": 89,
    "shooting": 85,
    "passing": 64,
    "dribbling": 78,
    "defending": 35,
    "physical": 82
  },
  "scoutPoints": 75,
  "status": "active",
  "image": "/avatar-icon.png"
}
```

## 🧮 Scout Points Calculation

Scout points are automatically calculated using the formula:
```
scoutPoints = goals + (assists × 2) + interactions
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable CORS settings
- **Input Validation**: Express-validator for all inputs
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error handling

## 🧪 Testing the API

### Using curl

1. **Get all players**:
   ```bash
   curl http://localhost:5000/api/players
   ```

2. **Create a player**:
   ```bash
   curl -X POST http://localhost:5000/api/players \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Player",
       "position": "Forward",
       "age": 22,
       "engagement": {
         "goals": 10,
         "assists": 5,
         "interactions": 20
       }
     }'
   ```

3. **Get player statistics**:
   ```bash
   curl http://localhost:5000/api/players/stats/overview
   ```

### Using Postman

Import the following collection:

```json
{
  "info": {
    "name": "NaijaScout API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Players",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/players"
      }
    },
    {
      "name": "Create Player",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/players",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test Player\",\n  \"position\": \"Forward\",\n  \"age\": 22,\n  \"engagement\": {\n    \"goals\": 10,\n    \"assists\": 5,\n    \"interactions\": 20\n  }\n}"
        }
      }
    }
  ]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network connectivity (for Atlas)

2. **Port Already in Use**:
   - Change PORT in `.env`
   - Kill existing process: `npx kill-port 5000`

3. **CORS Errors**:
   - Update CORS_ORIGIN in `.env` to match your frontend URL

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request






