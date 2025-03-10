import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(0).max(500).nullable(),
  price: z.number().positive(),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), "Must be an image"),
});

export default async function CreateProduct() {
  const onSubmit = async (formData: FormData) => {
    "use server";

    try {
      // Validate product data
      const parsedProduct = ProductSchema.parse({
        name: formData.get("name"),
        description: formData.get("description") || null,
        price: Number(formData.get("price")),
        image: formData.get("image"),
      });

      console.log("Validated data: ", parsedProduct);

      const supabase = await createClient();

      // Get the authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User is not authenticated");
      }

      // Upload the image to a supabase bucket and get the URL
      let imageUrl = null;
      if (parsedProduct.image) {
        const { data, error } = await supabase.storage
          .from("ecommerce-images")
          .upload(
            `${Date.now()}-${parsedProduct.image.name}`,
            parsedProduct.image
          );

        if (error) {
          console.error("Image upload error: ", error);
          throw new Error("Image upload failed");
        }

        imageUrl = data?.path
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ecommerce-images/${data.path}`
          : null;
      }

      // Insert the data into the products table
      const { error } = await supabase.from("products").insert({
        user_id: user.id,
        name: parsedProduct.name,
        description: parsedProduct.description,
        price: parsedProduct.price,
        image_url: imageUrl,
      });

      if (error) throw new Error("Failed to insert product");

      console.log("Product added successfully!");
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name..."
          />
        </div>
        <div>
          <label htmlFor="description">Product Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter product description..."
          />
        </div>
        <div>
          <label htmlFor="price">Product Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter product price..."
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" accept="image/*" name="image" id="image" />
        </div>
        <button formAction={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
