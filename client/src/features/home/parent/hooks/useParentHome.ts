import { useApprovals } from "../../../approvals/hooks/useApprovals";
import { useHistory } from "../../../history/hooks/useHistory";

export const useParentHome = () => {
  const {
    data: requests,
    loading: reqLoading,
    error: reqError,
    handleApprove,
    handleReject,
  } = useApprovals();

  const { transactions, loading: txLoading, error: txError } = useHistory();

  return {
    requests,
    transactions,
    loading: reqLoading || txLoading,
    error: reqError ?? txError,
    handleApprove,
    handleReject,
  };
};
