"use server";

import { signIn } from "../../../../auth";

export async function serverSignIn(provider: any) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
