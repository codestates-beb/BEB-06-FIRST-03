import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// TODO - 오류가 난 empty 페이지를 작성합니다.
export default function Empty () {
  const navigate = useNavigate();
  useEffect(() => {
    alert("잘못된 접근 메인화면으로 이동합니다.")
    navigate('/');
  }, []);

  return ;
}