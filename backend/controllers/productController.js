import fs from "fs";
import util from "util";
import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

const unlinkFile = util.promisify(fs.unlink);

// helper → convert undefined/null to empty string
const v = (val) => (val === undefined || val === null ? "" : val);

/* =======================
   ADD PRODUCT
======================= */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      size,
      paper,
      core,
      weight,
      perroll,
      ups,
      winding,
      grade,
      ribbonsize,
      brand,
      resolution,
      maxPrintSpeed,
      maxWidth,
      maxLength,
      dimension,
      labelRollCapacity,
      ribbon,
      processor,
      memory,
      interface: interfaceType,
      power,
      operationSwitch,
      sensors,
      accessories,
      modelno,
      warranty,
      bestseller,
    } = req.body;

    /* ---------- IMAGES ---------- */
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    const uploadedImages = [];

    for (const img of images) {
      const result = await cloudinary.uploader.upload(img.path, {
        folder: "products",
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      await unlinkFile(img.path);
    }

    /* ---------- CREATE ---------- */
    const product = await Product.create({
      name: v(name),
      description: v(description),
      price: price ?? 0,
      category: v(category),
      bestseller: bestseller ?? false,

      // label
      size: v(size),
      paper: v(paper),
      core: v(core),
      perroll: v(perroll),
      ups: v(ups),
      winding: v(winding),
      weight: v(weight),

      // ribbon
      grade: v(grade),
      ribbonsize: v(ribbonsize),

      // printer
      brand: v(brand),
      resolution: v(resolution),
      maxPrintSpeed: v(maxPrintSpeed),
      maxWidth: v(maxWidth),
      maxLength: v(maxLength),
      dimension: v(dimension),
      labelRollCapacity: v(labelRollCapacity),
      ribbon: v(ribbon),
      processor: v(processor),
      memory: v(memory),
      interface: v(interfaceType),
      power: v(power),
      operationSwitch: v(operationSwitch),
      sensors: v(sensors),
      accessories: v(accessories),

      // parts
      modelno: v(modelno),
      warranty: v(warranty),

      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Product added",
      product,
    });
  } catch (error) {
    console.error("addProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   UPDATE PRODUCT
======================= */
export const updateProduct = async (req, res) => {
  try {
    const id = req.params?.id || req.body?.id || req.query?.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const body = req.body;

    /* ---------- IMAGES ---------- */
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (images.length > 0) {
      // delete old images
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id).catch(() => {});
        }
      }

      product.images = [];

      for (const img of images) {
        const result = await cloudinary.uploader.upload(img.path, {
          folder: "products",
        });

        product.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });

        await unlinkFile(img.path);
      }
    }

    /* ---------- UPDATE FIELDS ---------- */
    const fields = [
      "name","description","category","size","paper","core","perroll","ups","winding",
      "weight","grade","ribbonsize","brand","resolution","maxPrintSpeed","maxWidth",
      "maxLength","dimension","labelRollCapacity","ribbon","processor","memory",
      "interface","power","operationSwitch","sensors","accessories","modelno","warranty"
    ];

    fields.forEach((f) => {
      product[f] = v(body[f]);
    });

    product.price = body.price ?? 0;
    product.bestseller = body.bestseller ?? false;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   LIST / SINGLE / REMOVE
   (UNCHANGED)
======================= */
export const listProduct = async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 });
  res.json({ success: true, products });
};

export const singleProduct = async (req, res) => {
  const id = req.params?.id || req.body?.id || req.query?.id;
  const product = await Product.findById(id);
  res.json({ success: true, product });
};

export const removeProduct = async (req, res) => {
  const id = req.body?.id || req.query?.id || req.params?.id;
  const product = await Product.findById(id);

  if (product?.images?.length) {
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id).catch(() => {});
    }
  }

  await Product.findByIdAndDelete(id);
  res.json({ success: true, message: "Product removed" });
};
