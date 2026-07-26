/**
 * Resize and normalize an uploaded image file using HTML5 Canvas.
 * By default (crop = false), preserves 100% of the original image's aspect ratio without any cropping!
 * Returns a Promise that resolves to a compressed Data URL (JPEG).
 */
export function resizeImage(file, maxWidth = 1400, maxHeight = 1400, quality = 0.88, crop = false) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (!crop) {
          // PROPORTIONAL SCALE: PRESERVES 100% FULL IMAGE WITHOUT ANY CROPPING!
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
          return;
        }

        // CROP FIT MODE (Only used if crop parameter is explicitly set to true)
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        const ctx = canvas.getContext('2d');

        const sourceWidth = img.width;
        const sourceHeight = img.height;
        const targetAspect = maxWidth / maxHeight;
        const sourceAspect = sourceWidth / sourceHeight;

        let renderableWidth, renderableHeight, xStart, yStart;

        if (sourceAspect < targetAspect) {
          renderableWidth = sourceWidth;
          renderableHeight = sourceWidth / targetAspect;
          xStart = 0;
          yStart = (sourceHeight - renderableHeight) / 2;
        } else {
          renderableHeight = sourceHeight;
          renderableWidth = sourceHeight * targetAspect;
          xStart = (sourceWidth - renderableWidth) / 2;
          yStart = 0;
        }

        ctx.drawImage(
          img,
          xStart, yStart, renderableWidth, renderableHeight,
          0, 0, maxWidth, maxHeight
        );

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}
