"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

interface CreateSocialLinksParams {
  profileId: string;
  github: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export async function createSocialLinks({
  profileId,
  github,
  instagram,
  linkedin,
  twitter,
}: CreateSocialLinksParams) {
  const session = await auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}
