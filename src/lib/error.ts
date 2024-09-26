import { toast } from "sonner"

export function getErrorMessage(err: unknown) {
  if (err instanceof Error) {
    return err.message
  }

  return "Something went wrong. Please try again later."
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  return toast.error(errorMessage)
}

export function catchError(err: unknown) {
  return {
    data: null,
    error: getErrorMessage(err),
  }
}
