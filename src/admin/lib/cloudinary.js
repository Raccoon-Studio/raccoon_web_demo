const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadToCloudinary(file, folder = "admin-uploads") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) throw new Error("Cloudinary upload failed");
  return res.json();
}

export async function trashCloudinaryAsset(publicId) {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/tags`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_ids: [publicId],
        tag: "trash-30d",
      }),
    }
  );
  return res.ok;
}

export function cloudinaryUrl(publicId, transforms = "w_800,q_auto,f_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function thumbnailUrl(publicId) {
  return cloudinaryUrl(publicId, "w_200,h_200,c_fill,q_auto,f_auto");
}
