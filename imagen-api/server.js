const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const VertexImagenService = require('./services/vertexImagenService');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Imagen service
let imagenService;
try {
  imagenService = new VertexImagenService();
  console.log('Vertex AI Imagen service initialized successfully');
} catch (error) {
  console.error('Failed to initialize Vertex AI Imagen service:', error.message);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Ensure uploads directory exists
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Imagen Product Recontext API Server',
    version: '2.0.0',
    description: 'API for generating images using Google Imagen Product Recontext',
    status: '⏳ WAITING FOR API ACCESS APPROVAL',
    note: 'Currently using regular Imagen API until Product Recontext access is approved',
    endpoints: {
      upload: 'POST /upload - Upload product images',
      'generate-with-reference': 'POST /generate-with-reference - Generate images (limited without Product Recontext API)',
      generate: 'POST /generate - DEPRECATED (use generate-with-reference)',
      styles: 'GET /styles - Get available style profiles',
      health: 'GET /health - Health check'
    },
    requirements: {
      note: 'Imagen Product Recontext API requires 1-3 product images per request',
      model: 'imagen-product-recontext-preview-06-30 (pending approval)',
      maxImages: 'Up to 3 product images, up to 4 generated images'
    },
    waitingFor: {
      api: 'Imagen Product Recontext API access approval',
      model: 'imagen-product-recontext-preview-06-30',
      currentBehavior: 'Uses regular Imagen API with text prompts only'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Upload reference images
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: imageInfo
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

// Generate images using Imagen (DEPRECATED - use /generate-with-reference instead)
app.post('/generate', async (req, res) => {
  try {
    res.status(400).json({ 
      error: 'This endpoint is deprecated. Imagen product recontext API requires product images. Use /generate-with-reference instead.',
      suggestion: 'Please use POST /generate-with-reference with uploaded product images'
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

// Generate images with product images (REQUIRED for Imagen product recontext API)
app.post('/generate-with-reference', upload.array('reference_images', 3), async (req, res) => {
  try {
    if (!imagenService) {
      return res.status(500).json({ error: 'Imagen service not initialized' });
    }

    const { 
      prompt, 
      styleProfile, 
      numberOfImages = 2,
      personGeneration = 'allow_adult',
      safetySetting = 'block_medium_and_above',
      addWatermark = true,
      enhancePrompt = true,
      mimeType = 'image/png',
      compressionQuality = 75
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // ✅ FIXED: Validate that product images are provided (required for product recontext API)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'Product images are required for Imagen product recontext API',
        details: 'Please upload 1-3 product images using the reference_images field'
      });
    }

    // Process uploaded product images
    const referenceImages = [];
    for (const file of req.files) {
      const imageBuffer = fs.readFileSync(file.path);
      const base64Image = imageBuffer.toString('base64');
      referenceImages.push({
        filename: file.filename,
        url: `http://localhost:${PORT}/${file.filename}`,
        base64: base64Image,
        mimeType: file.mimetype
      });
    }

    console.log(`Processing ${referenceImages.length} product images for recontext generation`);

    // Generate images with product images using Imagen product recontext API
    const result = await imagenService.generateWithReference(
      prompt, 
      referenceImages,
      styleProfile, 
      { 
        numberOfImages: Math.min(numberOfImages, 4),
        personGeneration,
        safetySetting,
        addWatermark,
        enhancePrompt,
        mimeType,
        compressionQuality
      }
    );

    if (result.success) {
      // Save images to files and return URLs
      const savedImages = [];
      
      for (let i = 0; i < result.images.length; i++) {
        const image = result.images[i];
        const filename = `generated-ref-${Date.now()}-${i}.png`;
        const filepath = path.join(uploadDir, filename);
        
        // Convert base64 image bytes to binary and save
        const imageBuffer = Buffer.from(image.image.imageBytes, 'base64');
        fs.writeFileSync(filepath, imageBuffer);
        
        savedImages.push({
          filename: filename,
          url: `http://localhost:${PORT}/${filename}`,
          path: filepath,
          size: imageBuffer.length
        });
      }

      res.json({
        success: true,
        message: 'Images generated successfully with reference images',
        images: savedImages,
        referenceImages: referenceImages,
        prompt: prompt,
        config: {
          styleProfile,
          numberOfImages: result.images.length
        }
      });
    } else {
      res.status(500).json({ 
        error: 'Image generation failed', 
        details: result.error 
      });
    }

  } catch (error) {
    console.error('Reference generation error:', error);
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

// Get available style profiles
app.get('/styles', (req, res) => {
  res.json({
    success: true,
    styles: imagenService.getStyleProfiles()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Imagen API server running on http://localhost:${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
});
