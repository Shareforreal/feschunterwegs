# Imagen API Test Script

This script tests the basic functionality of the Imagen API.

## Setup

1. Install dependencies:
```bash
cd imagen-api
npm install
```

2. Start the server:
```bash
npm start
```

## Test Commands

### 1. Health Check
```bash
curl http://localhost:3001/health
```

### 2. Upload Test Image
```bash
curl -X POST -F "image=@/path/to/your/image.jpg" http://localhost:3001/upload
```

### 3. Generate Images
```bash
curl -X POST http://localhost:3001/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A woman enjoying breakfast at a luxury hotel",
    "styleProfile": "blaue-gans",
    "aspectRatio": "16:9",
    "numberOfImages": 2,
    "characterType": "default",
    "enhancements": {
      "photography": true,
      "lighting": "warm golden hour",
      "lens": "35mm",
      "mood": "relaxed"
    }
  }'
```

### 4. Get Style Profiles
```bash
curl http://localhost:3001/styles
```

## Available Style Profiles

- `blaue-gans`: Modern luxury, warm lighting, contemporary design
- `schloss-freudenstein`: Historic elegance, romantic atmosphere, wine country
- `prati-palai`: Italian lakeside, Mediterranean colors, relaxed luxury
- `kleiner-loewe`: Bodensee lakeside charm, traditional luxury
- `winternitz-villa`: Historic villa elegance, romantic atmosphere

## Character Types

- `default`: Same woman in her 30s, casual elegant style
- `couple`: Happy couple in their 30s, casual elegant style
- `group`: Group of friends in their 30s, casual elegant style
- `none`: No character description added

## Aspect Ratios

- `1:1`: Square
- `3:4`: Portrait
- `4:3`: Landscape
- `9:16`: Vertical
- `16:9`: Widescreen (default)
