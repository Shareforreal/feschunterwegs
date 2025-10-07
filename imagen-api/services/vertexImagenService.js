const https = require('https');
const { execSync } = require('child_process');
require('dotenv').config({ path: '../config.env' });

class VertexImagenService {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION;
    // ⚠️ WAITING: Using regular Imagen until Product Recontext access is approved
    // TODO: Change to imagen-product-recontext-preview-06-30 once access is approved
    this.apiEndpoint = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/imagen-3.0-generate-002:predict`;

    if (!this.projectId || !this.location) {
      throw new Error('GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_LOCATION are required for Vertex AI');
    }

    this.styleProfiles = {
      'blaue-gans': {
        name: 'Blaue Gans',
        description: 'Modern luxury, warm lighting, contemporary design',
        prompt_prefix: 'Professional travel photography, modern luxury hotel, warm golden hour lighting, contemporary design, 35mm lens, authentic moments,'
      },
      'kinfolk-blaue-gans': {
        name: 'Kinfolk Blaue Gans',
        description: 'Kinfolk magazine style, minimal composition, soft natural daylight, muted earthy tones',
        prompt_prefix: 'Kinfolk magazine style, minimal composition, soft natural daylight, muted earthy tones (beiges, soft grays, warm whites), gentle shadows, organic textures, editorial, serene, tactile, elegant, balanced negative space, feeling of slow living, professional photography,'
      },
      'schloss-freudenstein': {
        name: 'Schloss Freudenstein',
        description: 'Historic elegance, romantic atmosphere, wine country',
        prompt_prefix: 'Historic castle hotel, romantic atmosphere, golden hour, elegant, detailed, wine country landscape,'
      },
      'prati-palai': {
        name: 'Prati Palai',
        description: 'Italian lakeside, Mediterranean colors, relaxed luxury',
        prompt_prefix: 'Italian lakeside villa, Mediterranean colors, relaxed luxury, vibrant, sunny, clear water,'
      },
      'kleiner-loewe': {
        name: 'Kleiner Loewe',
        description: 'Bodensee lakeside charm, traditional luxury',
        prompt_prefix: 'Charming Bodensee lakeside hotel, traditional luxury, cozy, serene, natural light,'
      },
      'winternitz-villa': {
        name: 'Winternitz Villa',
        description: 'Historic villa elegance, romantic atmosphere',
        prompt_prefix: 'Historic villa, elegant, romantic atmosphere, soft lighting, classic architecture,'
      }
    };
  }

  async generate(prompt, styleProfile, options = {}) {
    return this.generateWithReference(prompt, [], styleProfile, options);
  }

  async generateWithReference(prompt, referenceImages, styleProfile, options = {}) {
    try {
      // Validate that we have product images
      if (!referenceImages || referenceImages.length === 0) {
        throw new Error('Product images are required for product recontext generation');
      }

      // Create a detailed prompt that describes the product images
      const enhancedPrompt = this.createProductRecontextPrompt(prompt, referenceImages, styleProfile);

      console.log('Generating image with enhanced product recontext simulation:');
      console.log('Enhanced prompt:', enhancedPrompt);
      console.log('Reference images:', referenceImages.length);
      console.log('Options:', options);

      // Get access token
      const accessToken = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();

      // Using regular Imagen API with enhanced prompts to simulate product recontext
      const requestBody = {
        instances: [{
          prompt: enhancedPrompt
        }],
        parameters: {
          sampleCount: Math.min(options.numberOfImages || 2, 4),
          personGeneration: options.personGeneration || 'allow_adult',
          safetySetting: options.safetySetting || 'block_medium_and_above',
          addWatermark: options.addWatermark !== false // Default to true
        }
      };

      console.log('Sending request to Vertex AI with enhanced product description...');
      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await this.makeRequest(accessToken, requestBody);

      if (response.predictions && response.predictions.length > 0) {
        return {
          success: true,
          images: response.predictions.map((prediction, index) => ({
            image: {
              imageBytes: prediction.bytesBase64Encoded,
              mimeType: prediction.mimeType || 'image/png'
            }
          })),
          prompt: enhancedPrompt,
          config: options,
          referenceImages: referenceImages
        };
      } else {
        throw new Error('No predictions returned from Vertex AI');
      }
    } catch (error) {
      console.error('Vertex AI generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  createProductRecontextPrompt(basePrompt, referenceImages, styleProfile) {
    // Apply style profile first
    const styledPrompt = this.applyStyleProfile(basePrompt, styleProfile);
    
    // Simple fallback: just return the styled prompt
    // TODO: Once Product Recontext API access is approved, this will be replaced with actual image analysis
    return styledPrompt;
  }

  makeRequest(accessToken, requestBody) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(requestBody);
      
      const options = {
        hostname: `${this.location}-aiplatform.googleapis.com`,
        port: 443,
        // ⚠️ TEMPORARY: Reverting to working endpoint until product recontext access is granted
        // TODO: Change back to imagen-product-recontext-preview-06-30 once access is approved
        path: `/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/imagen-3.0-generate-002:predict`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(response);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  }

  applyStyleProfile(prompt, styleProfileId) {
    const profile = this.styleProfiles[styleProfileId];
    if (profile && profile.prompt_prefix) {
      return `${profile.prompt_prefix} ${prompt}`;
    }
    return prompt;
  }

  enhancePrompt(prompt, enhancements) {
    let enhanced = prompt;
    if (enhancements.lighting) {
      enhanced = `${enhancements.lighting} lighting, ${enhanced}`;
    }
    if (enhancements.cameraAngle) {
      enhanced = `${enhancements.cameraAngle} angle, ${enhanced}`;
    }
    if (enhancements.lensType) {
      enhanced = `${enhancements.lensType} lens, ${enhanced}`;
    }
    return enhanced;
  }

  getStyleProfiles() {
    return Object.keys(this.styleProfiles).map(id => ({
      id,
      name: this.styleProfiles[id].name,
      description: this.styleProfiles[id].description
    }));
  }
}

module.exports = VertexImagenService;
