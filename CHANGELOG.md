# 📝 ChangeLog

<details>
  <summary>📌 1주차 변경 사항</summary>

## ✅ Week 1 (1주차)

<details>
  <summary>:bust_in_silhouette: 조유원</summary>

### :white_check_mark: Done

- **공통 컴포넌트 - 검색창 컴포넌트 구현** (`SearchBar.tsx`, `SearchBarMobile.tsx`)
  
  - 화면 크기에 따른 반응형 구현 (`ResponsiveSearchBar.tsx`)
  - 배급사 드롭다운 메뉴 추가
  - 태그, 검색어 구분
    
- **공통 컴포넌트 - 태그, 뱃지 컴포넌트 구현** (`Badges.tsx`, `Tags.tsx`)
  
  - 태그 호버 시 색상 변경
    
- **공통 컴포넌트 - 웹툰 카드 컴포넌트 구현** (`WebtoonCard.tsx`, `WebtoonCardMobile.tsx`, `WebtoonCardCol.tsx`, `WebtoonCardColMobile.tsx`)
  
  - 세로형 웹툰 카드 컴포넌트, 가로형 웹툰 카드 컴포넌트
  - 웹툰 정보 표시
    
- **메인 페이지 구현** (`page.tsx`)
  
  - 메인 헤더 추가 (`Header.tsx`)
    - 툰츄 로고, 목업 사진 추가
  - 화면 크기에 따른 반응형 구현 (`MainDesktop.tsx`, `MainMobile.tsx`)
  - Swiper 라이브러리를 활용한 슬라이더 구현 (`Swiper.tsx`)
  - Material UI 라이브러리를 활용한 페이지네이션 구현 (`PaginationList.tsx`)

### :construction: In Progress

- **태그 드롭다운 메뉴 구현**
  
  - 태그 페이지네이션 추가
  - 반응형 구현
    
- **메인 헤더 애니메이션 구현**
  
  - 고양이 발바닥 애니메이션 구현

### :mag: Preview

- **공통 컴포넌트**
<div align=center>
  <img src='https://github.com/user-attachments/assets/dc466a5e-4d77-4e0e-9d6e-ab6c6e09fbdb' width=200/>
</div>

- **메인 페이지**
<div align=center>
  <img src='https://github.com/user-attachments/assets/f065ce16-5440-404d-af91-b8c2d92c55ce'/>
</div>

- **메인 페이지 - 태블릿, 모바일**
<div align=center>
  <div>
    <img src='https://github.com/user-attachments/assets/307064e3-f7d8-4915-a17e-864f7715804c' width=200 />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://github.com/user-attachments/assets/8e1335dd-90a7-4cdc-b01f-b0fa97df4604' width=300 />
  </div>
</div>

</details>

---

<details>
  <summary>:bust_in_silhouette: 이혜민</summary>

### :white_check_mark: Done

- **공통 컴포넌트 - 네비게이션 바 구현** (`Nav.tsx`, `NavClient.tsx`)

  - 화면 크기에 따른 반응형 구현 (`DesktopNav.tsx`, `MobileTablet.tsx`)
  - 드롭다운 메뉴 추가(프로필/로그아웃) (`ProfileMenu.tsx`)

- **공통 컴포넌트 - 반응형 디자인을 위한 브레이크포인트(BP) 감지 커스텀 훅 구현**
  - 서버 사이드 BP 감지 유틸함수 구현 (`breakpointDetect.ts`)
    - Next.js headers API를 활용한 User-Agent 기반 디바이스 타입 감지
  - 클라이언트 사이드 BP 감지 커스텀 훅 구현 (`useBreakpoint.ts`)
    - Resize 이벤트를 이용한 화면 크기 기반 동적 BP 감지
- **공통 컴포넌트 - 외부 클릭 감지 커스텀 훅 구현** (`useOutsideClick.tsx`)
- **공통 컴포넌트 - 모바일/탭뷰를 위한 바텀 팝업 시트 구현** (`BottomSlideUpMenu.tsx`)

  - body 스크롤 잠금 기능 구현 (`useLockBodyScroll`)
  - Framer Motion을 활용한 슬라이드 애니메이션 구현

