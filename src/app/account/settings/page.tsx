import { Delete } from "@/components/account/delete";

export default function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <p>Manage your account settings and preferences.</p>
      <div className="divider"></div>

      <div>
        <Delete />
      </div>
    </div>
  );
}
