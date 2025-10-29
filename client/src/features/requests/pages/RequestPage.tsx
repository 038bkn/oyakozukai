import { Header } from "../../../app/layout/Header";
import { RequestForm } from "../compornents/RequestForm";

export const RequestPage = () => {
  return (
    <>
      <Header title="お小遣い申請" back />
      <div className="min-h-screen flex flex-col items-center p-5">
        <div className="card-white max-w-md card-bg">
          <RequestForm />
        </div>
      </div>
    </>
  );
};