- **로그인 페이지 구현** (`/login/page.tsx`)

  - 소셜 로그인 버튼 추가 (`GoogleLoginButton.tsx`, `NaverLoginButton.tsx`, `KakaoLoginButton.tsx`)
  - OAuth 인증 URL 생성 유틸리티 함수 구현 (Google, Naver, Kakao) (`auth.ts`)
  - Zustand를 활용한 전역 상태 관리 구현 (`authStore.ts`)
    - 유저 정보 저장 및 관리
    - 로그인/로그아웃 기능 구현

- **프로필 페이지 구현** (`/profile/page.tsx`)

  - 기본 프로필 페이지 구현 (`ProfileDefault.tsx`)
    - 프로필 조회/수정 기능 구현
    - 인증 상태에 따른 라우팅 보호 구현
  - 프로필 페이지 변경 UI 구현 (`ProfileEdit.tsx`)
  - Zustand를 활용한 프로필 상태 관리 (`profileStore.ts`)
    - 프로필 편집 모드 상태 관리
    - 상태 변경 액션 구현
  - 사용자 API 모듈 구현 (`userApi.ts`)
    - 로그인/로그아웃, 프로필 정보 조회/수정

- **회원탈퇴 페이지 구현** (`/withdrawal/page.tsx`)
  - 회원탈퇴 페이지 모바일/탭뷰 구현
  - 닉네임 일치 여부 시각적 Validation 추가

### :construction: In Progress

- **로그인 페이지 구현** (`/login/page.tsx`)

  - 로그인/로그아웃 API 연동

- **회원탈퇴 페이지 구현** (`/withdrawal/page.tsx`)

  - 회원탈퇴 데스크탑 뷰 UI 구현
  - 회원탈퇴 API 연동
  - 회원 탈퇴 후, 메인 페이지로 리다이렉트

- **프로필 페이지 구현** (`/profile/page.tsx`)

  - 새로고침 시 프로필 정보 유지
    (별도 프로필 조회 API 연결)
  - 프로필 조회/변경 API 연동

- **공통 컴포넌트 - confirm 모달 구현** (`ConfirmModal.tsx`)

- **공통 컴포넌트 - Footer 구현** (`Footer.tsx`)

  - Footer UI 구현 (BD 컨텐츠 대기중)

- **공통 컴포넌트 - 커서 애니메이션 구현** (`Cursor.tsx`)
  - 커서 UI 및 애니메이션 구현

### :mag: Preview

- **공통 컴포넌트 - 네비게이션 바**
<div align="center">
  <kbd>
  </kbd>
</div>

</details>

---

<details>
  <summary>:bust_in_silhouette: 최푸른</summary>

### :white_check_mark: Done

- **공통 컴포넌트 - 작품 등록 상태 컴포넌트 구현** (`Status.tsx`)

  - 작품 등록 상태 표시
  - 등록 상태(PENDING/REGISTERED/REJECTED)에 따른 배경색 설정

- **내 상자 페이지 구현** (`/my-box/page.tsx`)
  - 사용자로 접속 시, 내 상자 페이지 기본 화면 UI 구현
  - 탭 메뉴 구현 (찜 목록/최근 본 목록/작품 등록/등록 신청한 작품)
- **찜 목록 메뉴 구현** (`FavoriteList.tsx`)
  - 찜 처리되어 있는 웹툰 목록 표시
  - 찜 목록 내 상단 검색창 및 정렬 버튼(최신순, 오래된순) 구현

### :construction: In Progress

- **찜 목록 메뉴 구현** (`FavoriteList.tsx`)

  - 반응형 구현
  - 찜 목록 페이지네이션 구현

- **작품 등록 메뉴 구현** (`WebtoonRegisterForm.tsx`)
  - 작품 등록 UI 개선
  - 반응형 구현

### :mag: Preview

- **공통 컴포넌트**
<div align="center">
  <kbd>
  </kbd>
</div>

- **내 상자 페이지**
<div align=center>
  <img src='https://github.com/user-attachments/assets/9f07a449-790b-4c42-9431-cffbc0672b71'/>
  <img src='https://github.com/user-attachments/assets/129123cc-2214-4474-bb98-a1a1a80fba16'/>
</div>

- **찜 메뉴**

</details>

</details>

---

<details>
  <summary>📌 2주차 변경 사항</summary>

## ✅ Week 2 (2주차)

</details>
