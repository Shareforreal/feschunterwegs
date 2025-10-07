#!/usr/bin/env python3
"""
Image Resizer Script
Resizes images to 1600 x 1040 pixels
"""

import os
import sys
from PIL import Image
import argparse

def resize_image(input_path, output_path=None, width=1600, height=1040):
    """
    Resize an image to specified dimensions
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path to output image (optional)
        width (int): Target width
        height (int): Target height
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            print(f"Original image size: {img.size}")
            
            # Resize the image
            resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
            
            # Generate output path if not provided
            if output_path is None:
                name, ext = os.path.splitext(input_path)
                output_path = f"{name}_resized_{width}x{height}{ext}"
            
            # Save the resized image
            resized_img.save(output_path, quality=95)
            print(f"Resized image saved to: {output_path}")
            print(f"New image size: {resized_img.size}")
            
            return output_path
            
    except Exception as e:
        print(f"Error resizing image: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Resize images to 1600x1040')
    parser.add_argument('input', help='Input image path')
    parser.add_argument('-o', '--output', help='Output image path (optional)')
    parser.add_argument('-w', '--width', type=int, default=1600, help='Target width (default: 1600)')
    parser.add_argument('--height', type=int, default=1040, help='Target height (default: 1040)')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' does not exist")
        sys.exit(1)
    
    result = resize_image(args.input, args.output, args.width, args.height)
    
    if result:
        print("✅ Image resized successfully!")
    else:
        print("❌ Failed to resize image")
        sys.exit(1)

if __name__ == "__main__":
    main()
