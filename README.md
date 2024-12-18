## post가 가지고 있어야할 정보

id,
content : 내용
emotion_level : 감정 농도
created_at : 생성 시간
updated_at : 수정 시간
favorite : 찜 갯수
comments[] : 댓글 (comment_id 로 관계)
comment_id : 댓글 관계 포린키?
viewed: 조회수

## garden(잔디밭)이 가지고 있어야할 정보

id,
created_at : 생성 시간
updated_at : 수정 시간
year_month : 해당 년도와 월 (예: '2024.04')
posts[] : 해당 월에 작성된 문장의 정보 (예: { post_id, created_at, content, emotion_level })

---

## 월단위 렌더링 위한 좌표값 구하기

1. 각 달의 1일이 잔디밭 내에서 몇번째 행에 있는지 알아냄
2. 하나의 행이 차지하는 크기를 계산함
3. 몇번째 행인지에 따라 필요한 마이너스 좌표값을 찾아 그만큼 위로 올림

---

## 자주 사용하는 단어 로직

- 선택사항 1. db에서 단어를 추출해 트리거 함수로 넘긴다.
- 선택사항 2. db에 업로드 전에 단어를 추출하고 요청을 하나더 보낸다.

## db에서 처리하는 방식

1. post 테이블에 데이터가 추가되면 트리거 함수를 실행시킨다.
2. content의 내용을 공백 기준으로 분리하여 word_dictionary 테이블에 전부 넣는다.
3. word_dictionary에 중복되는 값이 있다면 해당 값의 count값을 1 올린다.
4. user_words에도 user_id를 기준으로 하는 데이터의 words 값에 전부 넣는다.
5. user_words에 중복되는 값이 있다면 해당 값의 count값을 1 올린다.

## user_words의 words에 들어갈 값의 형식

word: 단어
count: 사용 횟수

## comment에 필요한 정보

id primary
created_at timestamp
email text
user_name text
avatar_url text
content text
post_id int4
comment_id int4
user_id uuid
