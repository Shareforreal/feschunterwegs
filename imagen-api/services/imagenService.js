const { GoogleGenAI, SubjectReferenceImage } = require('@google/genai');
const fs = require('fs');
const path = require('path');

class ImagenService {
  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!this.apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is required');
    }
    
    // Initialize the client correctly with @google/genai
    this.client = new GoogleGenAI(this.apiKey);
  }

  async generateImage(prompt, options = {}) {
    try {
      const {
        numberOfImages = 2,
        aspectRatio = '16:9',
        personGeneration = 'allow_adult'
      } = options;

      console.log('Generating image with prompt:', prompt);
      console.log('Options:', options);

      // Use the correct Imagen API method from @google/genai
      const response = await this.client.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: numberOfImages,
          aspectRatio: aspectRatio,
          personGeneration: personGeneration
        }
      });

      return {
        success: true,
        images: response.generatedImages,
        prompt: prompt,
        config: options
      };
    } catch (error) {
      console.error('Imagen generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateWithStyle(prompt, styleProfile, options = {}) {
    try {
      // Apply style profile to prompt
      const styledPrompt = this.applyStyleProfile(prompt, styleProfile);
      
      return await this.generateImage(styledPrompt, options);
    } catch (error) {
      console.error('Style generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateWithReference(prompt, referenceImages, styleProfile, options = {}) {
    try {
      // Since reference images are not working with @google/genai, 
      // create a detailed prompt that describes Andreas and the hotel art
      let detailedPrompt = this.createDetailedPrompt(prompt, referenceImages);
      
      // Apply style profile to the detailed prompt
      const styledPrompt = this.applyStyleProfile(detailedPrompt, styleProfile);
      
      console.log('Generating image with detailed prompt (reference images not supported):');
      console.log('Styled prompt:', styledPrompt);
      console.log('Options:', options);

      // Use regular generateImages method
      const requestConfig = {
        model: 'imagen-3.0-generate-002',
        prompt: styledPrompt,
        config: {
          numberOfImages: options.numberOfImages || 2,
          aspectRatio: options.aspectRatio || '16:9',
          personGeneration: options.personGeneration || 'allow_adult'
        }
      };

      const response = await this.client.models.generateImages(requestConfig);

      return {
        success: true,
        images: response.generatedImages,
        prompt: styledPrompt,
        config: options,
        referenceImages: referenceImages
      };
    } catch (error) {
      console.error('Reference generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  createDetailedPrompt(basePrompt, referenceImages) {
    // Create a detailed description based on the reference images
    let detailedPrompt = basePrompt;
    
    // Add description of Andreas based on the reference image
    if (referenceImages && referenceImages.length > 0) {
      detailedPrompt += ". Andreas is a man in his late 30s with short light brown hair, light stubble, and light eyes, wearing a dark blazer over a white unbuttoned shirt. He has a warm, welcoming smile and professional demeanor.";
      
      // Add description of the hotel art
      detailedPrompt += " The Blaue Gans hotel features contemporary art pieces including colorful murals, paintings of families by lakes, portraits of children with stuffed animals, and modern artistic elements. The hotel has a sophisticated, art-focused atmosphere with clean lines and contemporary design.";
    }
    
    return detailedPrompt;
  }

  applyStyleProfile(prompt, styleProfile) {
    const styleProfiles = {
      'blaue-gans': 'Professional travel photography, modern luxury hotel, warm golden hour lighting, contemporary design, 35mm lens, authentic moments',
      'kinfolk-blaue-gans': 'Kinfolk magazine style, minimal composition, soft natural daylight, muted earthy tones, editorial photography',
      'schloss-freudenstein': 'Historic elegance, romantic atmosphere, wine country setting, warm candlelight, vintage luxury, professional photography',
      'prati-palai': 'Italian lakeside luxury, Mediterranean colors, relaxed elegance, natural lighting, authentic Italian hospitality, travel photography',
      'kleiner-loewe': 'Bodensee lakeside charm, traditional luxury, natural lighting, authentic German hospitality, professional travel photography',
      'winternitz-villa': 'Historic villa elegance, romantic atmosphere, warm lighting, authentic Austrian charm, professional photography'
    };

    const baseStyle = styleProfiles[styleProfile] || 'Professional travel photography, authentic moments, natural lighting';
    
    return `${baseStyle}, ${prompt}`;
  }

  // Helper method to create consistent character descriptions
  getCharacterDescription(characterType = 'default') {
    // No character descriptions - let reference images define the person
    return '';
  }

  // Method to enhance prompts with photography techniques
  enhancePrompt(prompt, enhancements = {}) {
    let enhancedPrompt = prompt;

    if (enhancements.photography) {
      enhancedPrompt += ', professional photography, high quality, detailed';
    }

    if (enhancements.lighting) {
      enhancedPrompt += `, ${enhancements.lighting} lighting`;
    }

    if (enhancements.lens) {
      enhancedPrompt += `, ${enhancements.lens} lens`;
    }

    if (enhancements.mood) {
      enhancedPrompt += `, ${enhancements.mood} mood`;
    }

    return enhancedPrompt;
  }

  getStyleProfiles() {
    return [
      {
        id: 'blaue-gans',
        name: 'Blaue Gans',
        description: 'Modern luxury, warm lighting, contemporary design'
      },
      {
        id: 'kinfolk-blaue-gans',
        name: 'Kinfolk Blaue Gans',
        description: 'Kinfolk magazine style, minimal composition, soft natural daylight, muted earthy tones'
      },
      {
        id: 'schloss-freudenstein',
        name: 'Schloss Freudenstein',
        description: 'Historic elegance, romantic atmosphere, wine country'
      },
      {
        id: 'prati-palai',
        name: 'Prati Palai',
        description: 'Italian lakeside, Mediterranean colors, relaxed luxury'
      },
      {
        id: 'kleiner-loewe',
        name: 'Kleiner Loewe',
        description: 'Bodensee lakeside charm, traditional luxury'
      },
      {
        id: 'winternitz-villa',
        name: 'Winternitz Villa',
        description: 'Historic villa elegance, romantic atmosphere'
      }
    ];
  }
}

module.exports = ImagenService;