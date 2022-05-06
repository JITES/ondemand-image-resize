import sharp from 'sharp'

async function resizeImage(buffer, width, height) {
    await sharp(buffer).resize(width, height).toBuffer();
    
}
async function resize(buffer, width, height) {
    return resizeImage(buffer, width, height);
}

export const ResizeService = { resize };