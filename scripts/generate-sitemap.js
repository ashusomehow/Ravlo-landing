import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define your site URL
const SITE_URL = 'https://ravlo.ai';

// Define all your public pages
const pages = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: '/post-formatter',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/saved-drafts',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/privacy',
    changefreq: 'monthly',
    priority: 0.3,
    lastmod: new Date().toISOString()
  },
  {
    url: '/terms',
    changefreq: 'monthly',
    priority: 0.3,
    lastmod: new Date().toISOString()
  },
  {
    url: '/faq',
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: new Date().toISOString()
  },
  {
    url: '/buy-me-a-coffee',
    changefreq: 'monthly',
    priority: 0.4,
    lastmod: new Date().toISOString()
  }
];

async function generateSitemap() {
  try {
    // Create sitemap stream
    const sitemap = new SitemapStream({ hostname: SITE_URL });
    
    // Add pages to sitemap
    pages.forEach(page => {
      sitemap.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: page.lastmod
      });
    });
    
    sitemap.end();
    
    // Convert stream to string
    const sitemapString = await streamToPromise(sitemap);
    
    // Write to public directory
    const publicDir = resolve(__dirname, '../public');
    const sitemapPath = resolve(publicDir, 'sitemap.xml');
    
    writeFileSync(sitemapPath, sitemapString.toString());
    
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log('📄 Pages included:', pages.length);
    pages.forEach(page => {
      console.log(`   - ${page.url} (priority: ${page.priority})`);
    });
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap(); 