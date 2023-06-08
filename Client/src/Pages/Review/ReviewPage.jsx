import { useParams } from 'react-router-dom';
import ReviewForm from '../../Components/Review/ReviewForm';

export default function ReviewPage() {
  const { hashedToken } = useParams();

  return (
    <div>
      <ReviewForm hashedToken={hashedToken} />
    </div>
  );
}
