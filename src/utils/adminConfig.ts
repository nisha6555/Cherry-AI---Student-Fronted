/**
 * Student Frontend Role Configuration
 * In this standalone Student Frontend SPA, all users operate as students.
 */

export const ADMIN_EMAILS: string[] = [];

export function getAllAdminEmails(): string[] {
  return [];
}

export function addAdminEmail(_email: string): { success: boolean; message: string } {
  return { success: false, message: "Admin operations are disabled on the student client." };
}

export function removeAdminEmail(_email: string): { success: boolean; message: string } {
  return { success: false, message: "Admin operations are disabled on the student client." };
}

export function isAdminEmail(_email?: string | null): boolean {
  return false;
}

export function getUserRole(_email?: string | null): "student" {
  return "student";
}

