import { RequestForm } from "../compornents/RequestForm";

export const RequestPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="card-white max-w-md card-bg">
        <h1 className="text-xl font-bold mb-4">お小遣い申請</h1>
        <RequestForm />
      </div>
    </div>
  );
};
