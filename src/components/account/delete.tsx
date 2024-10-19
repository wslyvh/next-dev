"use client";

import { signOut, useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export function Delete(props: Props) {
  const { data: session } = useSession();
  let className = "btn btn-outline btn-error";
  if (props.className) className += ` ${props.className}`;

  async function deleteAccount() {
    if (session) {
      const res = await fetch("/api/account/delete", {
        method: "POST",
      });
      if (res.ok) {
        await signOut({ redirect: true, callbackUrl: "/" });
      }
    }
  }
  return (
    <>
      <button
        className={className}
        onClick={() =>
          (
            document.getElementById("delete-account-modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        Delete Account
      </button>
      <dialog id="delete-account-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete your account? This action cannot be
            undone and you will lose all your data.
          </p>
          <div className="modal-action">
            <button className="btn btn-sm btn-error" onClick={deleteAccount}>
              Delete
            </button>
            <button
              className="btn btn-sm"
              onClick={() =>
                (
                  document.getElementById(
                    "delete-account-modal"
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
