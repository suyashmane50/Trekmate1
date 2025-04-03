import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  {
    name: 'harishchandragad',
    url: 'https://images.thrillophilia.com/image/upload/s--YG6tNkEp--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/593/original/Harishchandragad.jpg.jpg'
  },
  {
    name: 'kalsubai',
    url: 'https://images.thrillophilia.com/image/upload/s--g7tFgxTw--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/597/original/Kalsubai.jpg.jpg'
  },
  {
    name: 'rajgad',
    url: 'https://images.thrillophilia.com/image/upload/s--YG6tNkEp--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/595/original/Rajgad.jpg.jpg'
  },
  {
    name: 'torna',
    url: 'https://images.thrillophilia.com/image/upload/s--g7tFgxTw--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/598/original/Torna.jpg.jpg'
  },
  {
    name: 'raigad',
    url: 'https://images.thrillophilia.com/image/upload/s--YG6tNkEp--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/594/original/Raigad.jpg.jpg'
  },
  {
    name: 'sinhagad',
    url: 'https://images.thrillophilia.com/image/upload/s--g7tFgxTw--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/596/original/Sinhagad.jpg.jpg'
  },
  {
    name: 'lohagad',
    url: 'https://images.thrillophilia.com/image/upload/s--YG6tNkEp--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/592/original/Lohagad.jpg.jpg'
  },
  {
    name: 'pratapgad',
    url: 'https://images.thrillophilia.com/image/upload/s--g7tFgxTw--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/599/original/Pratapgad.jpg.jpg'
  },
  {
    name: 'sandhan',
    url: 'https://images.thrillophilia.com/image/upload/s--YG6tNkEp--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/591/original/Sandhan.jpg.jpg'
  },
  {
    name: 'bhimashankar',
    url: 'https://images.thrillophilia.com/image/upload/s--g7tFgxTw--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/046/590/original/Bhimashankar.jpg.jpg'
  }
];

const targetDir = path.join(__dirname, '..', 'src', 'assets', 'routes');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Download images
const downloadImage = async (route) => {
  const filePath = path.join(targetDir, `${route.name}.jpg`);
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(route.url, response => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${route.name}.jpg`);
        resolve();
      });

      file.on('error', err => {
        fs.unlink(filePath, () => reject(err));
      });
    }).on('error', err => {
      fs.unlink(filePath, () => reject(err));
    });
  });
};

// Download all images
Promise.all(routes.map(route => downloadImage(route)))
  .then(() => console.log('All images downloaded successfully!'))
  .catch(err => console.error('Error downloading images:', err));
