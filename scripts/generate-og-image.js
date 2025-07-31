import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  try {
    // Create canvas
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1e40af'); // Blue start
    gradient.addColorStop(0.5, '#3b82f6'); // Blue middle
    gradient.addColorStop(1, '#1e40af'); // Blue end
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < width; i += 40) {
      for (let j = 0; j < height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }

    // Add floating geometric shapes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    
    // Circle
    ctx.beginPath();
    ctx.arc(100, 150, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    // Triangle
    ctx.beginPath();
    ctx.moveTo(1100, 200);
    ctx.lineTo(1050, 300);
    ctx.lineTo(1150, 300);
    ctx.closePath();
    ctx.fill();
    
    // Rectangle
    ctx.fillRect(50, 450, 80, 60);

    // Add main content
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    // Main title
    ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Ravlo', width / 2, 200);
    
    // Subtitle
    ctx.font = '36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('AI LinkedIn Post Tool', width / 2, 260);
    
    // Description
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Write and format viral LinkedIn posts with AI', width / 2, 320);
    
    // Features
    ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('✨ AI-Powered Content • 📝 Smart Formatting • 💾 Draft Management', width / 2, 380);
    
    // URL
    ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('www.ravlo.pro', width / 2, 550);

    // Add a subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Save the image
    const publicDir = resolve(__dirname, '../public');
    const ogImagePath = resolve(publicDir, 'og-preview.png');
    
    const buffer = canvas.toBuffer('image/png');
    writeFileSync(ogImagePath, buffer);
    
    console.log('✅ OG Preview image generated successfully at:', ogImagePath);
    console.log('📐 Dimensions:', width, 'x', height);
    console.log('🎨 Features: Gradient background, geometric shapes, typography');
    
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage(); 