
## 2022/02/27 업데이트내역
1.미인증로그인 접속시 세션정보 없어서 로그인페이지로 리다이렉트 시킴-개발의 편의를 위해 잠시꺼둠 리덕스에서 state바꾸기

2.첫 로그인시 모달창 흐름 진행할 수 있도록 개발

3.오늘의루틴페이지(운동추천페이지 개발완료)

4.개수 카운트 반영됨

5.사람몸을 인식할 때까지의 로딩시간을 파악하여 준비가 완료될시 넘기게 개발

6.준비시간을 측정 페이지로 넣어 같이 나타내며 준비,시작 멘트를 알려줌

7.운동시작하면 개수 측정 후 등급 및 멘트들 서버와의 api통신 가능

8.회원루틴데이터 없을시 모달창 띄워줌(api통신)

9.체력측정쪽 UI변경

10.루틴페이지쪽 페이지 3개 추가생성

11.연습스텝 추가생성

12.중량체크 가능+각종 멘트전달+리덕스에 반영

13.메인 운동스텝+휴식세트+세트 수 진행

14.평가세트 페이지 생성 완료

#주요 사용한거:Redux,Promise객체(비동기 지연)

#주의사항

-지금 서버부분 중 MainPageInfo부분이 변경되어서 오류발생할 수 있음



##사용방법
1.처음 시작시 yarn install 또는 미설치시 npm install

2.yarn start 또는 npm start