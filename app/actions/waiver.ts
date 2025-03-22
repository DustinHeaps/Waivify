"use server";

import { utapi } from '../api/uploadthing/core';

export async function uploadSignature(formData: FormData) {
    const files = formData.getAll("file") as File[];
    const res = await utapi.uploadFiles(files);
    return res;
  }

