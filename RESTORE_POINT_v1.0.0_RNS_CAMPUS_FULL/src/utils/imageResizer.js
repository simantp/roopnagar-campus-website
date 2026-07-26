/**
 * Resize and normalize an uploaded image file to exact dimensions using HTML5 Canvas.
 * Returns a Promise that resolves to a compressed Data URL (JPEG).
 */
export function resizeImage(file, targetWidth = 800, targetHeight = 450, quality = 0.88) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        // Calculate aspect ratio crop (Cover fit)
        const sourceWidth = img.width;
        const sourceHeight = img.height;
        const targetAspect = targetWidth / targetHeight;
        const sourceAspect = sourceWidth / sourceHeight;

        let renderableWidth, renderableHeight, xStart, yStart;

        if (sourceAspect < targetAspect) {
          // Source is taller than target
          renderableWidth = sourceWidth;
          renderableHeight = sourceWidth / targetAspect;
          xStart = 0;
          yStart = (sourceHeight - renderableHeight) / 2;
        } else {
          // Source is wider than target
          renderableHeight = sourceHeight;
          renderableWidth = sourceHeight * targetAspect;
          xStart = (sourceWidth - renderableWidth) / 2;
          yStart = 0;
        }

        // Draw cropped & resized image
        ctx.drawImage(
          img,
          xStart, yStart, renderableWidth, renderableHeight,
          0, 0, targetWidth, targetHeight
        );

        // Convert canvas to Data URL
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
