# Imagen Product Recontext API Test Guide

This guide shows how to properly test the Imagen Product Recontext API implementation.

## ⚠️ Important Changes

- **Model**: Now uses `imagen-product-recontext-preview-06-30` (was `imagen-3.0-generate-002`)
- **Product Images**: **REQUIRED** - You must provide 1-3 product images for every request
- **Endpoint**: Use `/generate-with-reference` instead of `/generate`

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

### 2. API Info
```bash
curl http://localhost:3001/
```

### 3. Upload Product Images
```bash
# Upload a single product image
curl -X POST -F "image=@/path/to/your/product.jpg" http://localhost:3001/upload

# Upload multiple product images (up to 3)
curl -X POST \
  -F "reference_images=@/path/to/product1.jpg" \
  -F "reference_images=@/path/to/product2.jpg" \
  -F "reference_images=@/path/to/product3.jpg" \
  http://localhost:3001/generate-with-reference \
  -F "prompt=A luxury hotel room with modern furniture" \
  -F "styleProfile=blaue-gans" \
  -F "numberOfImages=2"
```

### 4. Generate Images with Product Recontext (CORRECT METHOD)
```bash
curl -X POST http://localhost:3001/generate-with-reference \
  -F "reference_images=@/path/to/your/product.jpg" \
  -F "prompt=A woman enjoying breakfast at a luxury hotel" \
  -F "styleProfile=blaue-gans" \
  -F "numberOfImages=2" \
  -F "personGeneration=allow_adult" \
  -F "safetySetting=block_medium_and_above" \
  -F "addWatermark=true" \
  -F "enhancePrompt=true" \
  -F "mimeType=image/png" \
  -F "compressionQuality=75"
```

### 5. Test with Multiple Product Images
```bash
curl -X POST http://localhost:3001/generate-with-reference \
  -F "reference_images=@/path/to/product1.jpg" \
  -F "reference_images=@/path/to/product2.jpg" \
  -F "prompt=A couple relaxing in a luxury hotel suite" \
  -F "styleProfile=schloss-freudenstein" \
  -F "numberOfImages=3"
```

### 6. Get Style Profiles
```bash
curl http://localhost:3001/styles
```

## Available Style Profiles

- `blaue-gans`: Modern luxury, warm lighting, contemporary design
- `kinfolk-blaue-gans`: Kinfolk magazine style, minimal composition, soft natural daylight
- `schloss-freudenstein`: Historic elegance, romantic atmosphere, wine country
- `prati-palai`: Italian lakeside, Mediterranean colors, relaxed luxury
- `kleiner-loewe`: Bodensee lakeside charm, traditional luxury
- `winternitz-villa`: Historic villa elegance, romantic atmosphere

## Parameters

### Required Parameters
- `prompt`: Text description of the scene
- `reference_images`: 1-3 product images (file upload)

### Optional Parameters
- `styleProfile`: Style profile ID (default: none)
- `numberOfImages`: Number of images to generate (1-4, default: 2)
- `personGeneration`: `allow_adult`, `allow_all`, `dont_allow` (default: `allow_adult`)
- `safetySetting`: `block_low_and_above`, `block_medium_and_above`, `block_only_high`, `block_none` (default: `block_medium_and_above`)
- `addWatermark`: `true` or `false` (default: `true`)
- `enhancePrompt`: `true` or `false` (default: `true`)
- `mimeType`: `image/png` or `image/jpeg` (default: `image/png`)
- `compressionQuality`: 0-100 for JPEG (default: 75)

## Error Handling

### Common Errors
1. **No product images**: `Product images are required for Imagen product recontext API`
2. **Too many images**: Maximum 3 product images, 4 generated images
3. **Invalid model**: Ensure you have access to `imagen-product-recontext-preview-06-30`

### Testing Error Cases
```bash
# Test without product images (should fail)
curl -X POST http://localhost:3001/generate-with-reference \
  -F "prompt=A luxury hotel room" \
  -F "styleProfile=blaue-gans"

# Test with too many product images (should fail)
curl -X POST http://localhost:3001/generate-with-reference \
  -F "reference_images=@image1.jpg" \
  -F "reference_images=@image2.jpg" \
  -F "reference_images=@image3.jpg" \
  -F "reference_images=@image4.jpg" \
  -F "prompt=A luxury hotel room"
```

## Example Response

```json
{
  "success": true,
  "message": "Images generated successfully with reference images",
  "images": [
    {
      "filename": "generated-ref-1234567890-0.png",
      "url": "http://localhost:3001/generated-ref-1234567890-0.png",
      "path": "./uploads/generated-ref-1234567890-0.png",
      "size": 2048576
    }
  ],
  "referenceImages": [
    {
      "filename": "image-1234567890-123456789.jpg",
      "url": "http://localhost:3001/image-1234567890-123456789.jpg",
      "base64": "base64encodedstring...",
      "mimeType": "image/jpeg"
    }
  ],
  "prompt": "Professional travel photography, modern luxury hotel, warm golden hour lighting, contemporary design, 35mm lens, authentic moments, A woman enjoying breakfast at a luxury hotel",
  "config": {
    "styleProfile": "blaue-gans",
    "numberOfImages": 2
  }
}
```

## Migration from Old API

If you were using the old `/generate` endpoint:

1. **Old way** (deprecated):
```bash
curl -X POST http://localhost:3001/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A luxury hotel room"}'
```

2. **New way** (required):
```bash
curl -X POST http://localhost:3001/generate-with-reference \
  -F "reference_images=@product.jpg" \
  -F "prompt=A luxury hotel room"
```

## Troubleshooting

1. **Access denied**: Ensure you have access to Imagen Product Recontext API
2. **Authentication error**: Run `gcloud auth login` and `gcloud auth application-default login`
3. **Project not found**: Check `GOOGLE_CLOUD_PROJECT_ID` in `config.env`
4. **Region not supported**: Check `GOOGLE_CLOUD_LOCATION` in `config.env`
